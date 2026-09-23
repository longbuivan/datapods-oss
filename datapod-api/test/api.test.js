const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { test } = require("node:test");

const { createApp } = require("../src/app");

function startServer() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "datapods-test-"));
  const app = createApp({
    storePath: path.join(root, "store.json"),
    projectPath: path.join(root, "mage_project"),
  });
  const server = app.listen(0);
  const { port } = server.address();
  return { server, root, url: (route) => `http://127.0.0.1:${port}${route}` };
}

async function json(response) {
  return { status: response.status, body: await response.json().catch(() => null) };
}

test("connector catalog is filtered by role", async () => {
  const { server, url } = startServer();
  try {
    const { body } = await json(await fetch(url("/api/connectors?role=destination")));
    const types = body.connectors.map((connector) => connector.type);

    assert.ok(types.includes("clickhouse"));
    assert.ok(!types.includes("rest_api"));
  } finally {
    server.close();
  }
});

test("connections never persist secret fields", async () => {
  const { server, url } = startServer();
  try {
    const created = await json(
      await fetch(url("/api/connections"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "postgres",
          name: "warehouse",
          config: { host: "db", port: "5432", database: "app", user: "app", password: "hunter2" },
        }),
      })
    );

    assert.equal(created.status, 201);
    assert.equal(created.body.connection.config.password, undefined);
    assert.deepEqual(created.body.connection.secret_env_vars, ["password"]);

    const listed = await json(await fetch(url("/api/connections")));
    assert.equal(listed.body.connections.length, 1);
  } finally {
    server.close();
  }
});

test("missing required fields are rejected", async () => {
  const { server, url } = startServer();
  try {
    const { status, body } = await json(
      await fetch(url("/api/connections"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "postgres", config: { host: "db" } }),
      })
    );

    assert.equal(status, 400);
    assert.match(body.error, /required/);
  } finally {
    server.close();
  }
});

test("generated pipelines are written into the Mage project", async () => {
  const { server, root, url } = startServer();
  try {
    const generated = await json(
      await fetch(url("/api/pipelines/generate"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: { type: "csv_url", config: { url: "https://example.com/data.csv" } },
          destination: { type: "postgres", config: { host: "db", port: "5432", database: "app", user: "app", table: "raw" } },
        }),
      })
    );
    assert.equal(generated.status, 200);

    const deployed = await json(
      await fetch(url("/api/pipelines"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pipeline: generated.body.pipeline }),
      })
    );

    assert.equal(deployed.status, 201);
    const metadata = path.join(root, "mage_project", "pipelines", generated.body.pipeline.uuid, "metadata.yaml");
    assert.ok(fs.existsSync(metadata));
  } finally {
    server.close();
  }
});
