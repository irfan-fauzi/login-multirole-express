"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Authenticated_1 = require("../middleware/Authenticated");
const Authorization_1 = require("../middleware/Authorization");
const SubMenuController_1 = require("../controllers/SubMenuController");
const MenuValidation_1 = __importDefault(require("../middleware/validation/MenuValidation"));
const SubMenuRouter = express_1.default.Router();
// GET ALL
SubMenuRouter.get("/submenu/get/all", Authenticated_1.Authenticated, SubMenuController_1.GetAllSubMenu);
// CREATE
SubMenuRouter.post("/submenu", MenuValidation_1.default.CreateSubMenuValidation, Authenticated_1.Authenticated, Authorization_1.AdminRole, SubMenuController_1.CreateSubMenu);
// GET ONLY ACTIVE
SubMenuRouter.get("/submenu", Authenticated_1.Authenticated, SubMenuController_1.GetListSubMenu);
// GET DETAIL
SubMenuRouter.get("/submenu/:id", Authenticated_1.Authenticated, SubMenuController_1.GetDetailSubMenu);
// UPDATE
SubMenuRouter.patch("/submenu/:id", 
// MenuValidation.CreateSubMenuValidation,
Authenticated_1.Authenticated, Authorization_1.AdminRole, SubMenuController_1.UpdateSubMenu);
// SOFT DELETE
SubMenuRouter.delete("/submenu/:id", Authenticated_1.Authenticated, Authorization_1.AdminRole, SubMenuController_1.SoftDeleteSubMenu);
// DELETE PERMANANET
SubMenuRouter.delete("/submenu/destroy/:id", Authenticated_1.Authenticated, Authorization_1.ManagerRole, SubMenuController_1.DeletePermanentSubMenu);
exports.default = SubMenuRouter;
//# sourceMappingURL=SubMenuRoutes.js.map