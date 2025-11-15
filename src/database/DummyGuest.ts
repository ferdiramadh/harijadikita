export interface Guest {
  nomor: number;
  nama: string;
  hp: string;
  pesan: string;
  tanggal: string;
  status: string;
  tautan: string;
}

export const guests: Guest[] = Array.from({ length: 50 }, (_, i) => ({
  nomor: i + 1,
  nama: `Tamu ${i + 1}`,
  hp: `0812-3456-7${(i + 10).toString().padStart(2, "0")}`,
  pesan: `Halo Tamu ${i + 1}, ini pesan otomatis.`,
  tanggal: `2025-11-${String((i % 30) + 1).padStart(2, "0")}`,
  status: i % 2 === 0 ? "Terkirim" : "Belum terkirim",
  tautan: `https://wa.me/6281234567${(i + 10).toString().padStart(2, "0")}`,
}));
