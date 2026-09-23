# datapod-api

Onboarding API behind the DataPods wizard. It keeps a catalog of connectors, tests
connections, turns a source/destination pair into a runnable Mage pipeline, and writes
that pipeline into the Mage project mounted by `datapod-server`.

## Run

```shell
cd datapod-api
npm install
cp .env.example .env
npm start        # http://localhost:8080
npm test
```

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/health` | Liveness probe |
| GET | `/api/connectors?role=source\|destination` | Connector catalog with form fields |
| GET | `/api/connections` | Saved connections (secrets redacted) |
| POST | `/api/connections/test` | Live check of a connection before saving it |
| POST | `/api/connections` | Save a connection |
| DELETE | `/api/connections/:id` | Delete a connection |
| GET | `/api/ai/status` | Whether an AI provider is configured |
| POST | `/api/pipelines/generate` | Generate a Mage pipeline for a source/destination pair |
| POST | `/api/pipelines` | Write the generated pipeline into the Mage project |
| GET | `/api/pipelines` | Deployed pipelines |

## AI provider

Generation targets any OpenAI compatible `/chat/completions` endpoint, configured with
`AI_BASE_URL`, `AI_API_KEY` and `AI_MODEL`. Without an API key — or when the provider
errors or returns something unusable — the service falls back to a deterministic template
generator, so onboarding always produces a working pipeline.

## Credentials

Secret fields (passwords, tokens, access keys) are used for the live connection test and
are never written to the store. Saved connections list the secrets they expect in
`secret_env_vars`; supply those to Mage as environment variables such as
`SOURCE_DATABASE_URL`, `SOURCE_AUTH_HEADER` or `DESTINATION_PASSWORD`.
