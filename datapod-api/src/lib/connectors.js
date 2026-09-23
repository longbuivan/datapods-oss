const net = require("net");

const CONNECTORS = {
  postgres: {
    label: "PostgreSQL",
    role: "both",
    fields: [
      { name: "host", label: "Host", required: true, default: "localhost" },
      { name: "port", label: "Port", required: true, default: "5432" },
      { name: "database", label: "Database", required: true },
      { name: "user", label: "User", required: true },
      { name: "password", label: "Password", required: false, secret: true },
      { name: "schema", label: "Schema", required: false, default: "public" },
      { name: "table", label: "Table", required: false },
    ],
  },
  mysql: {
    label: "MySQL",
    role: "source",
    fields: [
      { name: "host", label: "Host", required: true, default: "localhost" },
      { name: "port", label: "Port", required: true, default: "3306" },
      { name: "database", label: "Database", required: true },
      { name: "user", label: "User", required: true },
      { name: "password", label: "Password", required: false, secret: true },
      { name: "table", label: "Table", required: false },
    ],
  },
  clickhouse: {
    label: "ClickHouse",
    role: "destination",
    fields: [
      { name: "host", label: "Host", required: true, default: "localhost" },
      { name: "port", label: "HTTP port", required: true, default: "8123" },
      { name: "database", label: "Database", required: true, default: "default" },
      { name: "user", label: "User", required: false, default: "default" },
      { name: "password", label: "Password", required: false, secret: true },
      { name: "table", label: "Table", required: false },
    ],
  },
  s3: {
    label: "Amazon S3",
    role: "both",
    fields: [
      { name: "bucket", label: "Bucket", required: true },
      { name: "prefix", label: "Key or prefix", required: true },
      { name: "region", label: "Region", required: true, default: "us-east-1" },
      { name: "aws_access_key_id", label: "Access key id", required: false, secret: true },
      { name: "aws_secret_access_key", label: "Secret access key", required: false, secret: true },
    ],
  },
  rest_api: {
    label: "REST API",
    role: "source",
    fields: [
      { name: "url", label: "URL", required: true },
      { name: "method", label: "Method", required: false, default: "GET" },
      { name: "auth_header", label: "Authorization header", required: false, secret: true },
      { name: "records_path", label: "Records path (e.g. data.items)", required: false },
    ],
  },
  csv_url: {
    label: "CSV / file URL",
    role: "source",
    fields: [
      { name: "url", label: "File URL", required: true },
      { name: "separator", label: "Separator", required: false, default: "," },
    ],
  },
};

const TCP_CONNECTORS = { mysql: 3306, clickhouse: 8123 };
const HTTP_CONNECTORS = ["rest_api", "csv_url"];

function listConnectors(role) {
  return Object.entries(CONNECTORS)
    .filter(([, c]) => !role || c.role === role || c.role === "both")
    .map(([type, c]) => ({ type, label: c.label, role: c.role, fields: c.fields }));
}

function validate(type, config = {}) {
  const connector = CONNECTORS[type];
  if (!connector) return [`Unknown connector type "${type}"`];
  return connector.fields
    .filter((field) => field.required && !String(config[field.name] ?? "").trim())
    .map((field) => `${field.label} is required`);
}

function redact(type, config = {}) {
  const connector = CONNECTORS[type];
  if (!connector) return {};
  const out = {};
  for (const field of connector.fields) {
    const value = config[field.name];
    if (value === undefined || value === "") continue;
    out[field.name] = field.secret ? "********" : value;
  }
  return out;
}

function checkTcp(host, port, timeoutMs) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    const done = (ok, message) => {
      socket.destroy();
      resolve({ ok, message });
    };
    socket.setTimeout(timeoutMs);
    socket.once("connect", () => done(true, `Reached ${host}:${port}`));
    socket.once("timeout", () => done(false, `Timed out connecting to ${host}:${port}`));
    socket.once("error", (error) => done(false, error.message));
    socket.connect(Number(port), host);
  });
}

async function checkPostgres(config, timeoutMs) {
  let Client;
  try {
    ({ Client } = require("pg"));
  } catch {
    return checkTcp(config.host, config.port, timeoutMs);
  }
  const client = new Client({
    host: config.host,
    port: Number(config.port),
    database: config.database,
    user: config.user,
    password: config.password,
    connectionTimeoutMillis: timeoutMs,
  });
  try {
    await client.connect();
    const { rows } = await client.query("select current_database() as db, version() as version");
    return { ok: true, message: `Connected to ${rows[0].db}`, details: { version: rows[0].version } };
  } catch (error) {
    return { ok: false, message: error.message };
  } finally {
    await client.end().catch(() => {});
  }
}

async function checkHttp(url, method, headers, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { method, headers, signal: controller.signal });
    return {
      ok: response.ok,
      message: `${response.status} ${response.statusText}`.trim(),
      details: { status: response.status },
    };
  } catch (error) {
    return { ok: false, message: error.name === "AbortError" ? `Timed out calling ${url}` : error.message };
  } finally {
    clearTimeout(timer);
  }
}

async function testConnection(type, config = {}, { timeoutMs = 5000 } = {}) {
  const errors = validate(type, config);
  if (errors.length) return { ok: false, message: errors.join(", ") };

  if (type === "postgres") return checkPostgres(config, timeoutMs);
  if (type in TCP_CONNECTORS) {
    return checkTcp(config.host, config.port || TCP_CONNECTORS[type], timeoutMs);
  }
  if (HTTP_CONNECTORS.includes(type)) {
    const headers = config.auth_header ? { Authorization: config.auth_header } : {};
    return checkHttp(config.url, (config.method || "GET").toUpperCase(), headers, timeoutMs);
  }
  if (type === "s3") {
    const host = `${config.bucket}.s3.${config.region}.amazonaws.com`;
    return checkHttp(`https://${host}/`, "HEAD", {}, timeoutMs);
  }
  return { ok: false, message: `Testing is not supported for "${type}" yet` };
}

module.exports = { CONNECTORS, listConnectors, validate, redact, testConnection };
