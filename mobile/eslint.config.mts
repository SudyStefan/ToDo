import globals from "globals";
import eslint from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactNative from "eslint-plugin-react-native";
import pluginPrettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json",
      },
    },

    plugins: {
      "@typescript-eslint": tsPlugin,
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "react-native": pluginReactNative,
      prettier: pluginPrettier,
    },

    rules: {
      "prefer-const": "error",
      "no-var": "error",

      "prettier/prettier": ["warn"],

      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      "react-native/no-inline-styles": "warn",
      "react-native/no-unused-styles": "warn",
    }
  },
  eslint.configs.recommended,
  tsPlugin.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReactNative.configs ? pluginReactNative.configs.recommended : {},
  prettierConfig ? prettierConfig : {}
]);


// import globals from "globals";
// import eslint from "@eslint/js";
// import tseslint from "typescript-eslint";
// import pluginReact from "eslint-plugin-react";
// import { defineConfig } from "eslint/config";

// export default defineConfig([
//   { 
//     files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], 
//     languageOptions: { globals: globals.browser } 
//   },
//   eslint.configs.recommended,
//   tseslint.configs.recommended,
//   pluginReact.configs.flat.recommended,
// ]);
