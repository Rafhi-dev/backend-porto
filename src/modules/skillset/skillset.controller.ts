import type { Request, Response } from "express";
import skillService, { type skillType } from "./skillset.services.js";
import z, { ZodError } from "zod";

class skillSet {
    static async index(req: Request, res: Response) {
        try {
            const data = await skillService.index()
            if (data.length < 1) {
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
            const data = await skillService.show(id);
            if (!data) {
                return res.status(404).json({ pesan: "data kosong" });
            }

            res.status(200).json({ success: true, data });
        } catch (error) {
            error instanceof Error
                ? res.status(400).json({ pesan: error.message })
                : res.status(400).json({ pesan: "unexpected error" });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const validasi = z.object({
                icon: z.string().min(1),
                namaSkill: z.string().min(1),
            });
            const input = validasi.parse(req.body) as skillType
            const data = await skillService.add(input);

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
                icon: z.string().min(1).optional(),
                namaSkill: z.string().min(1).optional(),
            });
            const input = validasi.parse(req.body) as skillType

            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(404).json({ pesan: "id invalid" });
            }
            const cekDataId = await skillService.show(id);
            if (!cekDataId) {
                return res.status(404).json({ pesan: "data kosong" });
            }

            const data = await skillService.edit(id, input)

            res.status(200).json({ success: true, data });
        } catch (error: unknown) {
            error instanceof ZodError
                ? res.status(400).json({ pesan: error.issues })
                : res.status(400).json({ pesan: "unexpected error" });
        }
    }
    static async remove(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(404).json({ pesan: "id invalid" });
            }
            const cekDataId = await skillService.show(id);
            if (!cekDataId) {
                return res.status(404).json({ pesan: "data not found" });
            }
            await skillService.delete(id)
        } catch (error) {
            error instanceof Error
                ? res.status(400).json({ pesan: error.message })
                : res.status(400).json({ pesan: "unexpected error" });
        }
    }
}

export default skillSet