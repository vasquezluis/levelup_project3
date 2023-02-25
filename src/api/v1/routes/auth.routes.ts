import { Router } from "express";
import { itemsController } from "../controllers/auth.controllers";

/**
 * * http://localhost/api/v1/auth
 */

class AuthRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.post("/", itemsController.loginHandler);
  }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;
