import { defineConfig } from "eslint"
import vuePlugin from "eslint-plugin-vue"
import vueParser from "vue-eslint-parser"
import base from "./base.js"

export default defineConfig(
  ...base,
  ...vuePlugin.configs["flat/recommended"],

  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: "@typescript-eslint/parser",
        sourceType: "module",
      },
    },
    rules: {
      "no-console": "off",
      "vue/multi-word-component-names": "off",
    },
  },
)
