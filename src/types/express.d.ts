import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            waktuMulai?: number;
            user?: { id: number; nama: string };
            requestId?: string;
        }
    }
}

export {};