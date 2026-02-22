import {Router} from "express";
const router = Router();
import * as controller from "../../controllers/client/topic.controller";

router.get("/", controller.index);

export default router;