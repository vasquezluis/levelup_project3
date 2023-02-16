import { Request, Response } from "express";
import { usersServices } from "../services/users.services";
import { response } from "../../../common/response";
import createHttpError from "http-errors";

class ItemsController {
  // * get one item
  public getItem = async (req: Request, res: Response) => {
    try {
      const {
        params: { id },
      } = req;

      const result = await usersServices.getUser(id);

      if (!result) {
        response.error(res, new createHttpError.NotFound("User not found!"));
      } else {
        response.success(res, 200, `User ${id}`, result);
      }
    } catch (error: any) {
      response.error(res, error);
    }
  };

  // * get all items
  public getItems = async (req: Request, res: Response) => {
    try {
      const result = await usersServices.getUsers();

      response.success(res, 200, "Users list", result);
    } catch (error: any) {
      response.error(res, error);
    }
  };

  // * get all active items
  public getActiveItems = async (req: Request, res: Response) => {
    try {
      const result = await usersServices.getActiveUsers();

      response.success(res, 200, "Active users list", result);
    } catch (error: any) {
      response.error(res, error);
    }
  };

  // * create an item
  public createItem = async ({ body }: Request, res: Response) => {
    try {
      const user = body;

      const result = await usersServices.createUser(user);

      response.success(res, 201, "User created", result);
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

      const result = await usersServices.updateUser(id, body);

      if (!result) {
        response.error(res, new createHttpError.NotFound("User not found!"));
      } else {
        response.success(res, 200, "User updated", result);
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

      const result = await usersServices.deleteUser(id);

      if (!result) {
        response.error(res, new createHttpError.NotFound("User not found!"));
      } else {
        response.success(res, 204, "User deleted", result);
      }
    } catch (error: any) {
      response.error(res, error);
    }
  };

  // * get all reservation of a user
  public getUsersReservations = async (req: Request, res: Response) => {
    try {
      const {
        params: { id },
      } = req;

      const result = await usersServices.getUserReservations(id);

      response.success(res, 200, `Reservations for user ${id}`, result);
    } catch (error) {
      response.error(res, error);
    }
  };

  // * get all accreditations petition of a user
  public getUsersAccreditations = async (req: Request, res: Response) => {
    try {
      const {
        params: { id },
      } = req;

      const result = await usersServices.getUserAccreditations(id);

      response.success(res, 200, `Accreditations for user ${id}`, result);
    } catch (error) {
      response.error(res, error);
    }
  };
}

export const itemsController = new ItemsController();
