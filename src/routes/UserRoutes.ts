import express from "express";
import { Register } from "../controllers/UserController";

const UserRoute = express.Router();

UserRoute.post("/register", Register);

export default UserRoute;
