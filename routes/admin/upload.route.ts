import {Router} from "express";
const router = Router();
import * as controller from "../../controllers/admin/upload.controller";
import multer from "multer";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";
const upload = multer();
router.post("/",upload.single("file"),uploadCloud.uploadSingle, controller.index);
export default router;