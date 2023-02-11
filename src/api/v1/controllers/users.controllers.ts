import { Request, Response } from "express";
import { usersServices } from "../services/users.services";
import { response } from "../../../common/response";

class ItemsController {
  public getItems = async (req: Request, res: Response) => {
    try {
      const result = await usersServices.getUsers();

      response.success(res, 200, "Users list", result);
    } catch (error: any) {
      response.error(res, error);
    }
  };

  public createItem = async ({ body }: Request, res: Response) => {
    try {
      const user = body;
      console.log(user);

      const result = await usersServices.createUser(user);

      response.success(res, 201, "User created", result);
    } catch (error: any) {
      response.error(res, error);
    }
  };

  public getUsersReservations = async (req: Request, res: Response) => {
    try {
      const {
        params: { userId },
      } = req;

      const result = await usersServices.getUserReservations(userId);
      console.log(result)

      response.success(res, 200, `Reservations for user ${userId}`, result);
    } catch (error) {
      response.error(res, error);
    }
  };
}

export const itemsController = new ItemsController();
