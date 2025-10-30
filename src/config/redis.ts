// import { Redis } from "@upstash/redis";
import dotenv from "dotenv"
import Redis from "ioredis"

dotenv.config()

const redis = new (Redis as any)(process.env.UPSTASH_REDIS_TCP_URL, {
    tls: {}
})


export default redis