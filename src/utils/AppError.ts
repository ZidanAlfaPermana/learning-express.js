// SOAL 1 — Custom Error Classes
// Buat AppError, NotFoundError, ValidationError, UnauthorizedError, ConflictError
// Letakkan di src/utils/AppError.ts
// src/utils/AppError.ts
export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(pesan: string, statusCode: number = 500) {
        super(pesan);
        this.statusCode = statusCode;
        this.isOperational = true;   // error yang kita buat sendiri, bukan bug

        Error.captureStackTrace(this, this.constructor);
    }
}

// Error spesifik — lebih mudah dibaca di controller
export class NotFoundError extends AppError {
    constructor(resource: string = "Data") {
        super(`${resource} tidak ditemukan`, 404);
    }
}

export class ValidationError extends AppError {
    public readonly detail: string[];

    constructor(detail: string[]) {
        super("Validasi gagal", 400);
        this.detail = detail;
    }
}

export class UnauthorizedError extends AppError {
    constructor(pesan: string = "Tidak memiliki akses") {
        super(pesan, 401);
    }
}

export class ConflictError extends AppError {
    constructor(pesan: string) {
        super(pesan, 409);
    }
}

// SOAL 2 — Error Handler
// Buat errorHandler yang:
// - Menangani AppError dan turunannya dengan status code yang sesuai
// - Menangani ValidationError dengan menyertakan array detail
// - Menangani error tak terduga dengan 500
// - Menampilkan stack trace HANYA saat NODE_ENV=development


// SOAL 3 — Not Found Handler
// Buat notFoundHandler untuk route yang tidak terdaftar
// Pesan harus menyebutkan method dan URL yang diminta

// SOAL 4 — Async Handler
// Buat asyncHandler wrapper
// Ubah SEMUA controller agar menggunakan asyncHandler
// Hapus semua try/catch dari controller

// SOAL 5 — Test error handling
// Buat endpoint khusus untuk test:
// GET /api/test/not-found     → throw NotFoundError
// GET /api/test/validation    → throw ValidationError dengan 3 detail
// GET /api/test/unauthorized  → throw UnauthorizedError
// GET /api/test/crash         → throw Error biasa (test unexpected error)
// Pastikan semua menghasilkan response dengan format konsisten