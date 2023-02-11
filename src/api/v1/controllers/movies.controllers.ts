import { Request, Response } from "express";
import { moviesServices } from "../services/movies.services";
import { response } from "../../../common/response";

class ItemsController {
  public getItems = async (req: Request, res: Response) => {
    try {
      const result = await moviesServices.getMovies();

      response.success(res, 200, "Movies list", result);
    } catch (error: any) {
      response.error(res, error);
    }
  };
  public createItem = async ({ body }: Request, res: Response) => {
    try {
      const movie = body;
      console.log(movie)

      const result = await moviesServices.createMovie(movie);

      response.success(res, 201, "Movie created", result);
    } catch (error: any) {
      response.error(res, error);
    }
  };
}

export const itemsController = new ItemsController();
