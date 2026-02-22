import {Router} from 'express';
const router = Router();
import * as controller from "../../controllers/admin/singer.controller";

router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create", controller.createPost);

export default router;