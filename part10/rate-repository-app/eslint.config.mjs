import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "no-console": "off", // Desactiva la regla de console
      "no-unused-vars": "off", // Desactiva la regla de variables no usadas
      "react/prop-types": "off", // Desactiva la regla de prop-types en React
      "react/no-children-prop": "off",
      "react/no-deprecated": ["warn", { "reactDom": "render" }] // Desactiva la regla de children como prop en React
    }
  }
];
