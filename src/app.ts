import express from "express";
import morgan from "morgan";
import router from "./v1/routes";

const app = express();

/**
 * * global middlewares
 */
app.use(morgan("dev"));
app.use(express.json());

/**
 * * routes
 */
app.use(router);

export default app;
