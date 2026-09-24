const express = require("express");

const { CONNECTORS, listConnectors, validate, redact, testConnection } = require("../lib/connectors");

function secretFields(type) {
  return (CONNECTORS[type]?.fields || []).filter((field) => field.secret).map((field) => field.name);
}

function withoutSecrets(type, config = {}) {
  const secrets = secretFields(type);
  return Object.fromEntries(Object.entries(config).filter(([key]) => !secrets.includes(key)));
}

function connectionsRouter(store) {
  const router = express.Router();

  router.get("/connectors", (req, res) => {
    res.json({ connectors: listConnectors(req.query.role) });
  });

  router.get("/connections", (req, res) => {
    res.json({
      connections: store.list("connections").map((connection) => ({
        ...connection,
        config: redact(connection.type, connection.config),
      })),
    });
  });

  router.post("/connections/test", async (req, res) => {
    const { type, config } = req.body || {};
    const result = await testConnection(type, config || {});
    res.status(result.ok ? 200 : 400).json(result);
  });

  router.post("/connections", (req, res) => {
    const { type, name, role, config } = req.body || {};
    const errors = validate(type, config || {});
    if (errors.length) return res.status(400).json({ error: errors.join(", ") });

    const connection = store.insert("connections", {
      type,
      name: name || CONNECTORS[type].label,
      role: role || CONNECTORS[type].role,
      config: withoutSecrets(type, config),
      secret_env_vars: secretFields(type).filter((field) => config?.[field]),
    });
    res.status(201).json({ connection });
  });

  router.delete("/connections/:id", (req, res) => {
    if (!store.remove("connections", req.params.id)) return res.status(404).json({ error: "Connection not found" });
    res.status(204).end();
  });

  return router;
}

module.exports = { connectionsRouter, withoutSecrets };
