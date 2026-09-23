import React from "react";

const ConnectionForm = ({ connectors, selectedType, config, onSelectType, onChange }) => {
  const connector = connectors.find((item) => item.type === selectedType);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {connectors.map((item) => (
          <button
            key={item.type}
            type="button"
            onClick={() => onSelectType(item.type)}
            className={`rounded border px-4 py-3 text-left text-sm transition ${
              item.type === selectedType
                ? "border-orange-500 bg-orange-500/10 text-orange-500"
                : "border-gray-300 hover:border-orange-400 dark:border-gray-700"
            }`}
          >
            <span className="font-semibold">{item.label}</span>
            <span className="block text-xs text-gray-500">{item.type}</span>
          </button>
        ))}
      </div>

      {connector && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {connector.fields.map((field) => (
            <label key={field.name} className="text-sm">
              <span className="mb-1 block font-medium">
                {field.label}
                {field.required && <span className="text-orange-500"> *</span>}
              </span>
              <input
                type={field.secret ? "password" : "text"}
                value={config[field.name] ?? field.default ?? ""}
                placeholder={field.default || ""}
                onChange={(event) => onChange(field.name, event.target.value)}
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              />
              {field.secret && (
                <span className="mt-1 block text-xs text-gray-500">
                  Used for the connection test only, never stored.
                </span>
              )}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConnectionForm;
