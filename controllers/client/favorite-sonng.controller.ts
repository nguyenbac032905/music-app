import { Request, Response } from "express";
import FavoriteSong from "../../models/favorite-song.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

export const index = async (req: Request, res: Response): Promise<void> => {
    const favoriteSong = await FavoriteSong.findOne({userId: "nguyenbac", deleted: false});
    const songs = await Song.find({_id: {$in: favoriteSong.songsId}, deleted: false});
    for(const song of songs){
        const infoSinger = await Singer.findOne({_id: song.singerId});
        song["infoSinger"] = infoSinger;
    }
    res.render("client/pages/favorite-songs/index",{
        pageTitle: "Favorite Song",
        songs: songs
    })
}