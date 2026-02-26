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
exports.listen = exports.hert = exports.like = exports.songDetail = exports.songByTopic = exports.index = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const favorite_song_model_1 = __importDefault(require("../../models/favorite-song.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield song_model_1.default.find({ deleted: false });
    for (const song of songs) {
        const infoSinger = yield singer_model_1.default.findOne({ _id: song.singerId });
        song["infoSinger"] = infoSinger;
    }
    res.render("client/pages/songs/index", {
        pageTitle: "Favorite Song",
        songs: songs
    });
});
exports.index = index;
const songByTopic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugTopic = req.params.slugTopic;
    const topic = yield topic_model_1.default.findOne({ slug: slugTopic });
    const songs = yield song_model_1.default.find({ deleted: false, topicId: topic.id });
    for (const song of songs) {
        const singer = yield singer_model_1.default.findOne({ _id: song.singerId });
        song["infoSinger"] = singer;
    }
    res.render("client/pages/songs/songByTopic", {
        pageTitle: "Bài hát theo chủ đề",
        songs: songs
    });
});
exports.songByTopic = songByTopic;
const songDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugSong = req.params.slugSong;
    const favoriteSong = yield favorite_song_model_1.default.findOne({ deleted: false, userId: "nguyenbac" });
    const song = yield song_model_1.default.findOne({ deleted: false, slug: slugSong });
    if (favoriteSong) {
        for (const item of favoriteSong["songsId"]) {
            if (item == song.id) {
                song["favorited"] = true;
            }
        }
    }
    const singer = yield singer_model_1.default.findOne({ _id: song.singerId }).select("fullName");
    const topic = (yield topic_model_1.default.findOne({ _id: song.topicId })).isSelected("title");
    res.render("client/pages/songs/detail", {
        pageTitle: song.title,
        song: song,
        singer: singer,
        topic: topic
    });
});
exports.songDetail = songDetail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeLike = req.params.typeLike;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
        deleted: false,
        status: "active"
    });
    const newLike = typeLike == "like" ? song.like + 1 : song.like - 1;
    yield song_model_1.default.updateOne({ _id: idSong }, { $set: { like: newLike } });
    res.json({
        code: 200,
        message: "thanh cong",
        like: newLike
    });
});
exports.like = like;
const hert = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeHert = req.params.typeHert;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
        deleted: false,
        status: "active"
    });
    const existUserFavorite = yield favorite_song_model_1.default.findOne({ userId: "nguyenbac" });
    switch (typeHert) {
        case "heart":
            if (!existUserFavorite) {
                const record = new favorite_song_model_1.default({
                    userId: "nguyenbac",
                    songsId: [idSong]
                });
                yield record.save();
                res.json({
                    code: 200,
                    message: "thành công"
                });
            }
            else {
                yield favorite_song_model_1.default.updateOne({ _id: existUserFavorite.id }, { $push: { songsId: idSong } });
                res.json({
                    code: 200,
                    message: "thành công"
                });
            }
            break;
        case "un-heart":
            if (!existUserFavorite) {
                res.json({
                    code: 400,
                    message: "chưa tồn tại"
                });
            }
            else {
                yield favorite_song_model_1.default.updateOne({ _id: existUserFavorite.id }, { $pull: { songsId: idSong } });
                res.json({
                    code: 200,
                    message: "xóa thành công"
                });
            }
            break;
        default:
            res.json({
                code: 400,
                message: "chưa tồn tại"
            });
            break;
    }
});
exports.hert = hert;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
        deleted: false,
        status: "active"
    });
    const newListen = song.listen + 1;
    yield song_model_1.default.updateOne({ _id: idSong }, { $set: { listen: newListen } });
    res.json({
        code: 200,
        message: "thanh cong",
        listen: newListen
    });
});
exports.listen = listen;
