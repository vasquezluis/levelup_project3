import { Router } from "express";
import { itemsController } from "../../controllers/products.controllers";
import { schemaValidation } from "../../middlewares/schemaValidator.middlewares";
import { CreateProductSchema } from "../../schemas/products.schema";

/**
 * * http://localhost:3000/api/v1/products
 */

class ProductsRoutes {
  public router: Router = Router(); //* router config

  constructor() {
    this.config();
  }

  //* routes config
  config(): void {
    this.router.get("/", itemsController.getItems);
    this.router.post(
      "/",
      schemaValidation(CreateProductSchema),
      itemsController.createItem
    );
  }
}

const productsRoutes = new ProductsRoutes();
export default productsRoutes.router;
