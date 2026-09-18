import { Router } from "express";
import { DebugController } from "./../controllers";

const router = Router();

router.get("/not-found", DebugController.getNotFound);
router.get("/validation", DebugController.getValidation);
router.get("/unauthorized", DebugController.getUnathorized);
router.get("/crash", DebugController.getCrashed);

export default router;