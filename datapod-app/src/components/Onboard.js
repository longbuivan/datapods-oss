import React, { useCallback, useEffect, useMemo, useState } from "react";

import ConnectionForm from "./ConnectionForm";
import {
  deployPipeline,
  fetchAiStatus,
  fetchConnectors,
  generatePipeline,
  saveConnection,
  testConnection,
} from "../lib/api";

const STEPS = ["Connect source", "Choose destination", "Generate pipeline", "Deploy"];
const SCHEDULES = ["@hourly", "@daily", "@weekly"];

function withDefaults(connectors, type) {
  const connector = connectors.find((item) => item.type === type);
  if (!connector) return {};
  return Object.fromEntries(connector.fields.filter((field) => field.default).map((field) => [field.name, field.default]));
}

const Onboard = () => {
  const [step, setStep] = useState(0);
  const [sourceConnectors, setSourceConnectors] = useState([]);
  const [destinationConnectors, setDestinationConnectors] = useState([]);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const [source, setSource] = useState({ type: "", config: {} });
  const [destination, setDestination] = useState({ type: "", config: {} });
  const [sourceTest, setSourceTest] = useState(null);
  const [destinationTest, setDestinationTest] = useState(null);

  const [description, setDescription] = useState("");
  const [schedule, setSchedule] = useState("@daily");
  const [pipeline, setPipeline] = useState(null);
  const [deployment, setDeployment] = useState(null);
  const [activeBlock, setActiveBlock] = useState(0);

  useEffect(() => {
    Promise.all([fetchConnectors("source"), fetchConnectors("destination"), fetchAiStatus()])
      .then(([sources, destinations, ai]) => {
        setSourceConnectors(sources.connectors);
        setDestinationConnectors(destinations.connectors);
        setAiEnabled(ai.enabled);
      })
      .catch((reason) => setError(`DataPods API unavailable: ${reason.message}`));
  }, []);

  const endpoint = step === 0 ? source : destination;
  const connectors = step === 0 ? sourceConnectors : destinationConnectors;
  const setEndpoint = step === 0 ? setSource : setDestination;
  const setTestResult = step === 0 ? setSourceTest : setDestinationTest;
  const testResult = step === 0 ? sourceTest : destinationTest;

  const selectType = useCallback(
    (type) => {
      setEndpoint({ type, config: withDefaults(connectors, type) });
      setTestResult(null);
    },
    [connectors, setEndpoint, setTestResult]
  );

  const updateField = useCallback(
    (name, value) => {
      setEndpoint((current) => ({ ...current, config: { ...current.config, [name]: value } }));
      setTestResult(null);
    },
    [setEndpoint, setTestResult]
  );

  const runTest = async () => {
    setBusy(true);
    setError("");
    try {
      const result = await testConnection(endpoint.type, endpoint.config);
      setTestResult({ ok: true, message: result.message });
    } catch (reason) {
      setTestResult({ ok: false, message: reason.message });
    } finally {
      setBusy(false);
    }
  };

  const persistAndContinue = async () => {
    setBusy(true);
    setError("");
    try {
      await saveConnection({
        type: endpoint.type,
        role: step === 0 ? "source" : "destination",
        config: endpoint.config,
      });
      setStep(step + 1);
    } catch (reason) {
      setError(reason.message);
    } finally {
      setBusy(false);
    }
  };

  const runGeneration = async () => {
    setBusy(true);
    setError("");
    try {
      const result = await generatePipeline({ source, destination, description, schedule });
      setPipeline(result.pipeline);
      setActiveBlock(0);
    } catch (reason) {
      setError(reason.message);
    } finally {
      setBusy(false);
    }
  };

  const runDeployment = async () => {
    setBusy(true);
    setError("");
    try {
      const result = await deployPipeline(pipeline);
      setDeployment(result);
      setStep(3);
    } catch (reason) {
      setError(reason.message);
    } finally {
      setBusy(false);
    }
  };

  const canContinue = useMemo(() => Boolean(endpoint.type) && testResult?.ok, [endpoint.type, testResult]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <a href="/" className="flex items-center space-x-3">
            <img src="/icon.svg" alt="DataPods" className="h-8" />
            <span className="text-xl font-bold">DataPods</span>
          </a>
          <span className="text-sm text-gray-500">
            {aiEnabled ? "AI assistant connected" : "Template mode (no AI key configured)"}
          </span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold">Onboard your data</h1>
        <p className="mt-2 max-w-2xl text-gray-500">
          Connect a source, pick a destination, and DataPods writes a runnable Mage pipeline into your pod.
        </p>

        <ol className="mt-8 flex flex-wrap gap-3">
          {STEPS.map((label, index) => (
            <li
              key={label}
              className={`rounded-full px-4 py-1 text-sm ${
                index === step
                  ? "bg-orange-500 text-white"
                  : index < step
                  ? "bg-green-600/20 text-green-600"
                  : "bg-gray-200 text-gray-500 dark:bg-gray-800"
              }`}
            >
              {index + 1}. {label}
            </li>
          ))}
        </ol>

        {error && <p className="mt-6 rounded border border-red-500 bg-red-500/10 px-4 py-3 text-sm text-red-500">{error}</p>}

        <section className="mt-8 rounded-lg border border-gray-200 p-6 dark:border-gray-800">
          {step <= 1 && (
            <div>
              <h2 className="text-xl font-semibold">{STEPS[step]}</h2>
              <p className="mb-6 text-sm text-gray-500">
                {step === 0
                  ? "Where does your data live today?"
                  : "Where should DataPods land the data inside your pod?"}
              </p>

              <ConnectionForm
                connectors={connectors}
                selectedType={endpoint.type}
                config={endpoint.config}
                onSelectType={selectType}
                onChange={updateField}
              />

              {testResult && (
                <p className={`mt-4 text-sm ${testResult.ok ? "text-green-600" : "text-red-500"}`}>{testResult.message}</p>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={!endpoint.type || busy}
                  onClick={runTest}
                  className="rounded border border-orange-500 px-4 py-2 text-sm font-semibold text-orange-500 disabled:opacity-40"
                >
                  {busy ? "Testing..." : "Test connection"}
                </button>
                <button
                  type="button"
                  disabled={!canContinue || busy}
                  onClick={persistAndContinue}
                  className="rounded bg-orange-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
                >
                  Save and continue
                </button>
                {step === 1 && (
                  <button type="button" onClick={() => setStep(0)} className="px-4 py-2 text-sm text-gray-500">
                    Back
                  </button>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold">Describe the pipeline</h2>
              <p className="mb-6 text-sm text-gray-500">
                {aiEnabled
                  ? "The assistant turns your description into Mage blocks you can edit before deploying."
                  : "No AI key configured, so DataPods generates the pipeline from its built in template."}
              </p>

              <label className="block text-sm">
                <span className="mb-1 block font-medium">What should this pipeline do?</span>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Sync orders every morning, drop test accounts, and cast created_at to UTC"
                  className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </label>

              <div className="mt-4 flex items-center gap-3">
                <span className="text-sm font-medium">Schedule</span>
                {SCHEDULES.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSchedule(option)}
                    className={`rounded-full px-3 py-1 text-sm ${
                      schedule === option ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-600 dark:bg-gray-800"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={busy}
                  onClick={runGeneration}
                  className="rounded bg-orange-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
                >
                  {busy ? "Generating..." : pipeline ? "Regenerate" : "Generate pipeline"}
                </button>
                <button type="button" onClick={() => setStep(1)} className="px-4 py-2 text-sm text-gray-500">
                  Back
                </button>
              </div>

              {pipeline && (
                <div className="mt-8">
                  <p className="text-sm text-gray-500">
                    {pipeline.summary} ({pipeline.generatedBy === "ai" ? "AI generated" : "template"})
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {pipeline.blocks.map((block, index) => (
                      <button
                        key={block.uuid}
                        type="button"
                        onClick={() => setActiveBlock(index)}
                        className={`rounded px-3 py-1 text-xs ${
                          index === activeBlock ? "bg-gray-900 text-white dark:bg-white dark:text-black" : "bg-gray-200 dark:bg-gray-800"
                        }`}
                      >
                        {block.uuid}
                      </button>
                    ))}
                  </div>
                  <pre className="mt-3 max-h-80 overflow-auto rounded bg-gray-900 p-4 text-xs text-green-200">
                    {pipeline.blocks[activeBlock]?.content}
                  </pre>
                  {pipeline.requirements?.length > 0 && (
                    <p className="mt-3 text-xs text-gray-500">Requires: {pipeline.requirements.join(", ")}</p>
                  )}
                  {pipeline.notes?.map((note) => (
                    <p key={note} className="mt-1 text-xs text-gray-500">
                      {note}
                    </p>
                  ))}
                  <button
                    type="button"
                    disabled={busy}
                    onClick={runDeployment}
                    className="mt-6 rounded bg-green-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
                  >
                    {busy ? "Deploying..." : "Deploy to my pod"}
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 3 && deployment && (
            <div>
              <h2 className="text-xl font-semibold">Pipeline deployed</h2>
              <p className="mt-2 text-sm text-gray-500">
                {deployment.pipeline.uuid} is now part of your Mage project and runs {deployment.pipeline.schedule}.
              </p>
              <ul className="mt-4 list-inside list-disc text-sm text-gray-500">
                {deployment.pipeline.files.map((file) => (
                  <li key={file}>{file}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={deployment.mage_url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded bg-orange-500 px-4 py-2 text-sm font-semibold text-white"
                >
                  Open in Mage
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setStep(0);
                    setPipeline(null);
                    setDeployment(null);
                    setSourceTest(null);
                    setDestinationTest(null);
                  }}
                  className="px-4 py-2 text-sm text-gray-500"
                >
                  Onboard another source
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Onboard;
