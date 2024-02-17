import { type Request, type Response, type NextFunction } from "express";
import Helper from "../helper/ResponseData";
import { ExtractToken } from "../helper/GenerateToken";

export const Authenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authToken = req.headers["authorization"];
    const token = authToken && authToken.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .send(Helper.ResponseData(401, "unauthorized", null, null));
    }
    const result = ExtractToken(token!);
    next();
  } catch (error) {
    return res
      .status(500)
      .send(Helper.ResponseData(500, "auth failed", error, null));
  }
};
