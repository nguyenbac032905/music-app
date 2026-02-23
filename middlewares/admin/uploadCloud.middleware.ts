import { Request, Response, NextFunction } from "express";
import { uploadToCloudinary } from "../../helpers/uploadCloud";

export const uploadFields = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req["files"];
    if (!files) return next();

    for (const field in files) {
      req.body[field] = [];

      for (const file of files[field]) {
        const isAudio = file.mimetype.startsWith("audio/");
        const url = await uploadToCloudinary(
          file.buffer,
          isAudio ? "video" : "image"
        );
        req.body[field].push(url);
      }
    }

    next();
  } catch (err) {
    next(err);
  }
};
export const uploadSingle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req["file"];
    if (!file) return next();

    const isAudio = file.mimetype.startsWith("audio/");
    const url = await uploadToCloudinary(
      file.buffer,
      isAudio ? "video" : "image"
    );

    req.body[file.fieldname] = url;
    next();
  } catch (err) {
    next(err);
  }
};