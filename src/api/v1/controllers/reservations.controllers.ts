import { Request, Response } from "express";
import { reservationsServices } from "../services/reservations.services";
import { response } from "../../../common/response";
import createHttpError from "http-errors";

class ItemsController {
  // * get one item
  public getItem = async (req: Request, res: Response) => {
    try {
      const {
        params: { id },
      } = req;

      const result = await reservationsServices.getReservation(id);

      if (!result) {
        response.error(
          res,
          new createHttpError.NotFound("Reservation not found!")
        );
      } else {
        response.success(res, 200, `Reservation ${id}`, result);
      }
    } catch (error: any) {
      response.error(res, error);
    }
  };

  // * get all items
  public getItems = async (req: Request, res: Response) => {
    try {
      const result = await reservationsServices.getReservations();

      response.success(res, 200, "Reservations list", result);
    } catch (error: any) {
      response.error(res, error);
    }
  };

  // * get all active items
  public getActiveItems = async (req: Request, res: Response) => {
    try {
      const result = await reservationsServices.getActiveReservations();

      response.success(res, 200, "Active reservations list", result);
    } catch (error: any) {
      response.error(res, error);
    }
  };

  // * create an item
  public createItem = async ({ body }: Request, res: Response) => {
    try {
      const reservation = body;

      const result = await reservationsServices.createReservation(reservation);

      // * handling result
      if (result == "Insufficient credits") {
        response.error(
          res,
          new createHttpError.BadRequest("Insufficient credits")
        );
      } else {
        response.success(res, 201, "Reservation created", result);
      }
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

      const result = await reservationsServices.updateReservation(id, body);

      if (!result) {
        response.error(
          res,
          new createHttpError.NotFound("Reservation not found!")
        );
      } else {
        response.success(res, 200, "Reservation updated", result);
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

      const result = await reservationsServices.deleteReservation(id);

      if (!result) {
        response.error(
          res,
          new createHttpError.NotFound("Reservation not found!")
        );
      } else {
        response.success(res, 204, "Reservation deleted", result);
      }
    } catch (error: any) {
      response.error(res, error);
    }
  };
}

export const itemsController = new ItemsController();
