"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbname = process.env.DATABASE_NAME;
const dbUsername = process.env.DATABASE_USERNAME;
const dbPassword = process.env.DATABASE_PASSWORD;
const dbHost = process.env.DATABASE_HOSTING;
const dbConnect = new sequelize_1.Sequelize(dbname, dbUsername, dbPassword, {
    host: dbHost,
    dialect: "mysql",
});
exports.default = dbConnect;
//# sourceMappingURL=dbConnect.js.map