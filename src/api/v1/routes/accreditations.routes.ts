import { Router } from "express";
import { itemsController } from "../controllers/accreditations.controllers";
import { schemaValidation } from "../middlewares/schemaValidator.middlewares";
import { CreateMoviesSchema } from "../schemas/movies.schema";

/**
 * * http://localhost:3000/api/v1/accreditations
 */

class UsersRoutes {
  public router: Router = Router(); //* router config

  constructor() {
    this.config();
  }

  //* routes config
  config(): void {
    this.router.get("/active", itemsController.getActiveItems);
    this.router.get("/:id", itemsController.getItem);
    this.router.get("/", itemsController.getItems);
    this.router.post("/", itemsController.createItem);
    this.router.put("/:id", itemsController.updateItem);
    this.router.delete("/:id", itemsController.deleteItem);
    this.router.put("/:id/accept", itemsController.acceptItem);
  }
}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;
