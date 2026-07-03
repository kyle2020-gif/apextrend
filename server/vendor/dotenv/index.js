import fs from "node:fs";
import path from "node:path";

function parseEnv(source) {
  const values = {};
  for (const line of source.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex === -1) {
      continue;
    }
    const key = trimmed.slice(0, equalsIndex).trim();
    const rawValue = trimmed.slice(equalsIndex + 1).trim();
    values[key] = rawValue.replace(/^["']|["']$/g, "");
  }
  return values;
}

export function config(options = {}) {
  const cwd = globalThis.process?.cwd ? globalThis.process.cwd() : path.dirname(new URL(import.meta.url).pathname);
  const envPath = options.path || path.join(cwd, ".env");
  if (!fs.existsSync(envPath)) {
    return { parsed: {} };
  }

  const parsed = parseEnv(fs.readFileSync(envPath, "utf8"));
  if (globalThis.process?.env) {
    for (const [key, value] of Object.entries(parsed)) {
      if (globalThis.process.env[key] === undefined) {
        globalThis.process.env[key] = value;
      }
    }
  }

  return { parsed };
}

export default { config };
