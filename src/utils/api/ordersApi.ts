import { orders_api } from "./apiConfig";
import { PostOrderPayload } from "./types";

export default class OrdersService {
    static async getOrders() {
        return orders_api.get('/')
    }

    static async addOrder(order: PostOrderPayload) {
        return orders_api.post('/', order)
    }
}