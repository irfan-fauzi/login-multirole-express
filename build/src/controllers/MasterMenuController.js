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
exports.DeletePermanentMenu = exports.SoftDeleteMenu = exports.UpdateMenu = exports.GetDetailMenu = exports.GetAllMenu = exports.GetListMenu = exports.CreateMenu = void 0;
const MasterMenu_1 = __importDefault(require("../../models/MasterMenu"));
const ResponseData_1 = __importDefault(require("../helper/ResponseData"));
const CreateMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, icon, ordering } = req.body;
        const masterMenu = yield MasterMenu_1.default.create({
            name,
            icon,
            ordering,
            active: true,
        });
        return res
            .status(201)
            .send(ResponseData_1.default.ResponseData(201, "menu created success 🧮 ", null, masterMenu));
    }
    catch (error) {
        return res.status(500).send(ResponseData_1.default.ResponseData(500, "", error, null));
    }
});
exports.CreateMenu = CreateMenu;
const GetListMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listMenuActive = yield MasterMenu_1.default.findAll({
            where: {
                active: true,
            },
        });
        return res
            .status(200)
            .send(ResponseData_1.default.ResponseData(201, "OK", null, listMenuActive));
    }
    catch (error) {
        return res.status(500).send(ResponseData_1.default.ResponseData(500, "", error, null));
    }
});
exports.GetListMenu = GetListMenu;
const GetAllMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listMenu = yield MasterMenu_1.default.findAll();
        return res.status(200).send(ResponseData_1.default.ResponseData(201, "OK", null, listMenu));
    }
    catch (error) {
        return res.status(500).send(ResponseData_1.default.ResponseData(500, "", error, null));
    }
});
exports.GetAllMenu = GetAllMenu;
const GetDetailMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const detailMenu = yield MasterMenu_1.default.findOne({
            where: {
                id: id,
                active: true,
            },
        });
        if (!detailMenu) {
            return res
                .status(404)
                .send(ResponseData_1.default.ResponseData(404, "not found 😢", null, null));
        }
        return res
            .status(200)
            .send(ResponseData_1.default.ResponseData(201, "OK", null, detailMenu));
    }
    catch (error) {
        return res.status(500).send(ResponseData_1.default.ResponseData(500, "💀", error, null));
    }
});
exports.GetDetailMenu = GetDetailMenu;
const UpdateMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, icon, ordering } = req.body;
        const masterMenu = yield MasterMenu_1.default.findOne({
            where: {
                id: id,
                active: true,
            },
        });
        if (!masterMenu) {
            return res
                .status(404)
                .send(ResponseData_1.default.ResponseData(404, "not found 😢", null, null));
        }
        masterMenu.name = name;
        masterMenu.icon = icon;
        masterMenu.ordering = ordering;
        yield masterMenu.save();
        return res
            .status(200)
            .send(ResponseData_1.default.ResponseData(201, "master Menu updated successfully 💝", null, masterMenu));
    }
    catch (error) {
        return res.status(500).send(ResponseData_1.default.ResponseData(500, "💀", error, null));
    }
});
exports.UpdateMenu = UpdateMenu;
const SoftDeleteMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const masterMenu = yield MasterMenu_1.default.findOne({
            where: {
                id: id,
                active: true,
            },
        });
        if (!masterMenu) {
            return res
                .status(404)
                .send(ResponseData_1.default.ResponseData(404, "not found 😢", null, null));
        }
        masterMenu.active = false;
        yield masterMenu.save();
        return res
            .status(200)
            .send(ResponseData_1.default.ResponseData(201, "removed 🚯", null, masterMenu));
    }
    catch (error) {
        return res.status(500).send(ResponseData_1.default.ResponseData(500, "", error, null));
    }
});
exports.SoftDeleteMenu = SoftDeleteMenu;
const DeletePermanentMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const masterMenu = yield MasterMenu_1.default.findByPk(id);
        if (!masterMenu) {
            return res
                .status(404)
                .send(ResponseData_1.default.ResponseData(404, "not found 😢", null, null));
        }
        yield masterMenu.destroy();
        return res
            .status(201)
            .send(ResponseData_1.default.ResponseData(201, "master menu deleted succesfully 🚯", null, null));
    }
    catch (error) {
        return res.status(500).send(ResponseData_1.default.ResponseData(500, "", error, null));
    }
});
exports.DeletePermanentMenu = DeletePermanentMenu;
//# sourceMappingURL=MasterMenuController.js.map