import express from "express";
import { Register } from "../controllers/UserController";
import { RegisterValidation } from "../middleware/validation/Validation";

const UserRoute = express.Router();

UserRoute.post("/register", RegisterValidation, Register);

export default UserRoute;
