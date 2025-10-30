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
