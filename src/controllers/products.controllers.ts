import { Request, Response } from "express";
import { productsServices } from "../services/products.services";
import { response } from "../common/response";

class ItemsController {
  public getItems = async (req: Request, res: Response) => {
    try {
      const result = await productsServices.getProducts();

      response.success(res, 200, "Products list", result);
    } catch (error: any) {
      response.error(res, error);
    }
  };
  public createItem = async ({ body }: Request, res: Response) => {
    try {
      const product = body;

      const result = await productsServices.createProducts(product);

      response.success(res, 201, "Product created", result);
    } catch (error: any) {
      response.error(res, error);
    }
  };
}

export const itemsController = new ItemsController();
