import { IdGenerator } from "../services/IdGenerator"
import { Authenticator } from "../services/Authenticator"
import { InvalidInputError } from "../error/InvalidInputError"
import { UnauthorizedError } from "../error/UnauthorizedError"
import { ProductDatabase } from "../data/ProductDatabase"
import { Product, ProductInputDTO } from "../model/Product"
import fs from 'fs'
import path from 'path'

export class ProductBusiness {
	constructor(
		private productDatabase: ProductDatabase,
		private idGenerator: IdGenerator,
		private authenticator: Authenticator
	) { }

	async createProduct(product: ProductInputDTO, token: string) {

		const tokenData = this.authenticator.getData(token)
		if (!tokenData.id) throw new UnauthorizedError("Only authorized can access this feature")

		if (!product.name) throw new InvalidInputError("Invalid input to create product")

		const productId = this.idGenerator.generate()
		await this.productDatabase.createProduct(
			Product.toProductModel({ ...product, id: productId, })
		)
	}

	async getAllProducts(token: string) {

		const tokenData = this.authenticator.getData(token)
		if (!tokenData.id) {
			throw new UnauthorizedError("Only authorized can access this feature")
		}

		return await this.productDatabase.getAllProducts()
	}

	async initialProducts() {
		const products = fs.readFileSync(path.resolve('src/data/products_ascii.csv'),
			{ encoding: 'ascii', flag: 'r' })
			.replace(/\n/g, "")
			.split('\r')
			.map((row: string): string[] => {
				return row.split(',')
			})

		for (let c = 1; c < products.length - 1; c++) {
			await this.productDatabase.createProduct(
				Product.toProductModel({ 
					id: products[c][0], 
					name: products[c][1], 
					price: products[c][2], 
					qtyStock: products[c][3] 
				})
			)
		}

	}
}