import { defineConfig } from "eslint"
import tseslint from "typescript-eslint"

export default defineConfig(
  ...tseslint.configs.strictTypeChecked,

  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true }],
      "@typescript-eslint/typedef": ["error", { memberVariableDeclaration: true }],
      "@typescript-eslint/no-inferrable-types": "off",
      curly: ["error", "all"],
      eqeqeq: ["error", "always"],
      "no-console": "warn",
    },
  },
)
