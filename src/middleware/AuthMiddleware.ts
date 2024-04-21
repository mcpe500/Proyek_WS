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
  const [prefix, accessToken] = token.split(" ");
  if (prefix != "Bearer") {
    return res.status(RESPONSE_STATUS.UNAUTHORIZED).send("Unauthorized");
  }
  try {
    const decodedToken = verifyAccessToken(accessToken);
    if (!decodedToken) {
      return res.status(RESPONSE_STATUS.UNAUTHORIZED).send("Unauthorized");
    }
    next();
  } catch (error) {
    return res.status(RESPONSE_STATUS.UNAUTHORIZED).send("Unauthorized");
  }
};
