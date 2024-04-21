import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { RESPONSE_STATUS } from "../contracts/enum/ResponseRelated.enum";

export const validateBody = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (err: any) {
      res
        .status(RESPONSE_STATUS.BAD_REQUEST)
        .send({ error: err.details[0].message });
    }
  };
};

export const validateCookie = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.cookies);
      next();
    } catch (err: any) {
      res
        .status(RESPONSE_STATUS.BAD_REQUEST)
        .send({ error: err.details[0].message });
    }
  };
};
