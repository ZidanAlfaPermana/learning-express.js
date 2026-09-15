import ID from "./id.types";

export interface Jurnal extends ID {
    idPeserta: number;
    status: "belum" | "selesai" | "proses";
    kegiatan: string;
    hambatan: string;
    rencanaBesok: string;
    linkCommit?: string;
}