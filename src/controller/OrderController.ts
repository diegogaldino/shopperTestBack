import { Request, Response } from "express"
import { OrderBusiness } from "../business/OrderBusiness"
import { BaseDatabase } from "../data/BaseDatabase"
import { OrderDatabase } from "../data/OrderDatabase"
import { OrderInputDTO } from "../model/Order"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"

const orderBusiness = new OrderBusiness(
	new OrderDatabase,
	new IdGenerator,
	new Authenticator
)

export class OrderController {
	async registerOrder(req: Request, res: Response) {
		try {
			const input: OrderInputDTO = {
				userId: req.body.userId,
				products: req.body.products,
				delivery: req.body.delivery
			}

			await orderBusiness.registerOrder(input, req.headers.authorization as string)
			res.sendStatus(200)
		} catch (err) {
			res.status(err.customErrorCode || 400).send({
				message: err.message
			})
		} finally {
			await BaseDatabase.destroyConnection()
		}
	}

	async getOrderDetailById(req: Request, res: Response) {
		try {
			const id = (req.params.id) as string
			const order = await orderBusiness.getDetailOrderById(id, req.headers.authorization as string)
			res.status(200).send(order)
		} catch (err) {
			res.status(err.customErrorCode || 400).send({
				message: err.message,
			})
		} finally {
			await BaseDatabase.destroyConnection()
		}
	}

	async getAllOrder(req: Request, res: Response) {
		try {
			const orders = await orderBusiness.getAllOrder(req.headers.authorization as string)
			res.status(200).send(orders)
		} catch (err) {
			res.status(err.customErrorCode || 400).send({
				message: err.message,
			})
		} finally {
			await BaseDatabase.destroyConnection()
		}
	}

	async getAllOrderByUserId(req: Request, res: Response) {
		console.log("========",req.params.id)
		try {
			const id = (req.params.id) as string
			const order = await orderBusiness.getAllOrderByUserId(id, req.headers.authorization as string)
			res.status(200).send(order)
		} catch (err) {
			res.status(err.customErrorCode || 400).send({
				message: err.message,
			})
		} finally {
			await BaseDatabase.destroyConnection()
		}
	}

}