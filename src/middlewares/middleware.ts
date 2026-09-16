import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
// SOAL 1 — Request Logger
// Buat middleware requestLogger yang mencatat:
// [waktu] METHOD /url STATUS - durasi ms
// Pasang secara global
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
    const mulai = Date.now();
    res.on("finish", () => {
        const durasi = Date.now() - mulai;
        const waktu = new Date().toISOString();
        console.log(
            `[${waktu}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${durasi}ms`
        );
    });

    next();
}

// SOAL 2 — Validasi
// Buat middleware validasiPeserta: nama min 3 karakter, sekolah wajib
// Buat middleware validasiJurnal: kegiatan min 10 karakter, pesertaId harus angka
// Pasang di route POST dan PUT masing-masing resource
export function validasiPeserta(req: Request, res: Response, next: NextFunction): void {
    const { nama, sekolah, kelas, jurusan, fase } = req.body;
    const errors: string[] = [];

    if (!nama || typeof nama !== "string" || nama.trim().length < 3) {
        errors.push("Nama wajib diisi, minimal 3 karakter");
    }
    if (!kelas || typeof kelas !== "string" || nama.trim().length < 3) {
        errors.push("Kelas wajib diisi, minimal 3 karakter");
    }
    if (!jurusan || typeof jurusan !== "string" || nama.trim().length < 3) {
        errors.push("Jurusan wajib diisi, minimal 3 karakter");
    }

    if (!sekolah || typeof sekolah !== "string") {
        errors.push("Sekolah wajib diisi");
    }

    if (!fase || typeof fase !== "number" || (fase < 1 || fase > 5)) {
        errors.push("Fase wajib diisi, dan fase hanya ada fase 1 sampai 5");
    }

    if (errors.length > 0) {
        res.status(400).json({error: "Validasi gagal", detail: errors});
        return;
    }

    next();
}

export function validasiJurnal(req: Request, res: Response, next: NextFunction): void {
    const { idPeserta, status, kegiatan, hambatan, rencanaBesok, linkCommit } = req.body;
    const errors: string[] = [];

    if (hambatan && typeof hambatan !== "string") {
        errors.push("Hambatan harus berupa teks");
    }

    if (!idPeserta || typeof idPeserta !== "number") {
        errors.push("id peserta wajib diisi");
    }

    if (!status || !["selesai", "proses", "belum"].includes(status)) {
        errors.push("Status wajib diisi, dengan memilih selesai, proses, atau belum");
    }

    if (!kegiatan || typeof kegiatan !== "string" || kegiatan.length < 10) {
        errors.push("Kegiatan wajib diisi, minimal 10 kata");
    }

    if (!rencanaBesok || typeof rencanaBesok !== "string" || kegiatan.length < 10) {
        errors.push("Rencana besok wajib diisi, minimal 10 kata");
    }

    if (typeof linkCommit !== "string" && URL.canParse(linkCommit)) {
        errors.push("link commit wajib diisi, dan link commit harus valid dengan diawali https://github.com");
    }

    if (errors.length > 0) {
        res.status(400).json({error: "Validasi gagal", detail: errors});
        return;
    }

    next();
}

// SOAL 3 — API Key Guard
// Buat middleware cekApiKey yang membaca header x-api-key
// Pasang hanya untuk method DELETE (semua resource)
// API key dibaca dari .env
export function cekApiKey(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
        res.status(401).json({ error: "API key tidak ditemukan" });
        return;
    }

    if (apiKey !== process.env.API_KEY) {
        res.status(403).json({ error: "API key tidak valid" });
        return;
    }

    next();
}

// SOAL 4 — Rate limiter sederhana
// Buat middleware rateLimiter yang membatasi maksimal 10 request
// per menit per IP. Simpan hitungan di Map<string, number> di memori.
// Return 429 Too Many Requests jika terlampaui.
const requestList = new Map<string, number>();

setInterval(() => {
    requestList.clear();
}, 60 * 1000);

export function appThrottle(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';

    const currentCount = requestList.get(ip) || 0;

    if (currentCount >= 5) {
        return res.status(429).json({
            error: 'Too Many Requests',
            message: 'Maksimal 5 request per menit. Silakan coba lagi nanti.'
        });
    }
    requestList.set(ip, currentCount + 1);
    next();
}

// SOAL 5 — Extend Request
// Buat file src/types/express.d.ts
// Tambahkan property requestId (string) ke Request
// Buat middleware yang mengisi requestId dengan angka acak
// Tampilkan requestId di setiap response
export function assignRequestId(req: Request, res: Response, next: NextFunction) {
    const randomId = crypto.randomUUID();
    req.requestId = randomId;
    res.setHeader("X-Request-Id", req.requestId);
    next();
}