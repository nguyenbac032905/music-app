import {Request, Response} from 'express';
import Singer from '../../models/singer.model';
import * as systemConfig from "../../config/system";

export const index = async (req: Request, res: Response): Promise<void> => {
    const singers = await Singer.find({deleted: false});
    res.render("admin/pages/singers/index", {
        pageTitle: "Singers",
        singers: singers
    })
}
export const create = (req: Request, res: Response) => {
    res.render("admin/pages/singers/create",{
        pageTitle: "Create"
    })
}
export const createPost = async (req: Request, res: Response): Promise<void> => {
    const singer = new Singer(req.body);
    await singer.save();
    res.redirect(`${systemConfig.prefixAdmin}/singers/create`);
}