import { Request, Response } from "express";
import { accreditationsServices } from "../services/accreditations.services";
import { response } from "../../../common/response";
import createHttpError from "http-errors";

class ItemsController {
  // * get one item
  public getItem = async (req: Request, res: Response) => {
    try {
      const {
        params: { id },
      } = req;

      const result = await accreditationsServices.getAccreditation(id);

      if (!result) {
        response.error(
          res,
          new createHttpError.NotFound("Accreditation not found!")
        );
      } else {
        response.success(res, 200, `Accreditation data for ${id}`, result);
      }
    } catch (error: any) {
      response.error(res, error);
    }
  };

  // * get all items
  public getItems = async (req: Request, res: Response) => {
    try {
      const result = await accreditationsServices.getAccreditations();

      response.success(res, 200, "Accreditations list", result);
    } catch (error: any) {
      response.error(res, error);
    }
  };

  // * get all active items
  public getActiveItems = async (req: Request, res: Response) => {
    try {
      const result = await accreditationsServices.getActiveAccreditations();

      response.success(res, 200, "Active accreditations list", result);
    } catch (error: any) {
      response.error(res, error);
    }
  };

  // * create an item
  public createItem = async ({ body }: Request, res: Response) => {
    try {
      const accreditation = body;

      const result = await accreditationsServices.createAccreditation(
        accreditation
      );

      response.success(res, 201, "Accreditation created", result);
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

      const result = await accreditationsServices.updateAccreditation(id, body);

      if (!result) {
        response.error(
          res,
          new createHttpError.NotFound("Accreditation not found!")
        );
      } else {
        response.success(res, 200, "Accreditation updated", result);
      }
    } catch (error: any) {
      response.error(res, error);
    }
  };

  // * soft delete an item (accepting accreditation)
  public deleteItem = async (req: Request, res: Response) => {
    try {
      const {
        params: { id },
      } = req;

      const result = await accreditationsServices.deleteAccreditation(id);

      if (!result) {
        response.error(
          res,
          new createHttpError.NotFound("Accreditation not found!")
        );
      } else {
        response.success(res, 204, "Accreditation deleted", result);
      }
    } catch (error: any) {
      response.error(res, error);
    }
  };

  // * accept an accreditation
  public acceptItem = async (req: Request, res: Response) => {
    try {
      const {
        params: { id },
      } = req;
      const { credits } = req.body;

      const result = await accreditationsServices.acceptAccreditation(
        id,
        credits
      );

      if (!result) {
        response.error(
          res,
          new createHttpError.NotFound("Accreditation not found!")
        );
      } else {
        response.success(res, 200, "Accreditation accepted", result);
      }
    } catch (error: any) {
      response.error(res, error);
    }
  };
}

export const itemsController = new ItemsController();
