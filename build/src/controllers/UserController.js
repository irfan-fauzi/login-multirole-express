"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = void 0;
const User_1 = __importDefault(require("../../models/User"));
const Helper_1 = __importDefault(require("../helper/Helper"));
const PasswordHelper_1 = __importDefault(require("../helper/PasswordHelper"));
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, confirmPassword } = req.body;
        const hashPassword = yield PasswordHelper_1.default.PasswordHashing(password);
        const user = yield User_1.default.create({
            name,
            email,
            password: hashPassword,
            active: true,
            verified: true,
            roleId: 1,
        });
        return res
            .status(201)
            .send(Helper_1.default.ResponseData(201, "Created", null, user));
    }
    catch (error) {
        return res.status(500).send(Helper_1.default.ResponseData(500, "", error, null));
    }
});
exports.Register = Register;
//# sourceMappingURL=UserController.js.map