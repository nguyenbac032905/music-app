"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});
const uploadToCloudinary = (buffer, resourceType = "image") => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.v2.uploader.upload_stream({
            folder: "music-app",
            resource_type: resourceType,
        }, (error, result) => {
            if (error)
                return reject(error);
            resolve(result.secure_url);
        });
        streamifier_1.default.createReadStream(buffer).pipe(stream);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
