import type { Request, Response } from "express";
import pageIndexService, { type pageIndexType } from "./pageIndex.services.js";
import z, { ZodError } from "zod";

class pageIndex {
    static async index(_: Request, res: Response) {
        try {
            const result = await pageIndexService.index();
            if (!result) {
                return res.status(404).json({ pesan: "data not found" });
            }
            res.status(200).json({ success: true, result });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ pesan: error.message });
            }
            res.status(400).send("Unexpected Error");
        }
    }

    static async allData(_: Request, res: Response) {
        try {
            const result = await pageIndexService.showAll();
            if (result.length < 1) {
                return res.status(404).send("Data Empty");
            }
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ pesan: error.message });
            }
            res.status(400).send("Unexpected Error");
        }
    }

    static async show(req: Request, res: Response) {
        try {
            const id = Number(req.body.id);
            if (isNaN(id)) {
                return res.status(400).send("id invalid");
            }
            const result = await pageIndexService.show(id);

            if (!result) return res.status(404).send("data not found");

            res.status(200).json({ success: true, result });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ pesan: error.message });
            }
            res.status(400).send("Unexpected Error");
        }
    }

    static async add(req: Request, res: Response) {
        try {
            const validasi = z.object({
                heroId: z.number().min(1),
                aboutId: z.number().min(1),
                pengalamanId: z.number().min(1),
            });

            const input = validasi.parse(req.body);

            const result = await pageIndexService.create(input);

            res.status(200).json({ success: true, result });
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                return res.status(400).json({ pesan: error.issues });
            }
            res.status(400).send("Unexpected Error");
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const validasi = z.object({
                heroId: z.number().optional(),
                aboutId: z.number().optional(),
                pengalamanId: z.number().optional(),
            });

            const input = validasi.parse(req.body) as pageIndexType;

            const id = Number(req.body.id);
            if (isNaN(id)) {
                return res.status(400).send("id invalid");
            }

            const result = await pageIndexService.edit(id, input);

            res.status(200).json({ success: true, result });
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                return res.status(400).json({ pesan: error.issues });
            }
            res.status(400).send("Unexpected Error");
        }
    }
    static async delete(req: Request, res: Response) {
        try {
            const id = Number(req.body.id);
            if (isNaN(id)) {
                return res.status(400).send("id invalid");
            }

            await pageIndexService.remove(id);

            const cekdata = await pageIndexService.show(id);
            if (!cekdata) return res.status(200).send("data deleted");
            res.status(500).send("failed to delete data");
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ pesan: error.message });
            }
            res.status(400).send("Unexpected Error");
        }
    }
}

export default pageIndex;
