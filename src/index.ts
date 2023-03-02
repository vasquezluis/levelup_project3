import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import "dotenv/config";

import db from "./config/mongo";
import swaggerOptionsFile from "./swagger.json";

import indexRoutes from "./api/v1/routes/index";
import moviesRoutes from "./api/v1/routes/movies.routes";
import usersRoutes from "./api/v1/routes/users.routes";
import reservationsRoutes from "./api/v1/routes/reservations.routes";
import accreditationsRoutes from "./api/v1/routes/accreditations.routes";
import authRoutes from "./api/v1/routes/auth.routes";
import seatsRoutes from "./api/v1/routes/seats.routes";

class Server {
  //* server class

  public app: Application; //* app creation with express Application
  public specs: any;

  constructor() {
    this.app = express();
    this.specs = swaggerJSDoc(swaggerOptionsFile);

    //* ? app config
    this.config();
    this.routes();
    this.database();
  }

  //* global config method
  config(): void {
    this.app.set("port", process.env.PORT || 3000); //* node process
    this.app.use(morgan("dev"));
    this.app.use(
      cors({
        origin: "https://pelispelis.netlify.app",
        credentials: true,
      })
    );
    this.app.use(express.json());
    this.app.use(
      "/api/v1/api-docs",
      swaggerUI.serve,
      swaggerUI.setup(this.specs)
    );
  }

  //* routes config method
  routes(): void {
    this.app.use("/", indexRoutes);
    this.app.use("/api/v1/movies", moviesRoutes);
    this.app.use("/api/v1/users", usersRoutes);
    this.app.use("/api/v1/reservations", reservationsRoutes);
    this.app.use("/api/v1/accreditations", accreditationsRoutes);
    this.app.use("/api/v1/login", authRoutes);
    this.app.use("/api/v1/seats", seatsRoutes);
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
