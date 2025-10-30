import type { Request, Response } from "express";

export default function output(code: number, msg: any) {
  (_: Request, res: Response) => {
    res.status(code).send(msg);
  };
}

export function success({code = 200, data}: { code?: number; data: any }) {
  return (_: Request, res: Response) => {
    res.status(code).send({ success: true, data: data });
  };
}

export function error400({code = 400, error}: { code?: number; error: any }) {
  return (_: Request, res: Response) => {
    res.status(code).send({ success: false, error: error});
  };
}

export function notFound({code = 404, error}: { code?: number; error: any }) {
  return (_: Request, res: Response) => {
    res.status(code).send({ success: false, error: error});
  };
}