import { Request, Response, NextFunction } from "express";
import {AppError, ConflictError, ValidationError} from "../utils/AppError";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const isDev = process.env.NODE_ENV === "development";

    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            sukses: false,
            error: err.message,
            ...(err instanceof ValidationError && { detail: err.detail }),
            ...(isDev && { stack: err.stack })
        });
        return;
    }

    // Error yang kita buat sendiri
    if (err instanceof ValidationError) {
        res.status(err.statusCode).json({
            sukses: false,
            error: err.message,
            detail: err.detail,
        });
        return;
    }

    // Error yang kita buat sendiri
    if (err instanceof ConflictError) {
        res.status(err.statusCode).json({
            sukses: false,
            error: err.message,
            detail: err.stack,
        });
        return;
    }

    console.error("[UNEXPECTED ERROR]", err);

    res.status(500).json({
        sukses: false,
        error: "Terjadi kesalahan di server",
        ...(isDev && {
            detail: err.message,
            stack: err.stack,
        }),
    });
}