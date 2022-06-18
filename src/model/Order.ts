
export class Order {
	constructor(
		private id: string,
		private userId: string,
		private products: ProductOrderInput[],
		private delivery: Date
	) { }

	getId(): string { return this.id }
	getUserId(): string { return this.userId }
	getProducts(): ProductOrderInput[] { return this.products }
	getDelivery(): Date { return this.delivery }

	setId(id: string) { this.id = id }
	setUserId(userId: string) { this.userId = userId }
	setProducts(products: ProductOrderInput[]) { this.products = products }
	setDelivery(delivery: Date) { this.delivery = delivery }

	public static toOrder(data?: any): Order | undefined {
		return (data && new Order(
			data.id,
			data.userId,
			data.products,
			data.delivery
		))
	}
}

export interface OrderInputDTO {
	userId: string,
	products: ProductOrderInput[],
	delivery: Date
}

interface ProductOrderInput {
	id: string,
	qty: number
}
