import type { Request, Response } from "express";
import aboutService, { type Iabout } from "./about.services.js";
import z, { ZodError } from "zod";
import redis from "../../../config/redis.js";

class about {
  static async index(req: any, res: Response) {
    try {
      const data = await aboutService.index();
        if (data.length < 1) {
          return res.status(404).json({ pesan: "Data Kosong" });
        }

      res.status(200).json({ succes: true, result: data });
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
        return res.status(404).json({ pesan: "Data invalid" });
      }

      const data = await aboutService.show(id);
      if (!data) return res.status(404).json({ pesan: "Data kosong" });
      
      res.status(200).json({ success: true, data: data });
    
    } catch (error: unknown) {
      error instanceof Error
        ? res.status(400).json({ pesan: error.message })
        : res.status(400).json({ pesan: "unexpected error" });
    }
  }

  static async save(req: Request, res: Response) {
    try {
      const validasi = z.object({
        tentang: z.string().min(10),
        foto: z.string().min(1),
      });

      const input = validasi.parse(req.body);
      const result = await aboutService.save(input);
 
      res.status(200).json({ success: true, data: result });
    } catch (error: unknown) {
      error instanceof ZodError
        ? res.status(400).json({ pesan: error.issues })
        : res.status(400).json({ pesan: "unexpected error" });
    }
  }
  static async edit(req: Request, res: Response) {
    try {
      const validasi = z.object({
        tentang: z.string().min(5).optional(),
        foto: z.string().optional(),
        aktif: z.boolean().optional(),
      });
      const input = validasi.parse(req.body) as Iabout;
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(404).json({ pesan: "Data invalid" });
      }
      const cekData = await aboutService.show(id);
      if (!cekData) {
        return res.status(404).json({ pesan: "data kosong" });
      }
      const data = await aboutService.edit(id, input);

      res.status(200).json({ success: true, data: data });

    } catch (error: unknown) {
      error instanceof ZodError
        ? res.status(400).json({ pesan: error.issues })
        : res.status(400).json({ pesan: "unexpected error" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      if (isNaN(id)) {
        res.status(400).json({ pesan: "data invalid" })
      }

      const cekData = await aboutService.show(id)
      if (!cekData) {
        res.status(404).json({ pesan: "data not found" })
      }

      await aboutService.delete(id)
      res.status(200).json({ success: true, pesan: "data terhapus" })
    } catch (error: unknown) {
      error instanceof Error
        ? res.status(400).json({ pesan: error.message })
        : res.status(400).json({ pesan: "unexpected error" });
    }
  }
}

export default about;
