import { orders_api } from "./apiConfig";
import { PostOrderPayload } from "./types";

export default class OrdersService {
    static async getOrders(token: string) {
        return orders_api.get("/", {
          headers: {
            Authorization: token,
          },
        });
      }

  static async addOrder(order: PostOrderPayload) {
    return orders_api.post("/", order);
  }

  static async deleteOrder(id: number, token: string) {
    return orders_api.delete(`/${id}`, {
        headers: {
            Authorization: token,
          },
    });
  }
}
