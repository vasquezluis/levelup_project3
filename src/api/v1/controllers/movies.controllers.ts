import { Request, Response } from "express";
import { moviesServices } from "../services/movies.services";
import { response } from "../../../common/response";
import createHttpError from "http-errors";

class ItemsController {
  // * get one item
  public getItem = async (req: Request, res: Response) => {
    try {
      const {
        params: { id },
      } = req;

      const result = await moviesServices.getMovie(id);

      if (!result) {
        response.error(res, new createHttpError.NotFound("Movie not found!"));
      } else {
        response.success(res, 200, `Movie data for ${id}`, result);
      }
    } catch (error: any) {
      response.error(res, error);
    }
  };

  // * get all items
  public getItems = async (req: Request, res: Response) => {
    try {
      const result = await moviesServices.getMovies();

      response.success(res, 200, "Movies list", result);
    } catch (error: any) {
      response.error(res, error);
    }
  };

  // * get all active items
  public getActiveItems = async (req: Request, res: Response) => {
    try {
      const result = await moviesServices.getActiveMovies();

      response.success(res, 200, "Active movies list", result);
    } catch (error: any) {
      response.error(res, error);
    }
  };

  // * create an item
  public createItem = async ({ body }: Request, res: Response) => {
    try {
      const movie = body;

      const result = await moviesServices.createMovie(movie);

      response.success(res, 201, "Movie created", result);
    } catch (error: any) {
      response.error(res, error);
    }
  };

  // * update an item
  public updateItem = async (req: Request, res: Response) => {
    try {
      const {
        params: { id },
      } = req;
      const body = req.body;

      const result = await moviesServices.updateMovie(id, body);

      if (!result) {
        response.error(res, new createHttpError.NotFound("Movie not found!"));
      } else {
        response.success(res, 200, "Movie updated", result);
      }
    } catch (error: any) {
      response.error(res, error);
    }
  };

  // * delete an item
  public deleteItem = async (req: Request, res: Response) => {
    try {
      const {
        params: { id },
      } = req;

      const result = await moviesServices.deleteMovie(id);

      if (!result) {
        response.error(res, new createHttpError.NotFound("Movie not found!"));
      } else {
        response.success(res, 204, "Movie deleted", result);
      }
    } catch (error: any) {
      response.error(res, error);
    }
  };
}

export const itemsController = new ItemsController();
