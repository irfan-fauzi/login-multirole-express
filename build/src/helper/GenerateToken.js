"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractRefreshToken = exports.ExtractToken = exports.GenerateRefreshToken = exports.GenerateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const GenerateToken = (data) => {
    const token = jsonwebtoken_1.default.sign(data, process.env.JWT_TOKEN, {
        expiresIn: "60m",
    });
    return token;
};
exports.GenerateToken = GenerateToken;
const GenerateRefreshToken = (data) => {
    const token = jsonwebtoken_1.default.sign(data, process.env.JWT_REFRESH_TOKEN, {
        expiresIn: "1d",
    });
    return token;
};
exports.GenerateRefreshToken = GenerateRefreshToken;
const ExtractToken = (token) => {
    const secretKey = process.env.JWT_TOKEN;
    let resData;
    const res = jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
        if (err) {
            resData = null;
        }
        else {
            resData = decoded;
        }
    });
    if (resData) {
        const result = resData;
        return result;
    }
    return null;
};
exports.ExtractToken = ExtractToken;
const ExtractRefreshToken = (token) => {
    const secretKey = process.env.JWT_REFRESH_TOKEN;
    let resData;
    const res = jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
        if (err) {
            resData = null;
        }
        else {
            resData = decoded;
        }
    });
    if (resData) {
        const result = resData;
        return result;
    }
    return null;
};
exports.ExtractRefreshToken = ExtractRefreshToken;
//# sourceMappingURL=GenerateToken.js.map