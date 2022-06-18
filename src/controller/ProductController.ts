import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { ProductDatabase } from "../data/ProductDatabase";
import { ProductInputDTO } from "../model/Product";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";


const productBusiness = new ProductBusiness(
	new ProductDatabase,
	new IdGenerator,
	new Authenticator
)

export class ProductController {

	async createProduct(req: Request, res: Response) {
		try {
			const input: ProductInputDTO = {
				name: req.body.name,
				price: req.body.price,
				qtyStock: req.body.qtyStock,
			}
			await productBusiness.createProduct(input, req.headers.authorization as string);
			res.status(200).send({ message: "Product created successfully" })
		} catch (error) {
			res.status(400).send({ error: error.message })
		} finally {
			await BaseDatabase.destroyConnection()
		}
	}

	async allProduct(req: Request, res: Response) {
		try {
			const products = await productBusiness.getAllProducts(req.headers.authorization as string)
			res.status(200).send({ products }).end()
		} catch (error) {
			res.status(400).send({ error: error.message })
		} finally {
			await BaseDatabase.destroyConnection()
		}
	}

	async initialProducts(req: Request, res: Response) {
		try {
			const products = await productBusiness.initialProducts()
			res.status(200).send({ message: "Products created successfully" })
		} catch (error) {
			res.status(400).send({ error: error.message })
		} finally {
			await BaseDatabase.destroyConnection()
		}
	}

}