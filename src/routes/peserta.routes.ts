import { Router } from "express";
import { PesertaController, JurnalController } from "./../controllers";
import { validasiPeserta, cekApiKey } from "../middlewares/middleware"

const router = Router();

router.get("/", PesertaController.getSemuaPeserta);
router.get("/:id", PesertaController.getPesertaById);
router.get("/:id/jurnal", JurnalController.getJurnalPesertaById);
router.post("/", validasiPeserta, PesertaController.buatPeserta);
router.put("/:id", validasiPeserta, PesertaController.updatePeserta);
router.delete("/:id", cekApiKey, PesertaController.hapusPeserta);

export default router;