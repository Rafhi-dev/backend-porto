import type { Request, Response } from "express";
import heroService from "./hero.services.js";
import z, { ZodError } from "zod";
import redis from "../../config/redis.js";
import { link } from "fs";

class hero {
  static async index(req: Request, res: Response) {
    try {
      const page = Math.max(Number(req.query.page)) || 1;
      const limit = Math.max(Number(req.query.limit)) || 10;
      const search = req.query.search ? String(req.query.search) : "";

      const skip = (page - 1) * limit;

      const data = await heroService.indexPagination(skip, limit, search);

      const countData = await heroService.index();
      if (countData.length === 0) {
        return res.status(404).json({ dataEmpty: true, pesan: "data empty" });
      }

      const totalPage = Math.ceil(countData.length / limit)

      res.status(200).json({
        meta: {
          totalData: countData.length,
          page: page,
          limit: limit,
          totalPage: totalPage,
        },
        link: {
          self: `/hero?page=${page}&limit=${limit}`,
          next: page < totalPage ? `/hero?page=${page + 1}&limit=${limit}` : null,
          prev: page > 1 ? `/hero?page=${page - 1}&limit=${limit}` : null,
        },
        data: data,
      });
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
      res.status(200).json({ success: true, result });
    } catch (err: unknown) {
      err instanceof ZodError
        ? res.status(400).json({ error: err.issues })
        : res.status(500).json({ error: "unexpected error" });
    }
  }

  static async edit(req: Request, res: Response) {
    try {
      const validasi = z.object({
        title: z.string().min(1, "tidak boleh kosong").optional(),
        subTitle: z.string().min(1, "tidak boleh kosong").optional(),
      });
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(404).json({ pesan: "Data not found" });
      }

      const cekData = await heroService.show({ id });
      if (!cekData) {
        return res.status(404).json({ pesan: "data not found" });
      }

      const data: object = validasi.parse(req.body);

      const result = await heroService.edit(id, data);
      res.status(200).json({ success: true, result });
    } catch (err: unknown) {
      err instanceof ZodError
        ? res.status(400).json({ error: err.issues })
        : res.status(500).json({ error: "unexpected error" });
    }
  }
  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ pesan: "invalid ID" });
      }
      await heroService.delete({ id });
      await redis.del("about");
      res.status(200).json({ success: true, pesan: "data terhapus" });
    } catch (err: unknown) {
      err instanceof ZodError
        ? res.status(400).json({ error: err.issues })
        : res.status(500).json({ error: "unexpected error" });
    }
  }
}

export default hero;
