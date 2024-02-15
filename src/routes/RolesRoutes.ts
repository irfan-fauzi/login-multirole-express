import express from "express";
import {
  createRole,
  deleteRole,
  getAllRoles,
  getRoleById,
  updateRole,
} from "../controllers/RolesController";

const RoleRoutes = express.Router();

RoleRoutes.get("/role", getAllRoles);
RoleRoutes.get("/role/:id", getRoleById);
RoleRoutes.post("/role", createRole);
RoleRoutes.post("/role/:id", updateRole);
RoleRoutes.delete("/role/:id", deleteRole);

export default RoleRoutes;