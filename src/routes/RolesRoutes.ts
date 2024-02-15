import express from "express";
import {
  createRole,
  deleteRole,
  getRoles,
  updateRole,
} from "../controllers/RolesController";

const RoleRoutes = express.Router();

RoleRoutes.get("/role", getRoles);
RoleRoutes.post("/role", createRole);
RoleRoutes.post("/role/:id", updateRole);
RoleRoutes.delete("/role/:id", deleteRole);

export default RoleRoutes;
