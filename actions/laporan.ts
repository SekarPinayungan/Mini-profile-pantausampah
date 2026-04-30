"use server";

import { supabase } from "@/lib/supabase";

export async function tambahLaporan(formData: FormData) {
  const { error } = await supabase.from("laporan").insert([
    {
      kategori: formData.get("kategori"),
      deskripsi: formData.get("deskripsi"),
      lokasi: formData.get("lokasi"),
      nama: formData.get("nama"),
      kontak: formData.get("kontak"),
      status: "belum ditanggapi",
    },
  ]);

  if (error) {
    console.error(error);
    throw new Error("Gagal kirim laporan");
  }
}