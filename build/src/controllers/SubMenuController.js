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
exports.DeletePermanentSubMenu = exports.SoftDeleteSubMenu = exports.UpdateSubMenu = exports.GetDetailSubMenu = exports.GetListSubMenu = exports.GetAllSubMenu = exports.CreateSubMenu = void 0;
const ResponseData_1 = __importDefault(require("../helper/ResponseData"));
const SubMenu_1 = __importDefault(require("../../models/SubMenu"));
// CREATE 
const CreateSubMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } = req.body;
        const subMenu = yield SubMenu_1.default.create({
            name: name,
            masterMenuId: masterMenuId,
            url: url,
            title: title,
            icon: icon,
            ordering: ordering,
            isTargetSelf: isTargetSelf,
            active: true
        });
        return res.status(201).send(ResponseData_1.default.ResponseData(201, "menu created success 🧮", null, subMenu));
    }
    catch (error) {
        return res.status(500).send(ResponseData_1.default.ResponseData(500, "", error, null));
    }
});
exports.CreateSubMenu = CreateSubMenu;
// GET ALL 
const GetAllSubMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menu = yield SubMenu_1.default.findAll();
        return res.status(201).send(ResponseData_1.default.ResponseData(201, "OK", null, menu));
    }
    catch (error) {
        return res.status(500).send(ResponseData_1.default.ResponseData(500, "", error, null));
    }
});
exports.GetAllSubMenu = GetAllSubMenu;
// GET ALL ONLY ACTIVE
const GetListSubMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menu = yield SubMenu_1.default.findAll({
            where: {
                active: true
            }
        });
        return res.status(201).send(ResponseData_1.default.ResponseData(201, "OK", null, menu));
    }
    catch (error) {
        return res.status(500).send(ResponseData_1.default.ResponseData(500, "", error, null));
    }
});
exports.GetListSubMenu = GetListSubMenu;
// GET DETAILS ONE
const GetDetailSubMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const detailMenu = yield SubMenu_1.default.findOne({
            where: {
                id: id,
                active: true,
            },
        });
        if (!detailMenu) {
            return res.status(404).send(ResponseData_1.default.ResponseData(404, "not found 😢", null, null));
        }
        return res.status(200).send(ResponseData_1.default.ResponseData(201, "OK", null, detailMenu));
    }
    catch (error) {
        return res.status(500).send(ResponseData_1.default.ResponseData(500, "", error, null));
    }
});
exports.GetDetailSubMenu = GetDetailSubMenu;
// UPDATE
const UpdateSubMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } = req.body;
        const subMenu = yield SubMenu_1.default.findOne({
            where: {
                id: id,
                active: true,
            },
        });
        if (!subMenu) {
            return res.status(404).send(ResponseData_1.default.ResponseData(404, "not found 😢", null, null));
        }
        subMenu.name = name;
        subMenu.masterMenuId = masterMenuId;
        subMenu.url = url;
        subMenu.title = title;
        subMenu.icon = icon;
        subMenu.ordering = ordering;
        subMenu.isTargetSelf = isTargetSelf;
        yield subMenu.save();
        return res.status(200).send(ResponseData_1.default.ResponseData(201, "OK updated", null, subMenu));
    }
    catch (error) {
        return res.status(500).send(ResponseData_1.default.ResponseData(500, "", error, null));
    }
});
exports.UpdateSubMenu = UpdateSubMenu;
// SOFT DELETE
const SoftDeleteSubMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const subMenu = yield SubMenu_1.default.findOne({
            where: {
                id: id,
                active: true,
            },
        });
        if (!subMenu) {
            return res.status(404).send(ResponseData_1.default.ResponseData(404, "not found 😢", null, null));
        }
        subMenu.active = false;
        yield subMenu.save();
        return res.status(200).send(ResponseData_1.default.ResponseData(201, "OK removed 🚯", null, null));
    }
    catch (error) {
        return res.status(500).send(ResponseData_1.default.ResponseData(500, "", error, null));
    }
});
exports.SoftDeleteSubMenu = SoftDeleteSubMenu;
// HARD DELETE
const DeletePermanentSubMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const subMenu = yield SubMenu_1.default.findOne({
            where: {
                id: id,
                active: true,
            },
        });
        if (!subMenu) {
            return res.status(404).send(ResponseData_1.default.ResponseData(404, "not found 😢", null, null));
        }
        yield subMenu.destroy();
        return res.status(200).send(ResponseData_1.default.ResponseData(201, "OK removed 🚯 permanant", null, null));
    }
    catch (error) {
        return res.status(500).send(ResponseData_1.default.ResponseData(500, "", error, null));
    }
});
exports.DeletePermanentSubMenu = DeletePermanentSubMenu;
//# sourceMappingURL=SubMenuController.js.map