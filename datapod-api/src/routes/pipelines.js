const express = require("express");

const { generatePipeline, isEnabled } = require("../lib/ai");
const { validate } = require("../lib/connectors");
const { writePipelineFiles } = require("../lib/mageWriter");

function resolveEndpoint(store, endpoint) {
  if (!endpoint) return null;
  if (endpoint.connection_id) {
    const saved = store.get("connections", endpoint.connection_id);
    return saved ? { type: saved.type, config: saved.config } : null;
  }
  if (!endpoint.type) return null;
  return { type: endpoint.type, config: endpoint.config || {} };
}

function pipelinesRouter(store, { projectPath }) {
  const router = express.Router();

  router.get("/ai/status", (req, res) => {
    res.json({ enabled: isEnabled(), model: process.env.AI_MODEL || "gpt-4o-mini" });
  });

  router.post("/pipelines/generate", async (req, res) => {
    const source = resolveEndpoint(store, req.body?.source);
    const destination = resolveEndpoint(store, req.body?.destination);
    if (!source || !destination) return res.status(400).json({ error: "A source and a destination are required" });

    const errors = [...validate(source.type, source.config), ...validate(destination.type, destination.config)];
    if (errors.length) return res.status(400).json({ error: errors.join(", ") });

    const pipeline = await generatePipeline({
      source,
      destination,
      name: req.body?.name,
      description: req.body?.description,
      schedule: req.body?.schedule,
    });
    res.json({ pipeline });
  });

  router.post("/pipelines", async (req, res) => {
    const pipeline = req.body?.pipeline;
    if (!pipeline?.uuid || !Array.isArray(pipeline.files)) {
      return res.status(400).json({ error: "A generated pipeline is required" });
    }

    try {
      const files = writePipelineFiles(pipeline, projectPath);
      const record = store.insert("pipelines", {
        uuid: pipeline.uuid,
        summary: pipeline.summary,
        schedule: pipeline.schedule,
        generated_by: pipeline.generatedBy || "template",
        files,
      });
      res.status(201).json({ pipeline: record, mage_url: process.env.MAGE_URL || "http://localhost:6789" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get("/pipelines", (req, res) => {
    res.json({ pipelines: store.list("pipelines") });
  });

  return router;
}

module.exports = { pipelinesRouter, resolveEndpoint };
