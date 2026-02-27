import { defineConfig } from "eslint"
import base from "./base.js"

export default defineConfig(
  ...base,

  {
    rules: {
      "no-console": "off",
    },
  },
)
