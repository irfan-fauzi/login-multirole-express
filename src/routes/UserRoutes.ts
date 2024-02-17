import express from "express";
import { UserRegister, UserLogin, RefreshToken } from "../controllers/UserController";
import UserValidation from "../middleware/validation/UserValidation";

const UserRoute = express.Router();

UserRoute.post("/user/register", UserValidation.RegisterValidation, UserRegister);
UserRoute.post("/user/login", UserLogin);
UserRoute.get("/user/refresh-token", RefreshToken)

export default UserRoute;
