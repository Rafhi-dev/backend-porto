import prisma from "../../../config/prisma.js";

export type Iwork = {
  jabatan: string;
  perushaan: string;
  tahun_mulai: string;
  tahun_selesai: string;
  aktif?: boolean;
}

class expService {
  static index() {
    return prisma.pengalaman.findMany({ include: { jobdesk: true } });
  }

  static show(id: number) {
    return prisma.pengalaman.findUnique({ where: { id } });
  }

  static add(data: Iwork): Promise<Iwork> {
    return prisma.pengalaman.create({data});
  }

  static edit(id: number, data: Iwork): Promise<Iwork>{
    return prisma.pengalaman.update({where: {id}, data})
  }

  static delete(id: number){
    return prisma.pengalaman.delete({where: {id}})
  }
}

export default expService
