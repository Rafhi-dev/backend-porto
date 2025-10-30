import type { Request, Response } from "express";
import heroService from "./hero.services.js";
import z, { ZodError } from "zod";

class hero {
  
static async index(req: Request, res: Response) {
    try {
      const data = await heroService.index();
      if (data.length === 0) {
        return res.status(404).json({pesan: "data not found"})
      }
      res.status(200).json({data})
    } catch (err: unknown) {
      err instanceof Error
        ? res.status(400).json({ error: err.message })
        : res.status(500).json({ error: "unexpected error" });
    }
  }

 static async show(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(404).json({ error: "ID invalid" });
      }
      const data = await heroService.show({ id });
      res.status(200).json({ data: data });
    } catch (error) {
      error instanceof Error
        ? res.status(400).json({ error: error.message })
        : res.status(500).json({ error: "unexpected error" });
    }
  }

 static async create(req: Request, res: Response) {
    try {
      const validasi = z.object({
        title: z.string().min(1, "tidak boleh kosng"),
        subTitle: z.string().min(1, "tidak boleh kosong"),
      });

      const data = validasi.parse(req.body);
      const result = await heroService.create({ data });
      res.status(200).json({success: true, result})
    } catch (err: unknown) {
      err instanceof ZodError
        ? res.status(400).json({ error: err.issues })
        : res.status(500).json({ error: "unexpected error" });
    }
  }

  static async edit(req: Request, res: Response){
    try {
        const validasi = z.object({
        title: z.string().min(1, "tidak boleh kosong").optional(),
        subTitle: z.string().min(1, "tidak boleh kosong").optional()
      });
      const id = Number(req.params.id)
      if (isNaN(id)) {
        return res.status(404).json({pesan: "Data not found"})
      }

      const cekData = await heroService.show({id})
      if (!cekData) {
        return res.status(404).json({pesan: "data not found"})
      }

      const data: object = validasi.parse(req.body)

      const result = await heroService.edit(id, data)
      res.status(200).json({success: true, result})
    } catch (err: unknown) {
        err instanceof ZodError
        ? res.status(400).json({ error: err.issues })
        : res.status(500).json({ error: "unexpected error" });
    }
  }
  static async delete(req: Request, res: Response){
    try {
      const id = Number(req.params.id)
      if (isNaN(id)) {
        return res.status(400).json({pesan: "invalid ID"})
      }
      await heroService.delete({id})
      res.status(200).json({success: true, pesan: "data terhapus"})
    } catch (err: unknown) {
      err instanceof ZodError
        ? res.status(400).json({ error: err.issues })
        : res.status(500).json({ error: "unexpected error" });
    }
  }
}

export default hero;
