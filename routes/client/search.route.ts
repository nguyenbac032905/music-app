
import { Router } from "express";
const router = Router();
import * as controller from "../../controllers/client/search.controller";

router.get("/:typeSearch",controller.index);

export default router;