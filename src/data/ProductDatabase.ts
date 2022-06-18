
import { Product } from "../model/Product";
import { BaseDatabase } from "./BaseDatabase";

export class ProductDatabase extends BaseDatabase {

  public async createProduct(product: Product): Promise<void> {
    try {
      console.log(product.getQtyStock())
      await this.getConnection()
        .insert({
          id: product.getId(),
          name: product.getName(),
          price: product.getPrice(),
          qty_stock: product.getQtyStock(),
        })
        .into(this.tables.products)
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  public async getAllProducts(): Promise<Product[]> {
    const result = await this.getConnection()
      .select("*")
      .from(this.tables.products)

    return result
  }
}
