import { Router } from "express";
const router = Router();
import * as controller from "../../controllers/client/song.controller";

router.get("/", controller.index);
router.get("/:slugTopic", controller.songByTopic);
router.get("/detail/:slugSong", controller.songDetail);
router.patch("/like/:typeLike/:idSong", controller.like);
router.patch("/heart/:typeHert/:idSong", controller.hert);
router.patch("/listen/:idSong", controller.listen);

export default router;