import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

// Backend-only ESLint config (flat config).
// - NodeNext / ESM project ("type": "module")
// - TypeScript sources in backend/src
export default defineConfig([
  globalIgnores(["dist", "node_modules", "logs", ".eslintignore"]),
  {
    files: ["src/**/*.{ts,tsx}", "*.{ts,tsx}", "scripts/**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    linterOptions: {
      reportUnusedDisableDirectives: false,
    },
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.node,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      // Backend has many Express handlers / catch blocks with unused params.
      "@typescript-eslint/no-unused-vars": "off",
      // Repo uses `{}` frequently in generics/DTO-ish areas; keep lint noise low.
      "@typescript-eslint/no-empty-object-type": "off",
      // Allows patterns like /\// used in RegExp processing.
      "no-useless-escape": "off",
    },
  },
]);
