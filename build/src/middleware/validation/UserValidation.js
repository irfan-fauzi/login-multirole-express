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
const validatorjs_1 = __importDefault(require("validatorjs"));
const ResponseData_1 = __importDefault(require("../../helper/ResponseData"));
const User_1 = __importDefault(require("../../../models/User"));
const RegisterValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ambil data dari req body
        const { name, email, password, confirmPassword } = req.body;
        const data = {
            name,
            email,
            password,
            confirmPassword,
        };
        // buat rules untuk validasi
        const rules = {
            name: "required|string|max:50",
            email: "required|email",
            password: "required|min:8",
            confirmPassword: "required|same:password",
        };
        // bandingkan data yang dikirim dengan rules
        const validate = new validatorjs_1.default(data, rules);
        // jika validasi gagal
        if (validate.fails()) {
            return res
                .status(400)
                .send(ResponseData_1.default.ResponseData(400, "Bad Request", validate.errors, null));
        }
        // jika email sudah digunakan user lain
        const user = yield User_1.default.findOne({
            where: {
                email: data.email,
            },
        });
        if (user) {
            const errorData = {
                errors: {
                    email: ["Email has already used"],
                },
            };
            return res
                .status(500)
                .send(ResponseData_1.default.ResponseData(400, "Bad Request", errorData, null));
        }
        next();
    }
    catch (error) {
        return res.status(500).send(ResponseData_1.default.ResponseData(500, "", error, null));
    }
});
exports.default = { RegisterValidation };
//# sourceMappingURL=UserValidation.js.map