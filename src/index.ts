import "dotenv/config";
import db from "./config/mongo";

import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

import indexRoutes from "./api/v1/routes/index";
import moviesRoutes from "./api/v1/routes/movies.routes";
import usersRoutes from "./api/v1/routes/users.routes";
import reservationsRoutes from "./api/v1/routes/reservations.routes";
import accreditationsRoutes from "./api/v1/routes/accreditations.routes";

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
    this.app.use("/api/v1/movies", moviesRoutes);
    this.app.use("/api/v1/users", usersRoutes);
    this.app.use("/api/v1/reservations", reservationsRoutes);
    this.app.use("/api/v1/accreditations", accreditationsRoutes);
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
