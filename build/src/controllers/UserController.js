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
exports.UserLogout = exports.UserDetail = exports.RefreshToken = exports.UserLogin = exports.UserRegister = void 0;
const User_1 = __importDefault(require("../../models/User"));
const ResponseData_1 = __importDefault(require("../helper/ResponseData"));
const PasswordHelper_1 = __importDefault(require("../helper/PasswordHelper"));
const GenerateToken_1 = require("../helper/GenerateToken");
const Role_1 = __importDefault(require("../../models/Role"));
const UserRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, confirmPassword, roleId } = req.body;
        const hashPassword = yield PasswordHelper_1.default.PasswordHashing(password);
        const user = yield User_1.default.create({
            name,
            email,
            password: hashPassword,
            active: true,
            verified: true,
            roleId: roleId,
        });
        return res
            .status(201)
            .send(ResponseData_1.default.ResponseData(201, "Created", null, user));
    }
    catch (error) {
        return res.status(500).send(ResponseData_1.default.ResponseData(500, "", error, null));
    }
});
exports.UserRegister = UserRegister;
const UserLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ambil email dan password dari user
        const { email, password } = req.body;
        // cari email yang dimasukan user apakah ada yang sama dengan di database
        const user = yield User_1.default.findOne({
            where: {
                email: email,
            },
        });
        // catatan: jika email tidak ada jangan pernah kasih respon "email tidak ditemukan, karena user bisa saja pakai email lain / potensi hack akun"
        if (!user) {
            // better kasih respon unauthorized
            return res
                .status(401)
                .send(ResponseData_1.default.ResponseData(401, "Unauthorized", null, null));
        }
        //  next step => komparasi password yang user input dengan password di database
        const matched = yield PasswordHelper_1.default.PasswordCompare(password, user.password);
        // jika tidak cocok antara input dari user dengan password database
        if (!matched) {
            return res
                .status(401)
                .send(ResponseData_1.default.ResponseData(401, "Unauthorized", null, null));
        }
        // generate Token dari JWT for secure
        // 1. inisialisasi data yang akan di generate
        const dataUserWithoutToken = {
            name: user.name,
            email: user.email,
            roleId: user.roleId,
            verified: user.verified,
            active: user.active,
        };
        // 2.generate token
        const token = (0, GenerateToken_1.GenerateToken)(dataUserWithoutToken);
        const refreshToken = (0, GenerateToken_1.GenerateRefreshToken)(dataUserWithoutToken);
        // 3. dapatkan data dengan tambahan generete token baru
        const responseUserWithToken = {
            name: user.name,
            email: user.email,
            roleId: user.roleId,
            verified: user.verified,
            active: user.active,
            token: token,
        };
        // 4. update isi value tabel database user yang berisi refreshtoken
        user.accessToken = refreshToken;
        yield user.save();
        // 5. kirim refresh token ke use cookie
        // note: "resfresh" token hanya nama yang menyesuaikan konteks
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // kalkulasi 1 hari dalam milisecond
        });
        return res
            .status(200)
            .send(ResponseData_1.default.ResponseData(200, "OK", null, responseUserWithToken));
    }
    catch (error) {
        return res.status(500).send(ResponseData_1.default.ResponseData(500, "", error, null));
    }
});
exports.UserLogin = UserLogin;
const RefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const refreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken; // req.cookies?."refreshToken" di ambil dari nama
        //  ------------------- jika refresh token tidak ada
        if (!refreshToken) {
            return res
                .status(401)
                .send(ResponseData_1.default.ResponseData(401, "Unauthorized", null, null));
        }
        // refresh token
        const decodedUser = (0, GenerateToken_1.ExtractRefreshToken)(refreshToken);
        //  ------------------- jika refresh token tidak ada
        if (!decodedUser) {
            return res
                .status(201)
                .send(ResponseData_1.default.ResponseData(401, "Unauthorized", null, null));
        }
        const token = (0, GenerateToken_1.GenerateToken)({
            name: decodedUser.name,
            email: decodedUser.email,
            roleId: decodedUser.roleId,
            verified: decodedUser.verified,
            active: decodedUser.active,
        });
        const user = {
            name: decodedUser.name,
            email: decodedUser.email,
            roleId: decodedUser.roleId,
            verified: decodedUser.verified,
            active: decodedUser.active,
            token: token,
        };
        return res.status(200).send(ResponseData_1.default.ResponseData(200, "OK", null, user));
    }
    catch (error) {
        return res.status(500).send(ResponseData_1.default.ResponseData(500, "", error, null));
    }
});
exports.RefreshToken = RefreshToken;
const UserDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ambil email dari res.local (dari file Auth.ts) di middleware
        const email = res.locals.email;
        // cari email apakah ada yang sama dengan di database
        const user = yield User_1.default.findOne({
            where: {
                email: email,
            },
            include: {
                model: Role_1.default,
                attributes: ["id", "roleName"]
            }
        });
        if (!user) {
            return res
                .status(500)
                .send(ResponseData_1.default.ResponseData(404, "Not found", null, null));
        }
        // bisa juga dikosongkan password dan tokennya untuk keamanan
        user.password = "";
        user.accessToken = "";
        return res.status(500).send(ResponseData_1.default.ResponseData(200, "", null, user));
    }
    catch (error) {
        return res.status(500).send(ResponseData_1.default.ResponseData(500, "", error, null));
    }
});
exports.UserDetail = UserDetail;
const UserLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        //
        const email = res.locals.email;
        const refreshToken = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.refreshToken;
        // jika refresh token di cookie tidak ada
        if (!refreshToken) {
            // ya pasti sudah logout
            return res
                .status(200)
                .send(ResponseData_1.default.ResponseData(200, "User Logout", null, null));
        }
        const user = yield User_1.default.findOne({
            where: {
                email: email,
            },
        });
        // jika user tidak ditemukan (bisa karena token nya sudah kadaluarsa)
        if (!user) {
            // maka bisa kita langsung hapus saja cookeis nya
            res.clearCookie("refreshToken");
            return res
                .status(200)
                .send(ResponseData_1.default.ResponseData(200, "User Logout", null, null));
        }
        // jika user ditemukan, maka update personal akses tokennya dibuang di database
        yield User_1.default.update({ accessToken: null }, {
            where: {
                email: email,
            },
        });
        // setelah itu hapus refresh tokennya di cookie
        res.clearCookie("refreshToken");
        return res
            .status(200)
            .send(ResponseData_1.default.ResponseData(200, "User Logout", null, null));
    }
    catch (error) {
        return res.status(500).send(ResponseData_1.default.ResponseData(500, "", error, null));
    }
});
exports.UserLogout = UserLogout;
//# sourceMappingURL=UserController.js.map