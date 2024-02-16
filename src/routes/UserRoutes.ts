import express from "express";
import { Register } from "../controllers/UserController";
import UserValidation from "../middleware/validation/UserValidation";


const UserRoute = express.Router();

UserRoute.post("/register", UserValidation.RegisterValidation, Register);

export default UserRoute;
