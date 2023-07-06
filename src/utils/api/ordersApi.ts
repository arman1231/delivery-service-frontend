import { orders_api } from "./apiConfig";
import { OrderDestination, PostOrderPayload } from "./types";

export default class OrdersService {
    static async getOrders(token: string) {
        return orders_api.get("/", {
          headers: {
            Authorization: token,
          },
        });
      }

  static async addOrder(order: PostOrderPayload, token: string) {
    return orders_api.post("/", order, {
        headers: {
            Authorization: token,
          },
    });
  }

  static async deleteOrder(id: number) {
    const token = localStorage.getItem("token")
    ? `Bearer ${localStorage.getItem("token")}`
    : "";
    return orders_api.delete(`/${id}`, {
        headers: {
            Authorization: token,
          },
    });
  }

  static async changeOrderDestination(id: number, order: OrderDestination) {
    const token = localStorage.getItem("token")
    ? `Bearer ${localStorage.getItem("token")}`
    : "";
    return orders_api.put(`/${id}`, order, {
        headers: {
            Authorization: token,
          },
    });
  }
}
