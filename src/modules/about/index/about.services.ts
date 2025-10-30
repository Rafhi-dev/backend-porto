import prisma from "../../../config/prisma.js";

export interface Iabout{
    tentang: string
    foto: string
    aktif?: boolean
}

class aboutService{
    static index(){
        return prisma.about.findMany({include: {pedidikan: true}})
    }
    static show(id: number){
        return prisma.about.findUnique({where: {id}, include: {pedidikan: true}})
    }
    static save(data: Iabout){
        return prisma.about.create({data})
    }
    static edit(id: number, data: Partial<Iabout>){
        return prisma.about.update({where: {id}, data})
    }
    static delete(id: number){
        return prisma.about.delete({where: {id}, include: {pedidikan: true}})
    }
}

export default aboutService