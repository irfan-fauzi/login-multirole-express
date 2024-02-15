import express from "express";
import {
  createRole,
  getRoles,
  updateRole,
} from "../controllers/RolesController";

const RoleRoutes = express.Router();

RoleRoutes.get("/role", getRoles);
RoleRoutes.post("/role", createRole);
RoleRoutes.post("/role/:id", updateRole);

export default RoleRoutes;
