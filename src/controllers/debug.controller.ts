import { Request, Response } from "express";
import {asyncHandler} from "../utils/asyncHandler";
import {AppError, NotFoundError, UnauthorizedError, ValidationError} from "../utils/AppError";

export const getNotFound = asyncHandler(async (req: Request, res: Response) => {
    throw new NotFoundError("Data test tidak ditemukan");
});

export const getValidation = asyncHandler(async (req: Request, res: Response) => {
    throw new ValidationError([
        "Field 'nama' tidak boleh kosong",
        "Field 'email' formatnya salah",
        "Field 'password' minimal 8 karakter"
    ]);
});

export const getUnathorized = asyncHandler(async (req: Request, res: Response) => {
    throw new UnauthorizedError("Kamu tidak memiliki akses token yang valid");
});

export const getCrashed = asyncHandler(async (req: Request, res: Response) => {
    throw new AppError("server crash mendadak!");
});