import { defineConfig } from "eslint"
import tseslint from "typescript-eslint"
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
        parser: tseslint.parser,
        sourceType: "module",
      },
    },
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
)
