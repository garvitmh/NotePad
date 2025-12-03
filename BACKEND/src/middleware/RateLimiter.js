import rateLimiter from "../config/upstash.js";

export const rateLimit = async (req, res, next) => {
  try {
    const identifier = req.ip;
    const result = await rateLimiter.limit(identifier);
    
    res.setHeader('X-RateLimit-Limit', result.limit);
    res.setHeader('X-RateLimit-Remaining', result.remaining);
    
    if (!result.success) {
      return res.status(429).json({
        message: 'Too many requests, please try again later.',
      });
    }
    
    next();
  } catch (error) {
    console.error('Rate limiting error:', error);
    next();
  }
};

export default rateLimit;
