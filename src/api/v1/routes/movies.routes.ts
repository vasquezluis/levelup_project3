import { Router } from "express";
import { itemsController } from "../controllers/movies.controllers";

// ? authtentications
import { requireAdminAuth } from "../middlewares/adminAuthValidator.middlewares";
import { requireAuth } from "../middlewares/userAuthValidator.middlewares";

import { schemaValidation } from "../middlewares/schemaValidator.middlewares";
import { CreateMoviesSchema } from "../schemas/movies.schema";

/**
 * * http://localhost:3000/api/v1/movies
 */

class MoviesRoutes {
  public router: Router = Router(); //* router config

  constructor() {
    this.config();
  }

  //* routes config
  config(): void {
    this.router.get("/active", itemsController.getActiveItems);
    this.router.get("/:id", itemsController.getItem);
    this.router.get("/:id/seats", itemsController.getMovieSeats);
    this.router.get("/", itemsController.getItems);
    this.router.post("/", requireAdminAuth, itemsController.createItem);
    this.router.put("/:id", requireAdminAuth, itemsController.updateItem);
    this.router.delete("/:id", requireAdminAuth, itemsController.deleteItem);
  }
}

const moviesRoutes = new MoviesRoutes();
export default moviesRoutes.router;
