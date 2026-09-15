import { Request, Response } from "express";
import {dataPeserta} from "../data/dummy";
import {Peserta} from "../types";

interface PesertaBody {
    id: number;
    nama: string;
    kelas: string;
    jurusan: string;
    sekolah: string;
    fase: number;
}

export const getSemuaPeserta = (req: Request, res: Response): void => {
    const { sekolah, fase, limit } = req.query;
    let hasil = dataPeserta;

    if (sekolah) {
        hasil = hasil.filter((p) => p.sekolah === sekolah);
    }

    if (fase) {
        hasil = hasil.filter((p) => p.fase === Number(fase));
    }

    const data: Peserta[] = hasil.slice(0, Number(limit ?? 20));

    res.json({ total: data.length, data: data });
};

export const getPesertaById = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    const peserta = dataPeserta.find((p) => p.id === id);

    if (!peserta) {
        res.status(404).json({ error: `Peserta dengan id ${id} tidak ditemukan` });
        return;
    }

    res.json(peserta);
};

export const buatPeserta = (req: Request<{}, {}, PesertaBody>, res: Response): void => {
    const { nama, sekolah, kelas, jurusan, fase } = req.body;
    const baru = { id: dataPeserta.length + 1, nama, sekolah, kelas, jurusan, fase };
    dataPeserta.push(baru);
    res.status(201).json(baru);
};

export const updatePeserta = (req: Request<{id: number}, {}, PesertaBody>, res: Response): void => {
    const id = Number(req.params.id);
    const index = dataPeserta.findIndex((p) => p.id === id);

    if (index === -1) {
        res.status(404).json({ error: `Peserta dengan id ${id} tidak ditemukan` });
    }

    const { nama, sekolah, kelas, jurusan } = req.body;
    const data = { id: id, nama, sekolah, kelas, jurusan };

    const updatedJurnal: Peserta = {
        ...dataPeserta[index],
        ...data,
        id
    };

    dataPeserta[index] = updatedJurnal;
    res.status(200).json({ success: `Peserta dengan id ${id} berhasil di edit` });
}

export const hapusPeserta = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    const pesertaIndex = dataPeserta.findIndex((p) => p.id === id)

    if (pesertaIndex === -1) {
        res.status(404).json({ error: `Peserta dengan id ${id} tidak ditemukan` });
    }

    dataPeserta.splice(pesertaIndex, 1);
    res.status(204).json({});
}