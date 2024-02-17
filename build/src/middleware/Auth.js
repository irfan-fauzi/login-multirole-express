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
        const authToken = req.headers["authorization"];
        const token = authToken && authToken.split(" ")[1];
        if (token === null) {
            return res
                .status(401)
                .send(ResponseData_1.default.ResponseData(401, "unAuthorized", null, null));
        }
        const result = (0, GenerateToken_1.ExtractToken)(token);
        if (result === null) {
            return res
                .status(401)
                .send(ResponseData_1.default.ResponseData(401, "UnAuthorized time out", null, null));
        }
        next();
    }
    catch (error) {
        return res
            .status(500)
            .send(ResponseData_1.default.ResponseData(500, "auth failed", error, null));
    }
};
exports.Authenticated = Authenticated;
//# sourceMappingURL=Auth.js.map