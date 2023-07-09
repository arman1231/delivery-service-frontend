export interface AuthResponse {
        token: string,
        roleName: string
}

export type OrderDestination = {
        city: string;
        district: string;
        receiverName: string;
        receiverSurname: string;
        receiverPhone: string;
        [key: string]: string;
}

export enum ParselTypes {
        EXTRA_LARGE = 'EXTRA_LARGE',
        LARGE = 'LARGE',
        MEDIUM = 'MEDIUM',
        SMALL = 'SMALL',
        UNSELECTED = '',
}

export type TParsel = {
        id?: number;
        type: ParselTypes;
        weight: number;
        [key: string]: string | number | undefined;
      }

export type ParselPayload = Omit<TParsel, 'id'>

export type TOrder = {
        id: number;
        status: string;
        destination: OrderDestination;
        parcels: TParsel[];
}

export type PostOrderPayload = {
        destination: OrderDestination;
        parcels: ParselPayload[];
}