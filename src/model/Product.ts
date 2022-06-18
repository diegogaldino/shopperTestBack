
export class Product {
	constructor(
		private id: string,
		private name: string,
		private price: number,
		private qtyStock: number,
	) { }

	getId() { return this.id }
	getName() { return this.name }
	getPrice() { return this.price }
	getQtyStock() { return this.qtyStock }

	setId(id: string) { this.id = id }
	setName(name: string) { this.name = name }
	setPrice(price: number) { this.price = price }
	setQtyStock(qtyStock: number) { this.qtyStock = qtyStock }

	static toProductModel(product: any): Product {
		return new Product(product.id, product.name, product.price, product.qtyStock)
	}
}

export interface ProductInputDTO {
	name: string,
	price: number,
	qtyStock: number
}

