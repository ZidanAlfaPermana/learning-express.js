import { Router } from "express";
import { JurnalController } from "./../controllers";
import { validasiJurnal, cekApiKey } from "../middlewares/middleware"

const router = Router();

router.get("/", JurnalController.getSemuaJurnal);
router.get("/:id", JurnalController.getJurnalById);
router.post("/", validasiJurnal, JurnalController.buatJurnal);
router.put("/:id", validasiJurnal, JurnalController.updateJurnal);
router.delete("/:id", cekApiKey, JurnalController.hapusJurnal);

export default router;