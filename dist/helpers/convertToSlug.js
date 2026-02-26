"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = void 0;
const unidecode_1 = __importDefault(require("unidecode"));
const slugify = (str) => {
    return (0, unidecode_1.default)(str).toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
};
exports.slugify = slugify;
