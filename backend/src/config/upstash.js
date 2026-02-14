import { Redis } from '@upstash/redis'
import dotenv from 'dotenv'
import {Ratelimit} from "@upstash/ratelimit";

dotenv.config();

const rateLimiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "20 s"),
});

export default rateLimiter;