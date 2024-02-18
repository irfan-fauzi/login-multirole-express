import express from "express";
import {
  UserRegister,
  UserLogin,
  RefreshToken,
  UserDetail,
} from "../controllers/UserController";
import UserValidation from "../middleware/validation/UserValidation";
import { Authenticated } from "../middleware/Auth";

const UserRoute = express.Router();

UserRoute.post(
  "/user/register",
  UserValidation.RegisterValidation,
  UserRegister
);
UserRoute.post("/user/login", UserLogin);
UserRoute.get("/user/refresh-token", RefreshToken);
UserRoute.get("/user/current-user", Authenticated, UserDetail);

export default UserRoute;
