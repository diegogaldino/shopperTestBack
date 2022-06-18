import { NotFoundError } from "../error/NotFoundError";
import { Order } from "../model/Order";

import { BaseDatabase } from "./BaseDatabase";

export class OrderDatabase extends BaseDatabase {

	public async createOrder(order: Order): Promise<void> {
		try {

			await this.getConnection().transaction(async tr => {
				for (let i = 0; i < order.getProducts().length; i++) {

					let stock = await this.getConnection()
						.select('qty_stock')
						.from(this.tables.products)
						.where({ id: order.getProducts()[i].id })

					await this.getConnection()
						.insert({
							id: order.getId(),
							qty: order.getProducts()[i].qty,
							delivery: order.getDelivery().toString().split('T')[0],
							product_id: order.getProducts()[i].id,
							user_id: order.getUserId()
						})
						.into(this.tables.orders)

					await this.getConnection()
						.update({ qty_stock: (stock[0].qty_stock - order.getProducts()[i].qty) })
						.from(this.tables.products)
						.where('id', order.getProducts()[i].id)

				}
			}
			)
		} catch (err) {

			throw new Error(err.sqlMessage || err.message)
		}

	}

	public async getOrderById(id: string): Promise<Order> {
		const order = await this.getConnection()
			.select("*")
			.from(this.tables.orders)
			.where("id", id)

		if (!order[0]) {
			throw new NotFoundError(`Unable to found order with input: ${id}`)
		}
		return Order.toOrder(order[0])!
	}

	public async getAllOrder(): Promise<Order[]> {
		const order = await this.getConnection()
			.select("*")
			.from(this.tables.orders)
		if (!order[0]) {
			throw new NotFoundError(`Not found orders`)
		}
		return order
	}

	
}