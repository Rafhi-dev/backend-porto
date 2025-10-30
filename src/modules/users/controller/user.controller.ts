import type { Request, Response } from "express";
import service from "../service/user.services.js";
import z, { ZodError } from "zod";
import bcrypt from "bcrypt";

class user {
  static async index(_: Request, res: Response) {
    try {
      const data = await service.index();
      if (data.length < 1) {
        return res.status(404).json({ pesan: "data kosong" })
      }
      res.status(200).json(data);
    } catch (error: unknown) {
      error instanceof ZodError
        ? res.status(400).json({ pesan: error.issues })
        : res.status(500).json("Unexpected Error");
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) throw new Error("ID invalid");
      const showData = await service.show(id);

      showData
        ? res.status(200).json({ success: true, data: showData })
        : res.status(404).json({ pesan: "data not found !!" });
    } catch (error: unknown) {
      error instanceof Error
        ? res.status(400).json({ pesan: error.message })
        : res.status(500).json("Unexpected Error");
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const validasi = z.object({
        nama: z.string().min(3),
        email: z.email(),
        password: z.string(),
      });
      const data = validasi.parse(req.body);
      const hashing = await bcrypt.hash(data.password, 12);

      const createData = await service.create({
        nama: data.nama,
        email: data.email,
        password: hashing,
      });

      const { password, ...userSafe } = createData;
      res.status(200).json({ success: true, data: userSafe });
    } catch (error: unknown) {
      error instanceof ZodError
        ? res.status(401).json({ pesan: error })
        : res.status(500).json("Unexpected Error");
    }
  }

  static async edit(req: Request, res: Response) {
    try {
      const validasiUpdate = z.object({
        nama: z.string().min(3).optional(),
        email: z.string().email().optional(),
        password: z.string().min(6).optional(),
      });
      const id = Number(req.params.id);
      const cekDataId = await service.show(id);
      if (!cekDataId)
        return res.status(404).json({ pesan: "data tidak ditemukan" });

      const input = validasiUpdate.parse(req.body);

      let hashing = cekDataId.password;

      if (input.password) {
        hashing = await bcrypt.hash(input.password, 12);
      }

      const update = await service.edit(id, {
        nama: input.nama || cekDataId.nama,
        email: input.email || cekDataId.email,
        password: hashing,
      });

      const { password, ...userSafe } = update;
      res.status(200).json({ sukses: true, userSafe });
    } catch (error: unknown) {
      error instanceof ZodError
        ? res.status(401).json({ pesan: error })
        : res.status(500).json("Unexpected Error");
    }
  }
}

export default user;
