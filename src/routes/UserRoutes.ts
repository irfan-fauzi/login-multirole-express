import express from "express";
import { UserRegister, UserLogin } from "../controllers/UserController";
import UserValidation from "../middleware/validation/UserValidation";

const UserRoute = express.Router();

UserRoute.post("/register", UserValidation.RegisterValidation, UserRegister);
UserRoute.post("/login", UserLogin);

export default UserRoute;
