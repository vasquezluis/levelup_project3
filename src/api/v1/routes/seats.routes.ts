import { Router } from "express";
import { itemsController } from "../controllers/seats.controllers";

// ? authtentications
import { requireAdminAuth } from "../middlewares/adminAuthValidator.middlewares";
import { requireAuth } from "../middlewares/userAuthValidator.middlewares";

import { schemaValidation } from "../middlewares/schemaValidator.middlewares";
import { CreateMoviesSchema } from "../schemas/movies.schema";

/**
 * * http://localhost:3000/api/v1/movies
 */

class SeatsRoutes {
  public router: Router = Router(); //* router config

  constructor() {
    this.config();
  }

  //* routes config
  config(): void {
    this.router.get("/active", itemsController.getActiveItems);
    this.router.get("/:id", itemsController.getItem);
    this.router.get("/", itemsController.getItems);
    this.router.post("/", requireAdminAuth, itemsController.createItem);
    this.router.put("/:id", requireAuth, itemsController.updateItem);
    this.router.delete("/:id", requireAdminAuth, itemsController.deleteItem);
  }
}

const seatsRoutes = new SeatsRoutes();
export default seatsRoutes.router;
