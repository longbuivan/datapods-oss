const { CONNECTORS } = require("./connectors");

function slugify(value, fallback) {
  const slug = String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return slug || fallback;
}

function pipelineName(source, destination, name) {
  return slugify(name || `${source.type}_to_${destination.type}`, "datapods_pipeline");
}

function loaderBlock(source) {
  const config = source.config || {};
  if (source.type === "postgres" || source.type === "mysql") {
    const table = config.table || "your_table";
    const schema = config.schema ? `${config.schema}.` : "";
    return `import pandas as pd
from sqlalchemy import create_engine

from os import getenv

if 'data_loader' not in globals():
    from mage_ai.data_preparation.decorators import data_loader


@data_loader
def load_data(*args, **kwargs) -> pd.DataFrame:
    """Extract rows from ${source.type} table ${schema}${table}."""
    engine = create_engine(getenv('SOURCE_DATABASE_URL'))
    return pd.read_sql('select * from ${schema}${table}', engine)
`;
  }
  if (source.type === "s3") {
    return `import pandas as pd

if 'data_loader' not in globals():
    from mage_ai.data_preparation.decorators import data_loader


@data_loader
def load_data(*args, **kwargs) -> pd.DataFrame:
    """Read objects from s3://${config.bucket || "your-bucket"}/${config.prefix || ""}."""
    return pd.read_csv('s3://${config.bucket || "your-bucket"}/${config.prefix || ""}')
`;
  }
  if (source.type === "rest_api") {
    const recordsPath = config.records_path || "";
    const walk = recordsPath
      ? recordsPath
          .split(".")
          .filter(Boolean)
          .map((key) => `payload = payload['${key}']`)
          .join("\n    ")
      : "";
    return `import pandas as pd
import requests

from os import getenv

if 'data_loader' not in globals():
    from mage_ai.data_preparation.decorators import data_loader


@data_loader
def load_data(*args, **kwargs) -> pd.DataFrame:
    """Call ${config.url || "the API"} and normalise the response into a dataframe."""
    headers = {}
    token = getenv('SOURCE_AUTH_HEADER')
    if token:
        headers['Authorization'] = token

    response = requests.${(config.method || "get").toLowerCase()}('${config.url || ""}', headers=headers, timeout=60)
    response.raise_for_status()

    payload = response.json()
    ${walk}
    return pd.json_normalize(payload)
`;
  }
  return `import pandas as pd

if 'data_loader' not in globals():
    from mage_ai.data_preparation.decorators import data_loader


@data_loader
def load_data(*args, **kwargs) -> pd.DataFrame:
    """Read the uploaded file into a dataframe."""
    return pd.read_csv('${config.url || "https://example.com/data.csv"}', sep='${config.separator || ","}')
`;
}

function transformerBlock(description) {
  const docstring = description ? description.replace(/"""/g, "'''") : "Clean column names and drop empty rows.";
  return `import pandas as pd

if 'transformer' not in globals():
    from mage_ai.data_preparation.decorators import transformer


@transformer
def transform(df: pd.DataFrame, *args, **kwargs) -> pd.DataFrame:
    """${docstring}"""
    df.columns = [str(column).strip().lower().replace(' ', '_') for column in df.columns]
    return df.dropna(how='all')
`;
}

function exporterBlock(destination) {
  const config = destination.config || {};
  const table = config.table || "datapods_target";
  if (destination.type === "clickhouse") {
    return `import pandas as pd

from os import getenv

if 'data_exporter' not in globals():
    from mage_ai.data_preparation.decorators import data_exporter


@data_exporter
def export_data(df: pd.DataFrame, **kwargs) -> None:
    """Load the dataframe into ClickHouse table ${config.database || "default"}.${table}."""
    import clickhouse_connect

    client = clickhouse_connect.get_client(
        host=getenv('DESTINATION_HOST', '${config.host || "localhost"}'),
        port=int(getenv('DESTINATION_PORT', '${config.port || 8123}')),
        username=getenv('DESTINATION_USER', '${config.user || "default"}'),
        password=getenv('DESTINATION_PASSWORD', ''),
        database='${config.database || "default"}',
    )
    client.insert_df('${table}', df)
`;
  }
  if (destination.type === "s3") {
    return `import pandas as pd

if 'data_exporter' not in globals():
    from mage_ai.data_preparation.decorators import data_exporter


@data_exporter
def export_data(df: pd.DataFrame, **kwargs) -> None:
    """Write the dataframe to s3://${config.bucket || "your-bucket"}/${config.prefix || ""}."""
    df.to_parquet('s3://${config.bucket || "your-bucket"}/${config.prefix || ""}', index=False)
`;
  }
  return `import pandas as pd
from sqlalchemy import create_engine

from os import getenv

if 'data_exporter' not in globals():
    from mage_ai.data_preparation.decorators import data_exporter


@data_exporter
def export_data(df: pd.DataFrame, **kwargs) -> None:
    """Load the dataframe into ${destination.type} table ${table}."""
    engine = create_engine(getenv('DESTINATION_DATABASE_URL'))
    df.to_sql(
        '${table}',
        engine,
        schema='${config.schema || "public"}',
        if_exists='replace',
        index=False,
    )
`;
}

function metadataYaml(name, blocks, schedule) {
  const blockYaml = blocks
    .map((block, index) => {
      const upstream = index === 0 ? "[]" : `[${blocks[index - 1].uuid}]`;
      return `- all_upstream_blocks_executed: true
  color: null
  configuration: {}
  downstream_blocks: ${index === blocks.length - 1 ? "[]" : `[${blocks[index + 1].uuid}]`}
  executor_config: null
  executor_type: local_python
  language: python
  name: ${block.uuid}
  retry_config: null
  status: updated
  timeout: null
  type: ${block.type}
  upstream_blocks: ${upstream}
  uuid: ${block.uuid}`;
    })
    .join("\n");

  return `blocks:
${blockYaml}
cache_block_output_in_memory: false
created_at: '${new Date().toISOString()}'
data_integration: null
description: Generated by the DataPods onboarding wizard
executor_config: {}
executor_count: 1
executor_type: null
name: ${name}
notification_config: {}
remote_variables_dir: null
run_pipeline_in_one_process: false
settings:
  triggers:
    schedule_interval: '${schedule || "@daily"}'
spark_config: {}
tags: [datapods, onboarding]
type: python
uuid: ${name}
variables_dir: /home/src/mage_data
widgets: []
`;
}

function requirementsFor(source, destination) {
  const packages = new Set(["pandas"]);
  for (const endpoint of [source, destination]) {
    if (["postgres", "mysql"].includes(endpoint.type)) {
      packages.add("sqlalchemy");
      packages.add(endpoint.type === "postgres" ? "psycopg2-binary" : "pymysql");
    }
    if (endpoint.type === "clickhouse") packages.add("clickhouse-connect");
    if (endpoint.type === "s3") packages.add("s3fs");
    if (endpoint.type === "rest_api") packages.add("requests");
  }
  return [...packages].sort();
}

function buildPipeline({ source, destination, name, description, schedule }) {
  const uuid = pipelineName(source, destination, name);
  const blocks = [
    { uuid: `load_${slugify(source.type, "source")}`, type: "data_loader", content: loaderBlock(source) },
    { uuid: "transform_records", type: "transformer", content: transformerBlock(description) },
    { uuid: `export_${slugify(destination.type, "destination")}`, type: "data_exporter", content: exporterBlock(destination) },
  ];

  return {
    uuid,
    name: uuid,
    schedule: schedule || "@daily",
    summary: `Move data from ${CONNECTORS[source.type]?.label || source.type} into ${
      CONNECTORS[destination.type]?.label || destination.type
    } on a ${schedule || "@daily"} schedule.`,
    generatedBy: "template",
    requirements: requirementsFor(source, destination),
    blocks,
    files: [
      { path: `${uuid}/metadata.yaml`, content: metadataYaml(uuid, blocks, schedule) },
      ...blocks.map((block) => ({
        path: `${uuid}/${block.type === "data_loader" ? "data_loaders" : block.type === "transformer" ? "transformers" : "data_exporters"}/${block.uuid}.py`,
        content: block.content,
      })),
    ],
  };
}

module.exports = { buildPipeline, slugify, metadataYaml, requirementsFor };
