import "dotenv/config";
import db from "./config/mongo";

import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

import productsRoutes from "./v1/routes/products.routes";
import indexRoutes from "./v1/routes/index";

class Server {
  //* server class

  public app: Application; //* app creation with express Application

  constructor() {
    this.app = express();

    //* ? app config
    this.config();
    this.routes();
    this.database();
  }

  //* global config method
  config(): void {
    this.app.set("port", process.env.PORT || 3000); //* node process
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
  }

  //* routes config method
  routes(): void {
    this.app.use("/", indexRoutes);
    this.app.use("/api/v1/products", productsRoutes);
  }

  //* database config method
  database(): void {
    db().then(() => {
      console.log("mongodb atlas connected");
    });
  }

  //* start method, stay listening
  start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server listening on por: `, this.app.get("port"));
    });
  }
}

export const server = new Server(); //* constructor start
server.start();
