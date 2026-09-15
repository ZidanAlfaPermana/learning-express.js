import { Router } from "express";
import { JurnalController } from "./../controllers";

const router = Router();

router.get("/", JurnalController.getSemuaJurnal);
router.get("/:id", JurnalController.getJurnalById);
router.post("/", JurnalController.buatJurnal);
router.put("/:id", JurnalController.updateJurnal);
router.delete("/:id", JurnalController.hapusJurnal);

export default router;