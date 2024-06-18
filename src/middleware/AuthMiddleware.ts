import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/AuthUtils";
import { RESPONSE_STATUS } from "../contracts/enum/ResponseRelated.enum";
import { ROLE } from "../contracts/enum/UserRelated.enum";
import { User } from "../models/dynamic/User.model";

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
    const { username, email } = decodedToken;
    try {
      const user = await User.findOne({ $or: [{ username }, { email }] });
      if (user) {
        (req as any).user = user;
        next();
      } else {
        return res
          .status(RESPONSE_STATUS.NOT_FOUND)
          .json({ msg: "User not found" });
      }
    } catch (error) {
      return res
        .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
        .json({ msg: "Internal server error" });
    }
  } catch (error) {
    return res.status(RESPONSE_STATUS.UNAUTHORIZED).send("Unauthorized");
  }
};

export const validateRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    console.log(user);
    if (user && user.role != role) {
      
      return res
        .status(RESPONSE_STATUS.UNAUTHORIZED)
        .json({ msg: `User is not ${role}` });
    }
    next();
  }
}

export const validateNotSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (token) {
    return res.status(RESPONSE_STATUS.UNAUTHORIZED).send("Please Logout First!");
  }
  next();
};
