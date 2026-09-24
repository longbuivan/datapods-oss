const API_BASE_URL = (process.env.REACT_APP_API_URL || "http://localhost:8080").replace(/\/+$/, "");

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || payload.message || `Request failed with ${response.status}`);
  }
  return payload;
}

export const fetchConnectors = (role) => request(`/api/connectors?role=${role}`);
export const fetchAiStatus = () => request("/api/ai/status");
export const testConnection = (type, config) => request("/api/connections/test", { method: "POST", body: { type, config } });
export const saveConnection = (connection) => request("/api/connections", { method: "POST", body: connection });
export const generatePipeline = (body) => request("/api/pipelines/generate", { method: "POST", body });
export const deployPipeline = (pipeline) => request("/api/pipelines", { method: "POST", body: { pipeline } });

export { API_BASE_URL };
