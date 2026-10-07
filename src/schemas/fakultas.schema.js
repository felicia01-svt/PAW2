import z from "zod";
//schema validasi

export const storeFakultasSchema = z.object({
    name : z.string().trim().min(3, "Nama Fakultas Wajib 3 Karakter")
})

export const updateFakultasSchema = z.object({
    name : z.string().trim().min(3, "Nama Fakultas Wajib 3 Karakter")
})