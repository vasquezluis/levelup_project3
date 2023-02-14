import { Router } from "express";
import { itemsController } from "../controllers/movies.controllers";
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
    this.router.get("/:movieName", itemsController.getItem);
    this.router.get("/", itemsController.getItems);
    this.router.post("/", itemsController.createItem);
  }
}

const moviesRoutes = new MoviesRoutes();
export default moviesRoutes.router;
