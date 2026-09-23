const path = require("path");

const cors = require("cors");
const express = require("express");

const { JsonStore } = require("./lib/store");
const { connectionsRouter } = require("./routes/connections");
const { pipelinesRouter } = require("./routes/pipelines");

function createApp({
  storePath = process.env.DATAPODS_STORE || path.join(process.cwd(), "data", "datapods.json"),
  projectPath = process.env.MAGE_PROJECT_PATH || path.join(process.cwd(), "mage_project"),
} = {}) {
  const app = express();
  const store = new JsonStore(storePath);

  app.use(cors());
  app.use(express.json({ limit: "1mb" }));

  app.get("/health", (req, res) => res.json({ status: "ok", service: "datapod-api" }));
  app.use("/api", connectionsRouter(store));
  app.use("/api", pipelinesRouter(store, { projectPath }));

  app.use((req, res) => res.status(404).json({ error: "Not found" }));

  return app;
}

module.exports = { createApp };
