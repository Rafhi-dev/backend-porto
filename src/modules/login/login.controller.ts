import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import z, { json, ZodError } from "zod";
import authService from "./login.services.js";
import bcrypt from "bcrypt";

class login {
  static async auth(req: Request, res: Response) {
    try {
      const validasi = z.object({
        email: z.email(),
        password: z.string().min(6),
      });

      const input = validasi.parse(req.body);

      const secretKeyJWT = process.env.JWT_SECRET || "spard4";
      const cekEmail = await authService.cekEmail(input.email);
      if (!cekEmail)
        return res.status(400).json({ pesan: "email/password salah" });

      const match = await bcrypt.compare(input.password, cekEmail.password);

      if (!match)
        return res.status(400).json({ pesan: "email/password salah" });

      const payload = jwt.sign(cekEmail, secretKeyJWT, { expiresIn: "1h" });
      const revoke = jwt.sign(cekEmail, secretKeyJWT, { expiresIn: "7d" });

      res
        .status(200)
        .json({ login: true, token: payload, revokeToken: revoke });
    } catch (err: unknown) {
      err instanceof ZodError
        ? res.status(400).json({ pesan: err.issues })
        : res.status(500).json({ pesan: "Unexpected error" });
    }
  }

  static async revoke(req: Request, res: Response) {
    // code revoke
    try {
      const data = (req as any).user;
      res.status(200).json({ login: true, data: data });
    } catch (err: unknown) {
      err instanceof ZodError
        ? res.status(400).json({ error: err.issues })
        : res.status(500).json({ error: "unexpected error" });
    }
  }
}

export default login;
