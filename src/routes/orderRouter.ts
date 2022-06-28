import express from "express"
import { OrderController } from "../controller/OrderController"

export const orderRouter = express.Router()

const orderController = new OrderController()

orderRouter.get("/:id", orderController.getOrderDetailById)
orderRouter.get("/all", orderController.getAllOrder)
orderRouter.post("/register", orderController.registerOrder)
orderRouter.get("/all/user/:id", orderController.getAllOrderByUserId)
