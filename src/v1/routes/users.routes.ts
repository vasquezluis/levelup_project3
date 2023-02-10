import { Router } from "express";
import { itemsController } from "../../controllers/users.controllers";
import { schemaValidation } from "../../middlewares/schemaValidator.middlewares";
import { CreateMoviesSchema } from "../../schemas/movies.schema";

/**
 * * http://localhost:3000/api/v1/users
 */

class UsersRoutes {
  public router: Router = Router(); //* router config

  constructor() {
    this.config();
  }

  //* routes config
  config(): void {
    this.router.get("/", itemsController.getItems);
    this.router.post("/", itemsController.createItem);
    this.router.get("/:userId", itemsController.getUsersReservations);
  }
}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;
