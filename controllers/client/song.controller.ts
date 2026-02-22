import { Request,Response } from "express";

export const songByTopic = async (req: Request, res: Response) => {
    res.render("client/pages/songs/songByTopic",{
        pageTitle: "Bài hát theo chủ đề"
    })
}