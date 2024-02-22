"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MasterMenuController_1 = require("../controllers/MasterMenuController");
const Authenticated_1 = require("../middleware/Authenticated");
const Authorization_1 = require("../middleware/Authorization");
const MasterMenuRoutes = express_1.default.Router();
MasterMenuRoutes.get("/menu/all", Authenticated_1.Authenticated, MasterMenuController_1.GetAllMenu);
MasterMenuRoutes.get("/menu/list", Authenticated_1.Authenticated, MasterMenuController_1.GetListMenu);
MasterMenuRoutes.get("/menu/:id", Authenticated_1.Authenticated, MasterMenuController_1.GetDetailMenu);
MasterMenuRoutes.post("/menu", Authenticated_1.Authenticated, Authorization_1.AdminRole, MasterMenuController_1.CreateMenu);
MasterMenuRoutes.patch("/menu/:id", Authenticated_1.Authenticated, Authorization_1.AdminRole, MasterMenuController_1.UpdateMenu);
MasterMenuRoutes.delete("/menu/delete/:id", Authenticated_1.Authenticated, Authorization_1.AdminRole, MasterMenuController_1.SoftDeleteMenu);
MasterMenuRoutes.delete("/menu/destroy/:id", Authenticated_1.Authenticated, Authorization_1.ManagerRole, MasterMenuController_1.DeletePermanentMenu);
exports.default = MasterMenuRoutes;
//# sourceMappingURL=MasterMenuRoutes.js.map