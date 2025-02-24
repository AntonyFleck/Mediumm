"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateblog = exports.createbloginput = exports.signin = exports.signup = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signup = zod_1.default.object({
    email: zod_1.default.string().email(),
    name: zod_1.default.string().optional(),
    password: zod_1.default.string().min(7)
});
exports.signin = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(7)
});
exports.createbloginput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    published: zod_1.default.boolean().optional(),
});
exports.updateblog = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    id: zod_1.default.string()
});
