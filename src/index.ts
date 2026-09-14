import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
// SOAL 1
// Setup project Express + TypeScript sesuai panduan di atas
// Pastikan npm run dev berjalan dan auto-restart saat file diubah
const app: Application = express();
const PORT = Number(process.env.PORT_API) || 3000;

type Peserta = {
    id: number;
    nama: string;
    kelas: string;
    jurusan: string;
    sekolah: string;
}

interface PesertaParams {
    id: string;
}

interface PesertaBody {
    id: number;
    nama: string;
    kelas: string;
    jurusan: string;
    sekolah: string;
}

const allPesertas: Peserta[] = [
    {
        id: 1,
        nama: "Zidan Alfa P.",
        kelas: "XII",
        jurusan: "PPLG 3",
        sekolah: "SMKN 5 Malang"
    },
    {
        id: 2,
        nama: "Budiono",
        kelas: "XII",
        jurusan: "PPLG 3",
        sekolah: "SMKN 5 MALANG"
    },
    {
        id: 3,
        nama: "Sirega",
        kelas: "XII",
        jurusan: "PPLG 3",
        sekolah: "SMKN 5 MALANG"
    },
    {
        id: 4,
        nama: "Ahmad Basori",
        kelas: "XII",
        jurusan: "PPLG 3",
        sekolah: "SMKN 5 MALANG"
    }
];

app.use(express.json());

// SOAL 2 — Route dasar
// GET /                → { pesan: "API Magang Batch 4" }
// GET /health          → status, uptime, waktu server
// GET /info            → nama aplikasi, versi, environment (dari .env)
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ pesan: "API Magang Batch 4 berjalan" });
});

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
        status: "ok",
        uptime: Math.floor(process.uptime()),
        waktu: new Date().toISOString(),
    });
});

app.get("/info", (req: Request, res: Response) => {
    res.status(200).json({
        name: process.env.APPLICATION_NAME,
        version: process.env.VERSION,
        app: process.env.APP,
    });
});

// SOAL 3 — Route dengan data statis
// GET /peserta         → array 4 peserta (data hardcode dulu)
// GET /peserta/:id     → satu peserta berdasarkan id
//                        404 jika tidak ditemukan
app.get("/peserta", (req: Request, res: Response) => {
    res.status(200).json({
        data: allPesertas,
    })
})

app.get("/peserta/:id", (req: Request<PesertaParams>, res: Response) => {
    const id = Number(req.params.id);
    const data = allPesertas.find(data => data.id === id)
    if (!data) {
        res.status(404).json({data: null})
    }
    res.status(200).json({ data: data })
})

// SOAL 4 — Typed request
// POST /peserta        → terima body { nama, sekolah }
//                        Beri tipe pada Request menggunakan generic
//                        Return 201 dengan data yang diterima
app.post(
    "/peserta",
    (req: Request<{}, {}, PesertaBody>, res: Response) => {
        allPesertas.push(req.body);
        res.status(201).json({ data: req.body });
    }
);


// SOAL 5 — Bandingkan
// Buka file server-manual.ts dari Minggu 9.
// Tulis di komentar: berapa baris kode yang dihemat oleh Express
// untuk route yang sama?


app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});