import { Request, Response } from "express";
import { response } from "../common/response";
import { createProducts, getProducts } from "../services/products.services";

export const getItems = async (req: Request, res: Response) => {
  try {
    const result = await getProducts();

    response.success(res, 200, "Products list", result);
  } catch (error) {
    response.error(res, error);
  }
};

export const createItems = async ({ body }: Request, res: Response) => {
  try {
    const result = await createProducts(body);

    response.success(res, 200, "Product created", result);
  } catch (error) {
    response.error(res, error);
  }
};
