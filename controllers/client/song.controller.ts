import { Request,Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";

export const songByTopic = async (req: Request, res: Response): Promise<void> => {
    const slugTopic = req.params.slugTopic;
    const topic = await Topic.findOne({slug: slugTopic});
    const songs = await Song.find({deleted: false, topicId: topic.id});
    for(const song of songs){
        const singer = await Singer.findOne({_id: song.singerId});
        song["infoSinger"] = singer;
    }
    res.render("client/pages/songs/songByTopic",{
        pageTitle: "Bài hát theo chủ đề",
        songs: songs
    })
}
export const songDetail = async (req: Request, res: Response): Promise<void> => {
    const slugSong = req.params.slugSong;
    const song = await Song.findOne({deleted: false, slug: slugSong});

    const singer = await Singer.findOne({_id: song.singerId}).select("fullName");

    const topic = (await Topic.findOne({_id: song.topicId})).isSelected("title");

    res.render("client/pages/songs/detail",{
        pageTitle: song.title,
        song: song,
        singer: singer,
        topic:topic
    })
}
export const like = async (req: Request, res: Response): Promise<void> => {
    const idSong = req.params.idSong;
    const typeLike = req.params.typeLike
    const song = await Song.findOne({
        _id: idSong,
        deleted: false,
        status: "active"
    });
    const newLike =  typeLike == "like" ? song.like + 1: song.like - 1;
    await Song.updateOne({_id: idSong},{$set: {like: newLike}});
    res.json({
        code: 200,
        message: "thanh cong",
        like: newLike
    })
}