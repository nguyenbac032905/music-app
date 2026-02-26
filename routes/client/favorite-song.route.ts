
import { Router } from "express";
const router = Router();
import * as controller from "../../controllers/client/favorite-sonng.controller";

router.get("/",controller.index);

export default router;