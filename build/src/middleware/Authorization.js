"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicUser = exports.AdminRole = exports.ManagerRole = void 0;
const ResponseData_1 = __importDefault(require("../helper/ResponseData"));
const ManagerRole = (req, res, next) => {
    try {
        // di bagian authenticated kita mendefinisikan re.locals.roleId
        // disini kita tangkap sebagai identifikasi roleId
        const roleId = res.locals.roleId;
        // // jika roleId tidak sesuai -> maka forbidden
        if (roleId !== 1) {
            return res
                .status(500)
                .send(ResponseData_1.default.ResponseData(403, "Forbidden", null, null));
        }
        // jika roleId sesuai, maka bisa dilanjut ke middleware selanjutnya
        next();
    }
    catch (error) {
        return res.status(500).send(ResponseData_1.default.ResponseData(500, "", error, null));
    }
};
exports.ManagerRole = ManagerRole;
const AdminRole = (req, res, next) => {
    try {
        const roleId = res.locals.roleId;
        if (roleId !== 2) {
            return res
                .status(500)
                .send(ResponseData_1.default.ResponseData(403, "Forbidden", null, null));
        }
        next();
    }
    catch (error) {
        return res.status(500).send(ResponseData_1.default.ResponseData(500, "", error, null));
    }
};
exports.AdminRole = AdminRole;
const BasicUser = (req, res, next) => {
    try {
        const roleId = res.locals.roleId;
        if (roleId !== 3) {
            return res
                .status(500)
                .send(ResponseData_1.default.ResponseData(403, "Forbidden", null, null));
        }
        next();
    }
    catch (error) {
        return res.status(500).send(ResponseData_1.default.ResponseData(500, "", error, null));
    }
};
exports.BasicUser = BasicUser;
//# sourceMappingURL=Authorization.js.map