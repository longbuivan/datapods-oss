const fs = require("fs");
const path = require("path");

function writePipelineFiles(pipeline, projectPath) {
  const root = path.resolve(projectPath);
  const written = [];
  for (const file of pipeline.files) {
    const target = path.resolve(root, "pipelines", file.path);
    if (!target.startsWith(path.join(root, "pipelines"))) {
      throw new Error(`Refusing to write outside of the Mage project: ${file.path}`);
    }
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, file.content);
    written.push(path.relative(root, target));
  }
  return written;
}

module.exports = { writePipelineFiles };
