import http from "node:http";
import { URL } from "node:url";

function addResponseHelpers(res) {
  res.status = function status(code) {
    res.statusCode = code;
    return res;
  };

  res.json = function json(payload) {
    if (!res.headersSent) {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
    }
    res.end(JSON.stringify(payload));
    return res;
  };
}

function matchPath(routePath, requestPath) {
  return routePath === requestPath;
}

function parseQuery(req) {
  const parsed = new URL(req.url, "http://127.0.0.1");
  req.path = parsed.pathname;
  req.query = Object.fromEntries(parsed.searchParams.entries());
}

function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let total = 0;

    req.on("data", (chunk) => {
      total += chunk.length;
      if (total > limit) {
        reject(Object.assign(new Error("Request body too large."), { status: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

async function runStack(stack, req, res) {
  let index = 0;

  return new Promise((resolve, reject) => {
    const next = (error) => {
      if (error) {
        reject(error);
        return;
      }

      const layer = stack[index];
      index += 1;

      if (!layer) {
        resolve();
        return;
      }

      try {
        const expectsNext = layer.length >= 3;
        const result = layer(req, res, next);
        if (result && typeof result.then === "function") {
          result.then(() => {
            if (!expectsNext || res.writableEnded) {
              resolve();
            }
          }).catch(reject);
        } else if (!expectsNext || res.writableEnded) {
          resolve();
        }
      } catch (error) {
        reject(error);
      }
    };

    next();
  });
}

function express() {
  const layers = [];
  const errorHandlers = [];

  async function handler(req, res) {
    addResponseHelpers(res);
    parseQuery(req);

    try {
      for (const layer of layers) {
        if (res.writableEnded) {
          return;
        }

        if (layer.method === "USE") {
          await runStack(layer.handlers, req, res);
          continue;
        }

        if (layer.method === req.method && matchPath(layer.path, req.path)) {
          await runStack(layer.handlers, req, res);
          return;
        }
      }

      if (!res.writableEnded) {
        res.status(404).json({ error: "not_found", message: "Endpoint not found." });
      }
    } catch (error) {
      const errorHandler = errorHandlers[0];
      if (errorHandler) {
        errorHandler(error, req, res, () => {});
        return;
      }
      res.status(error.status || 500).json({ error: "server_error", message: "Server error." });
    }
  }

  handler.use = (...handlers) => {
    for (const layer of handlers) {
      if (typeof layer === "function" && layer.length === 4) {
        errorHandlers.push(layer);
      } else {
        layers.push({ method: "USE", path: "*", handlers: [layer] });
      }
    }
    return handler;
  };

  handler.get = (path, ...handlers) => {
    layers.push({ method: "GET", path, handlers });
    return handler;
  };

  handler.post = (path, ...handlers) => {
    layers.push({ method: "POST", path, handlers });
    return handler;
  };

  handler.listen = (port, callback) => {
    const server = http.createServer(handler);
    return server.listen(port, callback);
  };

  return handler;
}

express.json = function json(options = {}) {
  const limit = typeof options.limit === "string" && options.limit.endsWith("kb")
    ? Number(options.limit.slice(0, -2)) * 1024
    : 1024 * 64;

  return async function jsonMiddleware(req, _res, next) {
    if (!["POST", "PUT", "PATCH"].includes(req.method)) {
      next();
      return;
    }

    const bodyText = await readBody(req, limit);
    req.body = bodyText ? JSON.parse(bodyText) : {};
    next();
  };
};

export default express;
