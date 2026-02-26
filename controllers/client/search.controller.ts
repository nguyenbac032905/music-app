import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { slugify } from "../../helpers/convertToSlug";

export const index = async (req: Request, res: Response): Promise<void> => {
    const typeSearch = req.params.typeSearch;
    let keyword = req.query.keyword;
    if(typeof keyword !== "string"){
        keyword = "";
    }
    let songs = [];
    if(keyword){
        const titleRegex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),"i");
        const slugRegex = new RegExp(slugify(keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),"i");
        const songKeyword = await Song.find({$or: [
            {title: titleRegex},
            {slug: slugRegex}
        ], deleted: false});
        for(const item of songKeyword){
            const infoSinger = await Singer.findOne({_id: item.singerId});
            songs.push({
                id: item.id,
                title: item.title,
                thumbnail: item.thumbnail,
                like: item.like,
                slug: item.slug,
                infoSinger: infoSinger.fullName
            })
        }
    }
    switch (typeSearch) {
        case "result":
            res.render("client/pages/search/index",{
                pageTitle: keyword||"Tìm kiếm",
                keyword: keyword||"Tìm kiếm",
                songs: songs
            })
            break;
        case "suggest":
            res.json({
                code:200,
                message: "thanh cong",
                songs: songs
            })
            break;
        default:
            res.json({
                code:400,
                message: "thất bại"
            })
            break;
    }
}