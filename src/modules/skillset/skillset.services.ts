import prisma from "../../config/prisma.js";

export interface skillType{
    icon: string
    namaSkill: string
}


class skillService{
    static index() {
        return prisma.skill.findMany()
    }
    
    static show(id: number){
        return prisma.skill.findUnique({where: {id}})
    }

    static add(data: skillType){
        return prisma.skill.create({data})
    }

    static edit(id: number, data: skillType){
        return prisma.skill.update({where: {id}, data})
    }

    static delete(id: number){
        return prisma.skill.delete({where: {id}})
    }
}

export default skillService