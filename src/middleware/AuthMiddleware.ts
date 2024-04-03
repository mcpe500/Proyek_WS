import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/AuthUtils";
import { RESPONSE_STATUS } from "../contracts/enum/ResponseRelated.enum";

export const validateAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(RESPONSE_STATUS.UNAUTHORIZED).send("Unauthorized");
  }
  const accessToken = token.split(" ")[1];

  const decodedToken = verifyAccessToken(accessToken);

  if (!decodedToken) {
    return res.status(RESPONSE_STATUS.UNAUTHORIZED).send("Unauthorized");
  }

//   req.body.user_data = decodedToken;
  next();
};
