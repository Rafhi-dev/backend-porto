import prisma from "../../../config/prisma.js";

export interface Ijobdesk {
  deskripsi: string;
  pengalamanId: number;
}

class jobdeskService {
  static index() {
    return prisma.jobdesk.findMany();
  }

  static show(id: number) {
    return prisma.jobdesk.findUnique({ where: { id } });
  }

  static add(data: Ijobdesk) {
    return prisma.jobdesk.create({ data });
  }

  static edit(id: number, data: Partial<Ijobdesk>) {
    return prisma.jobdesk.update({ where: { id }, data });
  }

  static delete(id: number) {
    return prisma.jobdesk.delete({ where: { id } });
  }
}

export default jobdeskService;
