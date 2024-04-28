import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/AuthUtils";
import { RESPONSE_STATUS } from "../contracts/enum/ResponseRelated.enum";

export const validateAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  // console.log(req.headers)
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
    req.body.username = decodedToken.username;
    req.body.email = decodedToken.email;
    
    
    next();
  } catch (error) {
    return res.status(RESPONSE_STATUS.UNAUTHORIZED).send("Unauthorized");
  }
};
