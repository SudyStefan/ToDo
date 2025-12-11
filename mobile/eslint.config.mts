import globals from "globals";
import eslint from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactNative from "eslint-plugin-react-native";
import pluginPrettier from "eslint-plugin-prettier";

export default [
  {
    ignores: ["node_modules", "dist", "build", "target", "metro.config.js"],
  },
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
      // JavaScript/TypeScript
      ...eslint.configs.recommended.rules,
      "prefer-const": "error",
      "no-var": "error",

      // TypeScript
      ...tsPlugin.configs.recommended.rules,
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": "off",

      // Prettier
      "prettier/prettier": "warn",
      "comma-dangle": 0,
      endOfLine: "off",

      // React
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // React Hooks
      "react-hooks/rules-of-hooks": "error",
      //"react-hooks/exhaustive-deps": "warn",

      // React Native
      //"react-native/no-inline-styles": "warn",
      "react-native/no-unused-styles": "warn",
    },
  },
];
