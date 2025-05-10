import rateLimit from './rateLimit';

export default function withRateLimit(handler, limit = 10) {
  return async (req, res) => {
    try {
      rateLimit(req, limit);
      return await handler(req, res);
    } catch (err) {
      return res.status(429).json({ message: err.message });
    }
  };
}