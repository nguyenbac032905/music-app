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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSingle = exports.uploadFields = void 0;
const uploadCloud_1 = require("../../helpers/uploadCloud");
const uploadFields = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req["files"];
        if (!files)
            return next();
        for (const field in files) {
            req.body[field] = [];
            for (const file of files[field]) {
                const isAudio = file.mimetype.startsWith("audio/");
                const url = yield (0, uploadCloud_1.uploadToCloudinary)(file.buffer, isAudio ? "video" : "image");
                req.body[field].push(url);
            }
        }
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.uploadFields = uploadFields;
const uploadSingle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req["file"];
        if (!file)
            return next();
        const isAudio = file.mimetype.startsWith("audio/");
        const url = yield (0, uploadCloud_1.uploadToCloudinary)(file.buffer, isAudio ? "video" : "image");
        req.body[file.fieldname] = url;
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.uploadSingle = uploadSingle;
