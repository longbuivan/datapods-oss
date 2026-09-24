const { buildPipeline } = require("./pipelineTemplate");
const { redact } = require("./connectors");

const SYSTEM_PROMPT = `You are a senior data engineer working on DataPods, a self hosted data platform built on Mage.
You design one Mage pipeline that moves data from a source to a destination.
Answer with JSON only, using this shape:
{
  "summary": "one sentence describing the pipeline",
  "schedule": "@hourly | @daily | @weekly",
  "requirements": ["python packages"],
  "blocks": [
    {"uuid": "snake_case_name", "type": "data_loader|transformer|data_exporter", "content": "python code for the block"}
  ],
  "notes": ["short operational notes"]
}
Every block must be valid Mage python using the @data_loader, @transformer and @data_exporter decorators.
Never inline credentials: read them from environment variables.`;

function aiConfig(env = process.env) {
  return {
    baseUrl: (env.AI_BASE_URL || "https://api.openai.com/v1").replace(/\/+$/, ""),
    apiKey: env.AI_API_KEY || "",
    model: env.AI_MODEL || "gpt-4o-mini",
    timeoutMs: Number(env.AI_TIMEOUT_MS || 45000),
  };
}

function isEnabled(env = process.env) {
  return Boolean(aiConfig(env).apiKey);
}

function userPrompt({ source, destination, description, schedule }) {
  return JSON.stringify(
    {
      source: { type: source.type, config: redact(source.type, source.config) },
      destination: { type: destination.type, config: redact(destination.type, destination.config) },
      goal: description || "Onboard this data with a reliable incremental friendly pipeline.",
      schedule: schedule || "@daily",
    },
    null,
    2
  );
}

function parseJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("Model did not return JSON");
  return JSON.parse(candidate.slice(start, end + 1));
}

function blockDirectory(type) {
  if (type === "data_loader") return "data_loaders";
  if (type === "data_exporter") return "data_exporters";
  return "transformers";
}

function mergeWithTemplate(request, suggestion) {
  const fallback = buildPipeline(request);
  const blocks = Array.isArray(suggestion.blocks) && suggestion.blocks.length ? suggestion.blocks : fallback.blocks;
  const normalised = blocks
    .filter((block) => block && block.uuid && block.content)
    .map((block) => ({
      uuid: String(block.uuid),
      type: ["data_loader", "transformer", "data_exporter"].includes(block.type) ? block.type : "transformer",
      content: String(block.content),
    }));

  if (!normalised.length) return fallback;

  const { metadataYaml } = require("./pipelineTemplate");
  const schedule = suggestion.schedule || fallback.schedule;

  return {
    ...fallback,
    generatedBy: "ai",
    schedule,
    summary: suggestion.summary || fallback.summary,
    notes: Array.isArray(suggestion.notes) ? suggestion.notes : [],
    requirements: Array.isArray(suggestion.requirements) && suggestion.requirements.length
      ? suggestion.requirements
      : fallback.requirements,
    blocks: normalised,
    files: [
      { path: `${fallback.uuid}/metadata.yaml`, content: metadataYaml(fallback.uuid, normalised, schedule) },
      ...normalised.map((block) => ({
        path: `${fallback.uuid}/${blockDirectory(block.type)}/${block.uuid}.py`,
        content: block.content,
      })),
    ],
  };
}

async function generatePipeline(request, { env = process.env, fetchImpl = fetch } = {}) {
  const config = aiConfig(env);
  if (!config.apiKey) {
    return { ...buildPipeline(request), notes: ["Set AI_API_KEY to let the assistant tailor this pipeline."] };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeoutMs);
  try {
    const response = await fetchImpl(`${config.baseUrl}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${config.apiKey}` },
      signal: controller.signal,
      body: JSON.stringify({
        model: config.model,
        temperature: 0.2,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt(request) },
        ],
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error(`AI request failed (${response.status}) ${detail.slice(0, 200)}`.trim());
    }

    const payload = await response.json();
    const content = payload?.choices?.[0]?.message?.content;
    if (!content) throw new Error("AI response was empty");
    return mergeWithTemplate(request, parseJson(content));
  } catch (error) {
    return {
      ...buildPipeline(request),
      notes: [`Generated from the built in template because the AI call failed: ${error.message}`],
    };
  } finally {
    clearTimeout(timer);
  }
}

module.exports = { generatePipeline, mergeWithTemplate, parseJson, aiConfig, isEnabled };
