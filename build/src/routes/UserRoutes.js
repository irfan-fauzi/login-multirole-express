"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const UserValidation_1 = __importDefault(require("../middleware/validation/UserValidation"));
const Auth_1 = require("../middleware/Auth");
const UserRoute = express_1.default.Router();
UserRoute.post("/user/register", UserValidation_1.default.RegisterValidation, UserController_1.UserRegister);
UserRoute.post("/user/login", UserController_1.UserLogin);
UserRoute.get("/user/refresh-token", UserController_1.RefreshToken);
UserRoute.get("/user/current-user", Auth_1.Authenticated, UserController_1.UserDetail);
UserRoute.get("/user/logout", Auth_1.Authenticated, UserController_1.UserLogout);
exports.default = UserRoute;
//# sourceMappingURL=UserRoutes.js.map