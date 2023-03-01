import { Router, Request, Response } from "express";
import { response } from "../../../common/response";

/**
 * * http://localhost:3000/api/v1/
 */

class IndexRoutes {
  public router: Router = Router(); //* router config

  constructor() {
    this.config();
  }

  //* routes config
  config(): void {
    this.router.get("/", ({ headers: { host } }: Request, res: Response) => {
      const menu: { [key: string]: string } = {
        docs: `http://${host}/api/v1/api-docs`,
        login: `http://${host}/api/v1/login`,
        movies: `http://${host}/api/v1/movies`,
        seats: `http://${host}/api/v1/seats`,
        users: `http://${host}/api/v1/users`,
        reservations: `http://${host}/api/v1/reservations`,
        accreditations: `http://${host}/api/v1/accreditations`,
      };

      response.success(res, 200, "Api menu", menu);
    });
  }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
