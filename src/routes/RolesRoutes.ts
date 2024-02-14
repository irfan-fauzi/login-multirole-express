import express from "express";
import { getRoles } from "../controllers/RolesController";

const RoleRoutes = express.Router();

RoleRoutes.get("/role", getRoles);

export default RoleRoutes