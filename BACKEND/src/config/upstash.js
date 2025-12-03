import pkg from "@upstash/ratelimit";
const { Ratelimit } = pkg;

import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, "50 s"),
});

export default rateLimiter;