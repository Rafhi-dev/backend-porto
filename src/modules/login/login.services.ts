import prisma from "../../config/prisma.js";

class authService{
    static cekEmail(email: string){
        return prisma.users.findUnique({where: {email: email}})
    }

    static cekUsername(username: string){
        return prisma.users.findUnique({where: {username: username}})
    }
}

export default authService