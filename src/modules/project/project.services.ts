import prisma from "../../config/prisma.js";

export interface Iproject {
  gambar: string;
  deskripsi: string;
  urlProf: string;
  status: string;
}

class projectService {
  static index() {
    return prisma.proyek.findMany();
  }

  static show(id: number) {
    return prisma.proyek.findUnique({ where: { id } });
  }

  static add(data: Iproject) {
    return prisma.proyek.create({ data });
  }

  static edit(id: number, data: Iproject) {
    return prisma.proyek.update({ where: { id }, data });
  }

  static delete(id: number) {
    return prisma.proyek.delete({ where: { id } });
  }
}

export default projectService;
