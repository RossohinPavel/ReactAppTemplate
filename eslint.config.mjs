// @ts-check
import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import importX from "eslint-plugin-import-x";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default defineConfig([
  { ignores: ["dist/", "node_modules/", "build/", "vite.config.ts.timestamp-*"],},
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@stylistic": stylistic,
      "import": /** @type {any} */ (importX),
      "unused-imports": unusedImports,
      "react-hooks": /** @type {any} */ (reactHooks),
      "react-refresh": reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.browser },
      parserOptions: {
        project: ["./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      "import-x/resolver": {
        typescript: { project: "./tsconfig.app.json", alwaysTryTypes: true },
      },
    },
    rules: {
      // --- ПРАВИЛА ЛОГИКИ И ТИПИЗАЦИИ ---
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "curly": ["error", "all"],
      "no-console": ["error", { allow: ["info", "error", "warn"] }],
      "no-irregular-whitespace": ["error", { skipStrings: false, skipTemplates: false }],

      // --- ИМПОРТЫ И ПЕРЕМЕННЫЕ ---
      "import/order": ["error", {
        groups: ["builtin", "external", ["internal", "parent", "sibling", "index"]],
        pathGroups: [
          { pattern: "react", group: "external", position: "before" },
          { pattern: "{../*,./*}", group: "internal", position: "after" }
        ],
        pathGroupsExcludedImportTypes: ["react"],
        alphabetize: { order: "asc", caseInsensitive: true },
        "newlines-between": "never",
      }],
      "import/export": "error",
      "import/newline-after-import": ["error", { count: 2, exactCount: true }],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": ["warn", { 
        vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" 
      }],

      // --- СТИЛИСТИКА (Заменяет Prettier) ---
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/max-len": ["error", { "code": 100 }],
      "@stylistic/comma-dangle": ["error", "always-multiline"],
      "@stylistic/space-in-parens": ["error", "never"],
      "@stylistic/space-before-blocks": ["error", "always"],
      "@stylistic/keyword-spacing": ["error", { "before": true, "after": true }],
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/padded-blocks": ["error", { "classes": "always", "blocks": "never" }],

      // --- REACT И HOOKS ---
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },

  // 4. Специфичное окружение для конфигов
  {
    files: ["vite.config.ts"],
    languageOptions: {
      globals: { ...globals.node },
      parserOptions: {
        project: "./tsconfig.node.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
