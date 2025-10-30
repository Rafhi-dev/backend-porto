import type { Request, Response } from "express";
import jobdeskService, { type Ijobdesk } from "./jobdesk.services.js";
import z, { ZodError } from "zod";

class jobdesk {
  static async index(req: Request, res: Response) {
    try {
      const data = await jobdeskService.index();
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
      const data = await jobdeskService.show(id);
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

  static async add(req: Request, res: Response) {
    try {
      const validasi = z.object({
        deskripsi: z.string().min(1),
        pengalamanId: z.number().min(1),
      });
      const input = validasi.parse(req.body) as Ijobdesk;
      const data = await jobdeskService.add(input);

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
        deskripsi: z.string().min(1).optional(),
        pengalamanId: z.number().min(1).optional(),
      });
      const input = validasi.parse(req.body) as Ijobdesk;

      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(404).json({ pesan: "id invalid" });
      }
      const cekJobdeskId = await jobdeskService.show(id);
      if (!cekJobdeskId) {
        return res.status(404).json({ pesan: "data kosong" });
      }

      const data = await jobdeskService.edit(id, input);

      res.status(200).json({ success: true, data });
    } catch (error: unknown) {
      error instanceof ZodError
        ? res.status(400).json({ pesan: error.issues })
        : res.status(400).json({ pesan: "unexpected error" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(404).json({ pesan: "id invalid" });
      }
      const cekJobdeskId = await jobdeskService.show(id);
      if (!cekJobdeskId) {
        return res.status(404).json({ pesan: "data not found" });
      }

      await jobdeskService.delete(id)

      res.status(200).json({ success: true, pesan: "data terhapus" });
    } catch (error: unknown) {
      error instanceof Error
        ? res.status(400).json({ pesan: error.message })
        : res.status(400).json({ pesan: "unexpected error" });
    }
  }
}

export default jobdesk