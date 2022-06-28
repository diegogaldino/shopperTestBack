import { Order } from "../../../model/Order"
import { orderMock } from "./OrderMock"

export class OrderDatabaseMock {
  public async registerOrder(order: Order): Promise<void> {}
  public async getOrderById(id: string): Promise<Order | undefined> {
    if (id === 'id_mock') {
      return orderMock
    } else {
      undefined
    }
  }
}