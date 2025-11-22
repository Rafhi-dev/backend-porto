import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class auth {
  static attemp(req: Request | any, res: Response, next: NextFunction) {
    try {
      // const header = req.headers.authorization
      // if (!header || !header.startsWith("Bearer ")) {
      //   return res
      //     .status(401)
      //     .json({ error: "Access Denied" });
      // }

      // const token = header.split(" ")[1];
      // if (!token) return res.status(401).json({ pesan: "Token missing" });

      const token = req.cookies.token;
      if (!token) {
        res.status(401).json({ error: "Not Authenticate or Access Denied" });
      }
      const secretKeyJWT = `${process.env.JWT_SECRET}`;

      const decode = jwt.verify(token, secretKeyJWT) as JwtPayload;

      req.user = decode;

      next();
    } catch (error: unknown) {
      error instanceof Error
        ? res.status(401).json({ pesan: error.message })
        : res.status(500).json({ pesan: "Unexpected error" });
    }
  }

  static roles(...role: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const dataUser = (req as any).user;
        if (!dataUser) {
          return res.status(401).json({ pesan: "user belum login" });
        }

        if (!role.includes(dataUser.nama)) {
          return res.status(401).json({ pesan: "access denied" });
        }
        next();
      } catch (error) {
        error instanceof Error
          ? res.status(401).json({ pesan: error.message })
          : res.status(500).json({ pesan: "Unexpected error" });
      }
    };
  }
}

export default auth;
