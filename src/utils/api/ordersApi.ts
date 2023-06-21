import { orders_api } from "./apiConfig";

export default class OrdersService {
    static async getOrders() {
        return orders_api.get('/')
    }
}