const assert = require("node:assert/strict");
const { test } = require("node:test");

const { buildPipeline } = require("../src/lib/pipelineTemplate");
const { generatePipeline, parseJson, mergeWithTemplate } = require("../src/lib/ai");

const request = {
  source: { type: "postgres", config: { host: "db", port: "5432", database: "app", user: "app", schema: "public", table: "orders" } },
  destination: { type: "clickhouse", config: { host: "ch", port: "8123", database: "default", table: "orders" } },
  description: "Daily orders sync",
};

test("template pipeline contains loader, transformer, exporter and metadata", () => {
  const pipeline = buildPipeline(request);

  assert.equal(pipeline.uuid, "postgres_to_clickhouse");
  assert.deepEqual(
    pipeline.blocks.map((block) => block.type),
    ["data_loader", "transformer", "data_exporter"]
  );
  assert.ok(pipeline.files.some((file) => file.path.endsWith("metadata.yaml")));
  assert.ok(pipeline.blocks[0].content.includes("select * from public.orders"));
  assert.ok(pipeline.requirements.includes("clickhouse-connect"));
});

test("parseJson reads fenced model output", () => {
  const parsed = parseJson('```json\n{"summary": "hello"}\n```');
  assert.equal(parsed.summary, "hello");
});

test("model blocks replace the template blocks", () => {
  const merged = mergeWithTemplate(request, {
    summary: "AI summary",
    schedule: "@hourly",
    blocks: [{ uuid: "load_orders", type: "data_loader", content: "print('hi')" }],
  });

  assert.equal(merged.generatedBy, "ai");
  assert.equal(merged.schedule, "@hourly");
  assert.equal(merged.blocks.length, 1);
  assert.ok(merged.files.some((file) => file.path.endsWith("data_loaders/load_orders.py")));
});

test("generation falls back to the template when the AI call fails", async () => {
  const pipeline = await generatePipeline(request, {
    env: { AI_API_KEY: "test-key" },
    fetchImpl: async () => ({ ok: false, status: 500, text: async () => "boom" }),
  });

  assert.equal(pipeline.generatedBy, "template");
  assert.match(pipeline.notes[0], /AI call failed/);
});

test("generation uses the AI response when the model answers", async () => {
  const pipeline = await generatePipeline(request, {
    env: { AI_API_KEY: "test-key" },
    fetchImpl: async () => ({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: JSON.stringify({
                summary: "Sync orders hourly",
                schedule: "@hourly",
                blocks: [{ uuid: "load_orders", type: "data_loader", content: "# load" }],
              }),
            },
          },
        ],
      }),
    }),
  });

  assert.equal(pipeline.generatedBy, "ai");
  assert.equal(pipeline.summary, "Sync orders hourly");
});
