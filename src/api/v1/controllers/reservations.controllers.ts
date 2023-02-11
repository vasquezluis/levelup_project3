import { Request, Response } from "express";
import { reservationsServices } from "../services/reservations.services";
import { response } from "../../../common/response";

class ItemsController {
  public getItems = async (req: Request, res: Response) => {
    try {
      const result = await reservationsServices.getReservations();

      response.success(res, 200, "Reservations list", result);
    } catch (error: any) {
      response.error(res, error);
    }
  };
  public createItem = async ({ body }: Request, res: Response) => {
    try {
      const reservation = body;
      console.log(reservation);

      const result = await reservationsServices.createReservation(reservation);

      response.success(res, 201, "Reservation created", result);
    } catch (error: any) {
      response.error(res, error);
    }
  };
}

export const itemsController = new ItemsController();
