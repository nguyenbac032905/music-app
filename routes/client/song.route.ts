import { Router } from "express";
const router = Router();
import * as controller from "../../controllers/client/song.controller";

router.get("/:slugTopic", controller.songByTopic);

export default router;