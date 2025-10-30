import z, { ZodError } from "zod";
import projectService, { type Iproject } from "./project.services.js";
import type { Request, Response } from "express";

class project {
  static async index(req: Request, res: Response) {
    try {
      const data = await projectService.index();
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
      const data = await projectService.show(id);
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
        gambar: z.string().min(1),
        deskripsi: z.string().min(1),
        urlProf: z.string().min(1),
        status: z.string().min(1),
      });
      const input = validasi.parse(req.body) as Iproject;
      const data = await projectService.add(input);

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
        gambar: z.string().min(1).optional(),
        deskripsi: z.string().min(1).optional(),
        urlProf: z.string().min(1).optional(),
        status: z.string().min(1).optional(),
      });
      const input = validasi.parse(req.body) as Iproject;

      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(404).json({ pesan: "id invalid" });
      }
      const cekDataId = await projectService.show(id);
      if (!cekDataId) {
        return res.status(404).json({ pesan: "data kosong" });
      }

      const data = await projectService.edit(id, input);

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
      const cekDataId = await projectService.show(id);
      if (!cekDataId) {
        return res.status(404).json({ pesan: "data not found" });
      }
      await projectService.delete(id);
    } catch (error) {
      error instanceof Error
        ? res.status(400).json({ pesan: error.message })
        : res.status(400).json({ pesan: "unexpected error" });
    }
  }
}

export default project;
