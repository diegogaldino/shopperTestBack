
import { OrderDatabase } from "../data/OrderDatabase"
import { InvalidInputError } from "../error/InvalidInputError"
import { UnauthorizedError } from "../error/UnauthorizedError"
import { Order, OrderInputDTO } from "../model/Order"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"

export class OrderBusiness {
	constructor(
		private orderDatabase: OrderDatabase,
		private idGenerator: IdGenerator,
		private authenticator: Authenticator
	) { }

	async registerOrder(input: OrderInputDTO, token: string) {

		const tokenData = this.authenticator.getData(token)
		if (!tokenData.id) {
			throw new UnauthorizedError("Only authorized can access this feature")
		}
		if (!input.products || !input.userId) {
			throw new InvalidInputError("Invalid input to registerOrder")
		}

		await this.orderDatabase.createOrder(
			Order.toOrder({
				id: this.idGenerator.generate(),
				...input,
			})!
		)
	}

	async getDetailOrderById(id: string, token: string): Promise<Order> {
		const tokenData = this.authenticator.getData(token)
		if (!tokenData.id) {
			throw new UnauthorizedError("Only authorized can access this feature")
		}
		if (!id) {
			throw new InvalidInputError("Invalid id to getDetailOrderById")
		}
		return this.orderDatabase.getOrderById(id)
	}

	async getAllOrder(token: string): Promise<Order[]> {
		const tokenData = this.authenticator.getData(token)
		if (!tokenData.id) {
			throw new UnauthorizedError("Only authorized can access this feature")
		}
		return this.orderDatabase.getAllOrder()
	}

	async getAllOrderByUserId(id: string, token: string): Promise<Order[]> {
		const tokenData = this.authenticator.getData(token)
		if (!tokenData.id) {
			throw new UnauthorizedError("Only authorized can access this feature")
		}
		if (!id) {
			throw new InvalidInputError("Invalid id to getAllOrderByUserId")
		}

		return  await this.orderDatabase.getAllOrderByUserId(id)
	}

}