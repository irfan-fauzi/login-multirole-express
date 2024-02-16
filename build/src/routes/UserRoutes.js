"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const UserRoute = express_1.default.Router();
UserRoute.post("/register", UserController_1.Register);
exports.default = UserRoute;
//# sourceMappingURL=UserRoutes.js.map