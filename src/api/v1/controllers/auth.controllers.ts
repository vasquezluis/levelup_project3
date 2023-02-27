import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

import { authServices } from "../services/auth.services";

class ItemsController {
  private userData: any;
  private response: any;
  private jwtsecret: any;
  private expirationTime: string;

  constructor() {
    this.jwtsecret = process.env.JWT_SECRET;
    this.expirationTime = "1d";
  }

  public loginHandler = async (req: Request, res: Response) => {
    try {
      const { user, password } = req.body;

      this.response = await authServices.getUser(user);

      if (this.response == null) {
        return res.status(404).json({ message: "User not found" });
      } else {
        if (password != this.response.password) {
          return res.status(401).json({ message: "Incorrect password" });
        }
      }

      this.userData = {
        id: this.response._id,
        user: this.response.user,
        roles: this.response.roles,
        permissions: this.response.permissions,
      };

      jwt.sign(
        this.userData,
        this.jwtsecret,
        {
          expiresIn: this.expirationTime,
        },
        (error, token) => {
          res.json({
            message: "authData",
            token: token,
            expiration: `Expires in ${this.expirationTime} from now.`,
            userData: this.userData,
          });
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };
}

export const itemsController = new ItemsController();
