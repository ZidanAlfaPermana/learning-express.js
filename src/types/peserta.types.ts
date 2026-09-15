import ID from './id.types'

export interface Peserta extends ID {
    nama: string;
    sekolah: string;
    kelas: string;
    jurusan: string;
    fase: number;
}