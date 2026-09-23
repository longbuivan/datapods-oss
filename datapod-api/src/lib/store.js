const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

class JsonStore {
  constructor(filePath) {
    this.filePath = filePath;
    this.data = { connections: [], pipelines: [] };
    this.load();
  }

  load() {
    try {
      const raw = fs.readFileSync(this.filePath, "utf8");
      const parsed = JSON.parse(raw);
      this.data = { connections: parsed.connections || [], pipelines: parsed.pipelines || [] };
    } catch {
      this.data = { connections: [], pipelines: [] };
    }
  }

  persist() {
    fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
  }

  list(collection) {
    return this.data[collection] || [];
  }

  get(collection, id) {
    return this.list(collection).find((item) => item.id === id);
  }

  insert(collection, item) {
    const record = { id: crypto.randomUUID(), created_at: new Date().toISOString(), ...item };
    this.data[collection] = [...this.list(collection), record];
    this.persist();
    return record;
  }

  remove(collection, id) {
    const before = this.list(collection).length;
    this.data[collection] = this.list(collection).filter((item) => item.id !== id);
    this.persist();
    return this.list(collection).length < before;
  }
}

module.exports = { JsonStore };
