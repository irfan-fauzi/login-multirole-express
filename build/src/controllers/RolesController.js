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
exports.deleteRole = exports.updateRole = exports.createRole = exports.getRoleById = exports.getAllRoles = void 0;
const Role_1 = __importDefault(require("../../models/Role"));
// get All Roles
const getAllRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 
        const thisUserEmail = res.locals.email;
        const response = yield Role_1.default.findAll();
        return res.status(200).send({
            thisUser: thisUserEmail,
            status: 200,
            message: "👍 OKE",
            data: response,
        });
    }
    catch (error) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: `😢 error because: ${error.message}`,
                errors: error,
            });
        }
        return res.status(500).send({
            status: 500,
            message: `🖥 internal server error`,
            errors: error,
        });
    }
});
exports.getAllRoles = getAllRoles;
// get Role By Id
const getRoleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const role = yield Role_1.default.findByPk(id);
        if (!role) {
            return res.status(404).send({
                status: 404,
                message: "😢 Data not found",
                data: null,
            });
        }
        return res.status(200).send({
            status: 200,
            message: "🧮 data founded",
            data: role,
        });
    }
    catch (error) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: `😢 error because: ${error.message}`,
                errors: error,
            });
        }
        return res.status(500).send({
            status: 500,
            message: `🖥 internal server error`,
            errors: error,
        });
    }
});
exports.getRoleById = getRoleById;
// create new Role
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roleName, active } = req.body;
        const newRole = yield Role_1.default.create({ roleName, active });
        return res.status(201).send({
            status: 201,
            message: "💟 created",
            data: newRole,
        });
    }
    catch (error) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: `😢 error because: ${error.message}`,
                errors: error,
            });
        }
        return res.status(500).send({
            status: 500,
            message: `🖥 internal server error`,
            errors: error,
        });
    }
});
exports.createRole = createRole;
// Update Role
const updateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { roleName, active } = req.body;
        const role = yield Role_1.default.findByPk(id);
        if (!role) {
            return res.status(404).send({
                status: 404,
                message: "😢 Data not found",
                data: null,
            });
        }
        role.roleName = roleName;
        role.active = active;
        yield role.save();
        return res.status(200).send({
            status: 200,
            message: "🎉 role succesfully updated",
            data: role,
        });
    }
    catch (error) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: `😢 error because: ${error.message}`,
                errors: error,
            });
        }
        return res.status(500).send({
            status: 500,
            message: `🖥 internal server error`,
            errors: error,
        });
    }
});
exports.updateRole = updateRole;
// Delete Role
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const role = yield Role_1.default.findByPk(id);
        if (!role) {
            return res.status(404).send({
                status: 404,
                message: "😢 Data not found",
                data: null,
            });
        }
        yield Role_1.default.destroy({
            where: {
                id: id,
            },
        });
        res.status(200).send({
            status: 200,
            message: "user was deleted 🖐🚯",
            data: null,
        });
    }
    catch (error) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: `😢 error because: ${error.message}`,
                errors: error,
            });
        }
        return res.status(500).send({
            status: 500,
            message: `🖥 internal server error`,
            errors: error,
        });
    }
});
exports.deleteRole = deleteRole;
//# sourceMappingURL=RolesController.js.map