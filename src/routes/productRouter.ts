import express from "express"
import { ProductController } from "../controller/ProductController"

export const productRouter = express.Router()

const productController = new ProductController()

productRouter.get("/all", productController.allProduct)
productRouter.post("/create", productController.createProduct)
productRouter.post("/initial", productController.initialProducts)
