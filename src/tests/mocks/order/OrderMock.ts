import { Order } from "../../../model/Order";

export const orderMock = new Order(
  "id_mock",
  "id_user_mock",
  [{
    id:"id_product",
    qty:1
  }],
  new Date()
)