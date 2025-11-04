import app from "./app.js";
import "dotenv/config"
import prisma from "./config/prisma.js";

const port = process.env.PORT || 4000

app.listen(port, async () => {
    try {
        await prisma.$connect()
        console.log('DB Connected')
        console.log("server running at port ", port)
        
    } catch (error) {
        await prisma.$disconnect()
        console.error(error);
        
    }
})