
import prisma from "../../../config/prisma.js";

interface dataType {
  nama: string;
  email: string;
  password: string;
}


class user {
  static index() {
    return prisma.users.findMany({select: {
      id: true,
      nama: true,
      username: true,
      email: true,
      password: false,
      createAt: true,
      deletedAt: true
    }});
  }

  static show(id: number) {
    return prisma.users.findUnique({where: {id: id}});
  }

  static create(data: dataType) {
    return prisma.users.create({data});
  }

  static edit(id: number, data: Partial<dataType>){
    return prisma.users.update({where: {id: id}, data: data})
  }

  static hardDelete(id: number){
    return prisma.users.delete({where: {id: id}})
  }
}

export default user;
