import { orders_api } from "./apiConfig";
import { Order } from "./types";

export default class OrdersService {
    static async getOrders() {
        return orders_api.get('/')
    }

    static async addOrder(order: Order) {
        return orders_api.post('/', { order })
    }
}