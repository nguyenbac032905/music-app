import { Request,Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-song.model";

export const index = async (req: Request, res: Response): Promise<void> => {
    const songs = await Song.find({deleted: false});
    for(const song of songs){
        const infoSinger = await Singer.findOne({_id: song.singerId});
        song["infoSinger"] = infoSinger;
    }
    res.render("client/pages/songs/index",{
        pageTitle: "Favorite Song",
        songs: songs
    })
}
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
    const favoriteSong = await FavoriteSong.findOne({deleted: false, userId: "nguyenbac"});

    const song = await Song.findOne({deleted: false, slug: slugSong});

    if(favoriteSong){
        for(const item of favoriteSong["songsId"]){
            if(item == song.id){
                song["favorited"] = true;
            }
        }
    }

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
export const hert = async (req: Request, res: Response): Promise<void> => {
    const idSong = req.params.idSong;
    const typeHert = req.params.typeHert;
    const song = await Song.findOne({
        _id: idSong,
        deleted: false,
        status: "active"
    });
    const existUserFavorite = await FavoriteSong.findOne({userId: "nguyenbac"});
    switch (typeHert) {
        case "heart":
            if(!existUserFavorite){
                const record = new FavoriteSong({
                    userId: "nguyenbac",
                    songsId: [idSong]
                })
                await record.save();
                res.json({
                    code: 200,
                    message: "thành công"
                })
            }else{
                await FavoriteSong.updateOne({_id: existUserFavorite.id},{$push: {songsId: idSong}})
                res.json({
                    code: 200,
                    message: "thành công"
                })
            }
            break;
        case "un-heart":
            if(!existUserFavorite){
                 res.json({
                    code: 400,
                    message: "chưa tồn tại"
                })
            }else{
                await FavoriteSong.updateOne({_id: existUserFavorite.id},{$pull: {songsId: idSong}})
                res.json({
                    code: 200,
                    message: "xóa thành công"
                })
            }
            break;
        default:
            res.json({
                code: 400,
                message: "chưa tồn tại"
            })
            break;
    }
}
export const listen = async (req: Request, res: Response): Promise<void> => {
    const idSong = req.params.idSong;
    const song = await Song.findOne({
        _id: idSong,
        deleted: false,
        status: "active"
    });
    const newListen = song.listen+1;
    await Song.updateOne({_id: idSong},{$set: {listen: newListen}});
    res.json({
        code:200,
        message: "thanh cong",
        listen: newListen
    })
}