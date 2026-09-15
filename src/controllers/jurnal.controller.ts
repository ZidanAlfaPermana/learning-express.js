import { Request, Response } from "express";
import {dataJurnal, dataPeserta} from "../data/dummy";
import {Jurnal} from "../types";

interface JurnalBody {
    idPeserta: number;
    status: "belum" | "selesai" | "proses";
    kegiatan: string;
    hambatan: string;
    rencanaBesok: string;
    linkCommit?: string;
}

const isPesertaValid = (idPeserta: number): boolean => {
    return dataPeserta.find(p => p.id === idPeserta) === undefined;
}

export const getSemuaJurnal = (req: Request, res: Response): void => {
    const { peserta, status, limit } = req.query;
    let hasil = dataJurnal;

    if (peserta) {
        hasil = hasil.filter((j) => j.idPeserta === Number(peserta));
    }

    if (status) {
        hasil = hasil.filter((j) => j.status === status);
    }

    const data: Jurnal[] = hasil.slice(0, Number(limit ?? 20));

    res.json({ total: data.length, data: data });
};

export const getJurnalById = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    const jurnal = dataJurnal.find((p) => p.id === id);

    if (!jurnal) {
        res.status(404).json({ error: `Jurnal dengan id ${id} tidak ditemukan` });
        return;
    }

    res.json(jurnal);
};

export const getJurnalPesertaById = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    const jurnal = dataJurnal.filter((p) => p.idPeserta === id);

    if (!jurnal) {
        res.status(404).json({ error: `Jurnal dengan Peserta id ${id} tidak ditemukan` });
        return;
    }

    res.json(jurnal);
}

export const buatJurnal = (req: Request<{}, {}, JurnalBody>, res: Response): void => {
    const { idPeserta, status, kegiatan, hambatan, rencanaBesok, linkCommit } = req.body;
    const baru = { id: dataJurnal.length + 1, idPeserta, status, kegiatan, hambatan, rencanaBesok, linkCommit };

    if (isPesertaValid(idPeserta)) {
        res.status(404).json({ error: `Peserta dengan id ${idPeserta} tidak ditemukan` });
    }

    dataJurnal.push(baru);
    res.status(201).json(baru);
};

export const updateJurnal = (req: Request<{id: number}, {}, JurnalBody>, res: Response): void => {
    const id = Number(req.params.id);
    const index = dataJurnal.findIndex((p) => p.id === id);

    if (index === -1) {
        res.status(404).json({ error: `Jurnal dengan id ${id} tidak ditemukan` });
    }

    const { idPeserta, status, kegiatan, hambatan, rencanaBesok, linkCommit } = req.body;
    const data = { id: id, idPeserta, status, kegiatan, hambatan, rencanaBesok, linkCommit };

    if (isPesertaValid(idPeserta)) {
        res.status(404).json({ error: `Peserta dengan id ${idPeserta} tidak ditemukan` });
    }

    const updatedJurnal: Jurnal = {
        ...dataJurnal[index],
        ...data,
        id
    };

    dataJurnal[index] = updatedJurnal;
    res.status(200).json({ success: `Jurnal dengan id ${id} berhasil di edit` });
}

export const hapusJurnal = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    const jurnalIndex = dataJurnal.findIndex((p) => p.id === id)

    if (jurnalIndex === -1) {
        res.status(404).json({ error: `Jurnal dengan id ${id} tidak ditemukan` });
    }

    dataJurnal.splice(jurnalIndex, 1);
    res.status(204).json({});
}