import type { Request, Response } from "express";
import expService, { type Iwork } from "./exp.services.js";
import z, { ZodError } from "zod";

class exp {
    static async index(req: Request, res: Response) {
        try {
            const data = await expService.index();
            if (data.length === 0) {
                return res.status(404).json({ pesan: "data kosong" });
            }
            res.status(200).json({ success: true, data });
        } catch (error: unknown) {
            error instanceof Error
                ? res.status(400).json({ pesan: error.message })
                : res.status(400).json({ pesan: "unexpected error" });
        }
    }

    static async show(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(404).json({ pesan: "id invalid" });
            }

            const data = await expService.show(id);
            if (!data) {
                return res.status(404).json({ pesan: "data kosong" });
            }
            res.status(200).json({ success: true, data });
        } catch (error: unknown) {
            error instanceof Error
                ? res.status(400).json({ pesan: error.message })
                : res.status(400).json({ pesan: "unexpected error" });
        }
    }

    static async add(req: Request, res: Response) {
        try {
            const validasi = z.object({
                jabatan: z.string().min(1),
                perushaan: z.string().min(1),
                tahun_mulai: z.string().min(1),
                tahun_selesai: z.string().min(1)
            });
            const input = validasi.parse(req.body) as Iwork

            const data = await expService.add(input)
            res.status(200).json({ success: true, data });
        } catch (error: unknown) {
            error instanceof ZodError
                ? res.status(400).json({ pesan: error.issues })
                : res.status(400).json({ pesan: "unexpected error" });
        }
    }
    static async update(req: Request, res: Response) {
        try {
            const validasi = z.object({
                jabatan: z.string().min(1).optional(),
                perushaan: z.string().min(1).optional(),
                tahun_mulai: z.string().min(1).optional(),
                tahun_selesai: z.string().min(1).optional(),
                aktif: z.boolean().optional(),
            });
            const input = validasi.parse(req.body) as Iwork
            const id = Number(req.params.id)
            if (isNaN(id)) {
                return res.status(404).json({ pesan: "ID invalid" })
            }
            const cekExpId = await expService.show(id)
            if (!cekExpId) {
                return res.status(404).json({ pesan: "ID invalid" })
            }

            const data = await expService.edit(id, input)
            res.status(200).json({ success: true, data });
        } catch (error) {
            error instanceof ZodError
                ? res.status(400).json({ pesan: error.issues })
                : res.status(400).json({ pesan: "unexpected error" });
        }
    }
    static async delete(req: Request, res: Response){
        try {
             const id = Number(req.params.id)
            if (isNaN(id)) {
                return res.status(404).json({ pesan: "ID invalid" })
            }
            const cekExpId = await expService.show(id)
            if (!cekExpId) {
                return res.status(404).json({ pesan: "ID invalid" })
            }

            await expService.delete(id)
            res.status(200).json({pesan: "data terhapus"})
        } catch (error) {
            error instanceof Error
                ? res.status(400).json({ pesan: error.message })
                : res.status(400).json({ pesan: "unexpected error" });
        }
    }
}

export default exp;
