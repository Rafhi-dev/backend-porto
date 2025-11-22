import { title } from "node:process";
import prisma from "../../config/prisma.js";

interface Hero {
  title: string;
  subTitle: string;
}

interface Idata {
  data: Hero;
}

interface dataId {
  id: number;
}
interface Iedit {
  title?: string | undefined;
  subTitle?: string | undefined;
}

class heroService {
  
  static index() {
    return prisma.hero.findMany();
  }

  static indexPagination(skip: number, limit: number, search: any){
    return prisma.hero.findMany({
      skip: skip,
      take: limit,
      where: {
        OR: [
          {title: {contains: search, mode: "insensitive"}},
          {subTitle: {contains: search, mode: "insensitive"} }
        ]
      }
    })
  }

  static show({ id }: dataId) {
    return prisma.hero.findUnique({ where: { id } });
  }

  static create({ data }: Idata) {
    return prisma.hero.create({ data });
  }

  static edit(id: number, data: Partial<Hero>) {
    return prisma.hero.update({ where: { id }, data });
  }

  static delete({ id }: dataId) {
    return prisma.hero.delete({ where: { id } });
  }
}

export default heroService;
