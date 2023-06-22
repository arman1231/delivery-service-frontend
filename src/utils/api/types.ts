export interface AuthResponse {
        token: string,
        roleName: string
}

export type OrderDestination = {
        city: "string"
        district: "string"
        receiverName: "string"
        receiverSurname: "string"
        receiverPhone: "string"
        [key: string]: string;
}

export enum ParselTypes {
        EXTRA_LARGE = 'EXTRA_LARGE',
        LARGE = 'LARGE',
        MEDIUM = 'MEDIUM',
        SMALL = 'SMALL'
}

export type Parsel = {
        id: number;
        type: ParselTypes;
        weight: number;
        [key: string]: string | number;
}

export type Order = {
        id: number;
        status: string;
        destination: OrderDestination;
        parcels: Parsel[];
}