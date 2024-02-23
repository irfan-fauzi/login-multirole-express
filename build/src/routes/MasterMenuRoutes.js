"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MasterMenuController_1 = require("../controllers/MasterMenuController");
const Authenticated_1 = require("../middleware/Authenticated");
const Authorization_1 = require("../middleware/Authorization");
const MenuValidation_1 = __importDefault(require("../middleware/validation/MenuValidation"));
const MasterMenuRoutes = express_1.default.Router();
// GET ALL
MasterMenuRoutes.get("/menu/get/all", Authenticated_1.Authenticated, MasterMenuController_1.GetAllMenu);
// GET ONLY ACTIVE
MasterMenuRoutes.get("/menu", Authenticated_1.Authenticated, MasterMenuController_1.GetListMenu);
// ----------------------------------------------------------------
// GET DETAIL ONE
MasterMenuRoutes.get("/menu/:id", Authenticated_1.Authenticated, MasterMenuController_1.GetDetailMenu);
// ----------------------------------------------------------------
// CREATE
MasterMenuRoutes.post("/menu", MenuValidation_1.default.CreateMenuValidation, Authenticated_1.Authenticated, Authorization_1.AdminRole, MasterMenuController_1.CreateMenu);
// UPDATE
MasterMenuRoutes.patch("/menu/:id", MenuValidation_1.default.CreateMenuValidation, Authenticated_1.Authenticated, Authorization_1.AdminRole, MasterMenuController_1.UpdateMenu);
// SOFT DELETE
MasterMenuRoutes.delete("/menu/:id", Authenticated_1.Authenticated, Authorization_1.AdminRole, MasterMenuController_1.SoftDeleteMenu);
// DELETE PERMANENT
MasterMenuRoutes.delete("/menu/destroy/:id", Authenticated_1.Authenticated, Authorization_1.ManagerRole, MasterMenuController_1.DeletePermanentMenu);
exports.default = MasterMenuRoutes;
//# sourceMappingURL=MasterMenuRoutes.js.map