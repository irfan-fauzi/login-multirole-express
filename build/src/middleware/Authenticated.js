"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticated = void 0;
const ResponseData_1 = __importDefault(require("../helper/ResponseData"));
const GenerateToken_1 = require("../helper/GenerateToken");
const Authenticated = (req, res, next) => {
    try {
        // ambil data dari header authorization, setiap request haru ada header authorization yang berisi token
        const authToken = req.headers["authorization"];
        // karena token valuenya "Bearer[spasi]isitoken" maka ambil yang index ke 2 yaitu token tsb
        const token = authToken && authToken.split(" ")[1];
        // jika token kosong maka unauthorized
        if (token === null) {
            return res
                .status(401)
                .send(ResponseData_1.default.ResponseData(401, "unAuthorized", null, null));
        }
        // extrackt token baru menggantikan token lama
        // extract token sudah di atur setiap 20 detik maka akan ganti dengan token baru
        const result = (0, GenerateToken_1.ExtractToken)(token);
        // jika null artinya token sudah kadaluarsa
        if (result === null) {
            // maka waktu akses habis
            return res
                .status(401)
                .send(ResponseData_1.default.ResponseData(401, "UnAuthorized", null, null));
        }
        //  NOTE -------kirim data email user yang sudah di ekstraxt setelah login ke variable res.local
        // NOTE ------ yang selanjutnya bisa di akses di controller / middleware selanjutnya
        res.locals.email = result === null || result === void 0 ? void 0 : result.email;
        res.locals.roleId = result === null || result === void 0 ? void 0 : result.roleId;
        // jika token berhasil diperbarui maka akan lanjut menjalankan controller di user Controller
        next();
    }
    catch (error) {
        return res
            .status(500)
            .send(ResponseData_1.default.ResponseData(500, "auth failed", error, null));
    }
};
exports.Authenticated = Authenticated;
//# sourceMappingURL=Authenticated.js.map