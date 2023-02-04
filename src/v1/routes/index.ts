import { Router, Request, Response } from "express";
import { response } from "../../common/response";

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
        docs: `http://${host}/api/v1/api/docs`,
        products: `http://${host}/api/v1/products`,
      };

      response.success(res, 200, "Api menu", menu);
    });
  }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
