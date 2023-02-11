import { Router } from "express";
import { itemsController } from "../controllers/reservations.controllers";
import { schemaValidation } from "../middlewares/schemaValidator.middlewares";
import { CreateMoviesSchema } from "../schemas/movies.schema";

/**
 * * http://localhost:3000/api/v1/reservations
 */

class ReservationsRoutes {
  public router: Router = Router(); //* router config

  constructor() {
    this.config();
  }

  //* routes config
  config(): void {
    this.router.get("/", itemsController.getItems);
    this.router.post("/", itemsController.createItem);
  }
}

const reservationsRoutes = new ReservationsRoutes();
export default reservationsRoutes.router;
