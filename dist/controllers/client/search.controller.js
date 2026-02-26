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
exports.index = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const convertToSlug_1 = require("../../helpers/convertToSlug");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const typeSearch = req.params.typeSearch;
    let keyword = req.query.keyword;
    if (typeof keyword !== "string") {
        keyword = "";
    }
    let songs = [];
    if (keyword) {
        const titleRegex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
        const slugRegex = new RegExp((0, convertToSlug_1.slugify)(keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), "i");
        const songKeyword = yield song_model_1.default.find({ $or: [
                { title: titleRegex },
                { slug: slugRegex }
            ], deleted: false });
        for (const item of songKeyword) {
            const infoSinger = yield singer_model_1.default.findOne({ _id: item.singerId });
            songs.push({
                id: item.id,
                title: item.title,
                thumbnail: item.thumbnail,
                like: item.like,
                slug: item.slug,
                infoSinger: infoSinger.fullName
            });
        }
    }
    switch (typeSearch) {
        case "result":
            res.render("client/pages/search/index", {
                pageTitle: keyword || "Tìm kiếm",
                keyword: keyword || "Tìm kiếm",
                songs: songs
            });
            break;
        case "suggest":
            res.json({
                code: 200,
                message: "thanh cong",
                songs: songs
            });
            break;
        default:
            res.json({
                code: 400,
                message: "thất bại"
            });
            break;
    }
});
exports.index = index;
