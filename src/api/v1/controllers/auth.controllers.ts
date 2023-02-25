import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

import { authServices } from "../services/auth.services";

class ItemsController {
  private userData = {
    email: "luivasquez95@gmail.com",
    user: "luisvasquez",
  };
  private response: any;
  private jwtsecret: any;
  private expirationTime: string;

  constructor() {
    this.userData = this.userData;
    this.jwtsecret = process.env.JWT_SECRET;
    this.expirationTime = "5h";
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
            userData: {
              id: this.response._id,
              user: this.response.user,
            },
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
