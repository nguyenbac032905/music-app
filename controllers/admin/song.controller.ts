import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import Song from "../../models/song.model";
import * as systemConfig from "../../config/system";

export const index = async (req: Request, res: Response): Promise<void> => {
    const songs = await Song.find({deleted: false});
    res.render("admin/pages/songs/index",{
        pageTitle: "List",
        songs: songs
    })
}
export const create = async (req: Request, res: Response): Promise<void> => {
    const topics = await Topic.find({deleted: false,status: "active"}).select("title");
    const singers = await Singer.find({deleted: false, status: "active"}).select("fullName");
    res.render("admin/pages/songs/create",{
        pageTitle: "Create",
        topics: topics,
        singers: singers
    })
}
export const createPost = async (req: Request, res: Response): Promise<void> => {
    if(req.body.thumbnail){
        req.body.thumbnail = req.body.thumbnail[0];
    }
    if(req.body.audio){
        req.body.audio = req.body.audio[0];
    }
    const song = new Song(req.body);
    song.save();
    res.redirect(`${systemConfig.prefixAdmin}/songs`);
}
export const edit = async (req: Request, res: Response): Promise<void> => {
    const idSong = req.params.idSong;
    const song = await Song.findOne({_id: idSong, deleted: false});
    const topics = await Topic.find({deleted: false}).select("title");
    const singers = await Singer.find({deleted: false}).select("fullName");
    res.render("admin/pages/songs/edit",{
        pageTitle: "Edit",
        song: song,
        topics: topics,
        singers: singers
    })
}
export const editPatch = async (req: Request, res: Response): Promise<void> => {
    const idSong = req.params.idSong;
    if(req.body.thumbnail){
        req.body.thumbnail = req.body.thumbnail[0];
    }
    if(req.body.audio){
        req.body.audio = req.body.audio[0];
    }
    console.log(req.body)
    await Song.updateOne({_id: idSong},req.body);
    res.redirect(`${systemConfig.prefixAdmin}/songs`);
}