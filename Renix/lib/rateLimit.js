import LRU from 'lru-cache';

const rateLimitCache = new LRU({
  max: 500,
  ttl: 60 * 1000, // 1 minuto
});

export default function rateLimit(req, limit = 10) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const tokenCount = rateLimitCache.get(ip) || 0;

  if (tokenCount >= limit) {
    throw new Error('Muitas requisições — tente novamente em 1 minuto.');
  }

  rateLimitCache.set(ip, tokenCount + 1);
}