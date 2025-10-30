import type { Request, Response } from "express";
import pendidikanService, { type Idata } from "./pendidikan.services.js";
import z, { ZodError } from "zod";
import aboutService from "../index/about.services.js";

class pendidikan {
  static async index(req: Request, res: Response) {
    try {
      const data = await pendidikanService.index();
      if (data.length === 0) {
        return res.status(404).json({ pesan: "data kosong" });
      }
      res.status(200).json({ succes: true, data });
    } catch (error) {
      error instanceof Error
        ? res.status(400).json({ pesan: error.message })
        : res.status(400).json({ pesan: "unexpected error" });
    }
  }
  static async show(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ pesan: "data invalid" });
      }
      const data = await pendidikanService.show(id);
      if (!data) {
        return res.status(404).json({ pesan: "data kosong" });
      }
      res.status(200).json({ succes: true, data });
    } catch (error) {
      error instanceof Error
        ? res.status(400).json({ pesan: error.message })
        : res.status(400).json({ pesan: "unexpected error" });
    }
  }
  static async add(req: Request, res: Response) {
    try {
      const validasi = z.object({
        sekolah: z.string().min(1),
        jurusan: z.string().min(1),
        ipk: z.number().min(1),
        aboutId: z.number().min(1),
      });
      const input = validasi.parse(req.body);

      const data = await pendidikanService.add(input);
      res.status(200).json({ succes: true, data });
    } catch (error: unknown) {
      error instanceof ZodError
        ? res.status(400).json({ pesan: error.message })
        : res.status(400).json({ pesan: "unexpected error" });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const validasi = z.object({
        sekolah: z.string().min(1).optional(),
        jurusan: z.string().min(1).optional(),
        ipk: z.number().min(1).optional(),
        aboutId: z.number().min(1).optional(),
      });
      const input = validasi.parse(req.body) as Idata;

      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ pesan: "ID invalid" });
      }
        const parentId = Number(input.aboutId)
        const cekParentId = await aboutService.show(parentId)
        if (!cekParentId) {
          return res.status(400).json({pesan: "Id parent not found"})
        }
      const cekData = await pendidikanService.show(id);
      if (!cekData) {
        return res.status(404).json({ pesan: "data kosong" });
      }
      const data = await pendidikanService.edit(id, input);
      res.status(200).json({ succes: true, data: data });
    } catch (error: unknown) {
      error instanceof ZodError
        ? res.status(400).json({ pesan: error.message })
        : res.status(400).json({ pesan: "unexpected error" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.Id);
      if (isNaN(id)) {
        return res.status(400).json({ pesan: "ID invalid" });
      }

      const cekId = await pendidikanService.show(id);
      if (!cekId) {
        return res.status(404).json({
          pesan: "id not found",
        });
      }

      await pendidikanService.delete(id);
      res.status(200).json({
        success: true,
        pesan: "data terhapus",
      });
    } catch (error: unknown) {
      error instanceof Error
        ? res.status(400).json({ pesan: error.message })
        : res.status(400).json({ pesan: "unexpected error" });
    }
  }
}

export default pendidikan;
