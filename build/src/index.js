"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const RolesRoutes_1 = __importDefault(require("./routes/RolesRoutes"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const MasterMenuRoutes_1 = __importDefault(require("./routes/MasterMenuRoutes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:5173"],
}));
// routes
app.get("/", (req, res) => {
    res.status(200).send({
        msg: "🧑 🐱 💟 ",
    });
});
app.use(RolesRoutes_1.default);
app.use(UserRoutes_1.default);
app.use(MasterMenuRoutes_1.default);
app.listen(PORT, () => {
    console.log(`app running in port: ${PORT}`);
});
//# sourceMappingURL=index.js.map