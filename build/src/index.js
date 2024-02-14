"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT;
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:5173"],
}));
const sessionConfig = {
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: "auto", // secure: true = http || secure: false = https
    },
};
app.use((0, express_session_1.default)(sessionConfig));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.status(200).send({
        msg: "🧑 🐱 💟 ",
    });
});
app.listen(PORT, () => {
    console.log(`app running in port: ${PORT}`);
});
//# sourceMappingURL=index.js.map