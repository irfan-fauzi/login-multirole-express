"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RolesController_1 = require("../controllers/RolesController");
const Authenticated_1 = require("../middleware/Authenticated");
const Authorization_1 = require("../middleware/Authorization");
const RoleRoutes = express_1.default.Router();
RoleRoutes.get("/role", Authenticated_1.Authenticated, RolesController_1.getAllRoles);
RoleRoutes.get("/role/:id", RolesController_1.getRoleById);
RoleRoutes.post("/role", Authenticated_1.Authenticated, Authorization_1.ManagerRole, RolesController_1.createRole);
RoleRoutes.post("/role/:id", Authenticated_1.Authenticated, Authorization_1.ManagerRole, RolesController_1.updateRole);
RoleRoutes.delete("/role/:id", Authenticated_1.Authenticated, Authorization_1.ManagerRole, RolesController_1.deleteRole);
exports.default = RoleRoutes;
//# sourceMappingURL=RolesRoutes.js.map