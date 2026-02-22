import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import * as systemConfig from "../../config/system";

export const index = async (req: Request, res: Response): Promise<void> => {
    const topics = await Topic.find({deleted: false});
    res.render("admin/pages/topics/index",{
        pageTitle: "Topics",
        topics: topics
    })
}
export const create = async (req: Request, res: Response): Promise<void> => {
    res.render("admin/pages/topics/create",{
        pageTitle: "Create Topic"
    })
}
export const createPost = async (req: Request, res: Response): Promise<void> => {
    const topic = new Topic(req.body);
    await topic.save();
    res.redirect(`${systemConfig.prefixAdmin}/topics/create`);
}