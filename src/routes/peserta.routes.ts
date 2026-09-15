import { Router } from "express";
import { PesertaController, JurnalController } from "./../controllers";

const router = Router();

router.get("/", PesertaController.getSemuaPeserta);
router.get("/:id", PesertaController.getPesertaById);
router.get("/:id/jurnal", JurnalController.getJurnalPesertaById);
router.post("/", PesertaController.buatPeserta);
router.put("/:id", PesertaController.updatePeserta);
router.delete("/:id", PesertaController.hapusPeserta);

export default router;