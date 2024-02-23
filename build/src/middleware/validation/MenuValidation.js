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
const MasterMenu_1 = __importDefault(require("../../../models/MasterMenu"));
const CreateMenuValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, icon, ordering } = req.body;
        const _menu = {
            name,
            icon,
            ordering,
        };
        const rules = {
            name: "required|string|max:50",
            icon: "required|string",
            ordering: "required|integer"
        };
        const validate = new validatorjs_1.default(_menu, rules);
        if (validate.fails()) {
            return res
                .status(400)
                .send(ResponseData_1.default.ResponseData(400, "Bad Request", validate.errors, null));
        }
        const menu = yield MasterMenu_1.default.findOne({
            where: {
                name: _menu.name
            }
        });
        if (menu) {
            const errorData = {
                errors: {
                    name: ["name has already used"],
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
const CreateSubMenuValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } = req.body;
        const _menu = {
            name,
            masterMenuId,
            url,
            title,
            icon,
            ordering,
            isTargetSelf,
        };
        const rules = {
            name: "required|string|max:50",
            masterMenuId: "required|integer",
            url: "required|string",
            title: "required|string|max:50",
            icon: "required|string",
            ordering: "required|integer",
            isTargetSelf: "required|boolean"
        };
        const validate = new validatorjs_1.default(_menu, rules);
        if (validate.fails()) {
            return res
                .status(400)
                .send(ResponseData_1.default.ResponseData(400, "Bad Request", validate.errors, null));
        }
        const masterMenu = yield MasterMenu_1.default.findOne({
            where: {
                id: masterMenuId,
                active: true
            }
        });
        if (!masterMenu) {
            const errorData = {
                errors: {
                    masterMenu: ["masterMenuID not valid"],
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
exports.default = { CreateMenuValidation, CreateSubMenuValidation };
//# sourceMappingURL=MenuValidation.js.map