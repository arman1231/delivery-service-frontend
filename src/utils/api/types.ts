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

export type Parsel = {
        id: number;
        type: string;
        weight: number;
        [key: string]: string | number;
}

export type Order = {
        id: number;
        status: string;
        destination: OrderDestination;
        parcels: Parsel[];
}