export interface AuthResponse {
        token: string,
        roleName: string
}

type OrderDestination = {
        city: "string"
        district: "string"
        receiverName: "string"
        receiverSurname: "string"
        receiverPhone: "string"
        [key: string]: string;
}

type Parsel = {
        id: number
        type: string
        weight: number
}

export type Order = {
        id: number;
        status: string;
        destination: OrderDestination;
        parcels: Parsel[];
}