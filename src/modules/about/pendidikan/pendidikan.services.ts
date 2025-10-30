import prisma from "../../../config/prisma.js";

export interface Idata {
  sekolah: string;
  jurusan: string;
  ipk: number;
  aboutId: number;
}

export interface Iedit {
  sekolah?: string
  jurusan?: string
  ipk?: number
  aboutId?: number
}


class pendidikanService {
  static index() {
    return prisma.pendidikan.findMany();
  }

  static show(id: number) {
    return prisma.pendidikan.findUnique({ where: { id } });
  }

  static add(data: Idata) {
    return prisma.pendidikan.create({ data });
  }

  static edit(id: number, data: Partial<Iedit>) {
    return prisma.pendidikan.update({ where: { id }, data });
  }

  static delete(id: number) {
    return prisma.pendidikan.delete({ where: { id } });
  }

}

export default pendidikanService;
