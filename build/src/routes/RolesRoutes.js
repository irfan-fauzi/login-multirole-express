"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RolesController_1 = require("../controllers/RolesController");
const RoleRoutes = express_1.default.Router();
RoleRoutes.get("/role", RolesController_1.getRoles);
RoleRoutes.post("/role", RolesController_1.createRole);
RoleRoutes.post("/role/:id", RolesController_1.updateRole);
RoleRoutes.delete("/role/:id", RolesController_1.deleteRole);
exports.default = RoleRoutes;
//# sourceMappingURL=RolesRoutes.js.map