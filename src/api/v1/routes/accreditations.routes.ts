import { Router } from "express";
import { itemsController } from "../controllers/accreditations.controllers";

// ? authtentications
import { requireAdminAuth } from "../middlewares/adminAuthValidator.middlewares";
import { requireAuth } from "../middlewares/userAuthValidator.middlewares";

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
    this.router.get(
      "/active",
      requireAdminAuth,
      itemsController.getActiveItems
    );
    this.router.get("/:id", requireAdminAuth, itemsController.getItem);
    this.router.get("/", requireAdminAuth, itemsController.getItems);
    this.router.post("/", requireAuth, itemsController.createItem);
    this.router.put("/:id", requireAdminAuth, itemsController.updateItem);
    this.router.delete("/:id", requireAdminAuth, itemsController.deleteItem);
    this.router.put(
      "/:id/accept",
      requireAdminAuth,
      itemsController.acceptItem
    );
  }
}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;
