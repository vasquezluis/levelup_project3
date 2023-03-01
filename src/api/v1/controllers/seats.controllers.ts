import { Request, Response } from "express";
import { seatsServices } from "../services/seats.services";
import { response } from "../../../common/response";
import createHttpError from "http-errors";

class ItemsController {
  // * get one item
  public getItem = async (req: Request, res: Response) => {
    try {
      const {
        params: { id },
      } = req;

      const result = await seatsServices.getSeat(id);

      if (!result) {
        response.error(res, new createHttpError.NotFound("Seat not found!"));
      } else {
        response.success(res, 200, `Seat data for ${id}`, result);
      }
    } catch (error: any) {
      response.error(res, error);
    }
  };

  // * get all items
  public getItems = async (req: Request, res: Response) => {
    try {
      const result = await seatsServices.getSeats();

      response.success(res, 200, "Seats list", result);
    } catch (error: any) {
      response.error(res, error);
    }
  };

  // * get all active items
  public getActiveItems = async (req: Request, res: Response) => {
    try {
      const result = await seatsServices.getActiveSeats();

      response.success(res, 200, "Active seats list", result);
    } catch (error: any) {
      response.error(res, error);
    }
  };

  // * create an item
  public createItem = async ({ body }: Request, res: Response) => {
    try {
      const movieId = body.movieId;
      const movie = body.movie;
      const availableSeats: any = [];
      const occupiedSeats: any = [
        "02",
        "03",
        "04",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "15",
        "16",
        "17",
        "22",
        "23",
        "24",
        "27",
        "28",
        "29",
        "30",
        "31",
        "32",
        "35",
        "36",
        "37",
        "42",
        "43",
        "44",
        "47",
        "48",
        "49",
      ];

      const result = await seatsServices.createSeat({
        movieId,
        movie,
        available: availableSeats,
        occupied: occupiedSeats,
      });

      response.success(res, 201, "Seat created", result);
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

      const result = await seatsServices.updateSeats(id, body);

      if (!result) {
        response.error(res, new createHttpError.NotFound("Seat not found!"));
      } else {
        response.success(res, 200, "Seat updated", result);
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

      const result = await seatsServices.deleteSeat(id);

      if (!result) {
        response.error(res, new createHttpError.NotFound("Seat not found!"));
      } else {
        response.success(res, 204, "Seat deleted", result);
      }
    } catch (error: any) {
      response.error(res, error);
    }
  };
}

export const itemsController = new ItemsController();
