import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import z, { ZodError } from "zod";
import authService from "./login.services.js";
import bcrypt from "bcrypt";
import "dotenv/config";


class login {
  static async auth(req: Request, res: Response) {
    try {
      const validasi = z.object({
        email: z.email(),
        password: z.string().min(6),
      });

      const input = validasi.parse(req.body);

      const secretKeyJWT = `${process.env.JWT_SECRET}`;
      const cekEmail = await authService.cekEmail(input.email);
      if (!cekEmail)
        return res.status(400).json({ pesan: "email/password salah" });

      const match = await bcrypt.compare(input.password, cekEmail.password);

      if (!match)
        return res.status(400).json({ pesan: "email/password salah" });

      const payload = jwt.sign(cekEmail, secretKeyJWT, { expiresIn: "1h" });
      const revoke = jwt.sign(cekEmail, secretKeyJWT, { expiresIn: "7d" });

      res.cookie("token", payload, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        maxAge: 1000 * 60 * 60, // 1 jam
      });

      res.cookie("revoke", revoke, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        maxAge: 1000 * 60 * 120, // 2 jam
      });

      res
        .status(200)
        .json({ login: true, token: payload, revokeToken: revoke });
    } catch (err: unknown) {
      err instanceof ZodError
        ? res.status(400).json({ pesan: err.issues })
        : res.status(500).json({ pesan: "Unexpected error" });
    }
  }

  static async revoke(req: Request | any, res: Response) {
    try {
      const data = req.user;
      res.status(200).json({ login: true, data: data });
      console.log("author", req.headers.authorization);
    } catch (err: unknown) {
      err instanceof ZodError
        ? res.status(400).json({ error: err.issues })
        : res.status(500).json({ error: "unexpected error" });
    }
  }

  static async session(req: Request | any, res: Response) {
    try {
      const dataAuth = req.user;

      if (!dataAuth) {
        throw new Error("Session Invalid");
      }

      const isExpired = Math.floor(Date.now() / 1000);

      if (isExpired > dataAuth.exp) {
        throw new Error("session expired");
      }

      res.status(200).json({
        session: true,
        data: dataAuth,
      });
    } catch (err: unknown) {
      err instanceof Error
        ? res.status(400).json({ error: err.message })
        : res.status(500).json({ error: "unexpected error" });
    }
  }
}

export default login;
