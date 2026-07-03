export default function cors(options = {}) {
  return function corsMiddleware(req, res, next) {
    const requestOrigin = req.headers.origin;
    const allowedOrigins = Array.isArray(options.origin) ? options.origin : [options.origin].filter(Boolean);
    const origin = allowedOrigins.includes(requestOrigin) ? requestOrigin : allowedOrigins[0] || "*";

    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (options.credentials) {
      res.setHeader("Access-Control-Allow-Credentials", "true");
    }

    if (req.method === "OPTIONS") {
      res.statusCode = 204;
      res.end();
      return;
    }

    next();
  };
}
