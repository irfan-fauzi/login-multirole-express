import express from "express";
import { createRole, getRoles } from "../controllers/RolesController";

const RoleRoutes = express.Router();

RoleRoutes.get("/role", getRoles);
RoleRoutes.post("/role", createRole);

export default RoleRoutes;
