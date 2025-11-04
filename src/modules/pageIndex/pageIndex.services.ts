import prisma from "../../config/prisma.js";

export interface pageIndexType{
    heroId: number
    aboutId: number
    pengalamanId: number
}

class pageIndexService{
    static index(){
        return prisma.pageIndex.findFirst({where: {aktif: true}, include: {
            hero: true,
            about: true,
            pengalaman: true,
            skill: true,
            proyek: true
        }})
    }
    static showAll(){
        return prisma.pageIndex.findMany()
    }
    static show(id: number){
        return prisma.pageIndex.findUnique({where: {id}})
    }
    static create(data: pageIndexType){
        return prisma.pageIndex.create({data})
    }
    static edit(id: number, data: pageIndexType){
        return prisma.pageIndex.update({where: {id}, data})
    }
    static remove(id: number){
        return prisma.pageIndex.delete({where: {id}})
    }
}

export default pageIndexService