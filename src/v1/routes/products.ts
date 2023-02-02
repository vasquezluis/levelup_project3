import { Router } from "express";
import { createItems, getItems } from "../../controllers/products.controllers";
import { schemaValidation } from "../../middlewares/schemaValidator.middlewares";
import { CreateProductSchema } from "../../schemas/products.schema";

const router = Router();

/**
 * * http://localhost:3000/products
 */

router.get("/", getItems);

router.post("/", schemaValidation(CreateProductSchema), createItems);

export { router };
