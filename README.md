# @tardiq/dev-config

Shared developer tooling for the Tardiq platform. One package owns all DX configuration — linting, formatting, TypeScript, commit conventions, and VS Code settings — so every repository in the project stays consistent without duplicating setup.

## Contents

- [Installation](#installation)
- [ESLint](#eslint)
- [Prettier](#prettier)
- [TypeScript](#typescript)
- [Commitlint](#commitlint)
- [VS Code](#vs-code)

---

## Installation

The package is published to **GitHub Packages**. Add an `.npmrc` at the root of your repository to point `@tardiq` scoped packages at the right registry:

```ini
@tardiq:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

`GITHUB_TOKEN` must be a personal access token with `read:packages` scope on your machine, and `secrets.GITHUB_TOKEN` in GitHub Actions (available automatically — no secret to add).

Then install the package and its peer dependencies:

```bash
npm install --save-dev @tardiq/dev-config eslint prettier typescript
```

---

## ESLint

Three configs are provided. All extend `strictTypeChecked` from `typescript-eslint` with `projectService` enabled — the strongest type-aware lint preset available.

### `@tardiq/dev-config/eslint/base`

Core TypeScript rules. Use in any package that does not run in Node.js or the browser.

```js
// eslint.config.js
import base from "@tardiq/dev-config/eslint/base"

export default [...base]
```

### `@tardiq/dev-config/eslint/node`

Extends `base`. Turns off `no-console` — console output is expected in Node.js services and scripts.

```js
// eslint.config.js
import node from "@tardiq/dev-config/eslint/node"

export default [...node]
```

### `@tardiq/dev-config/eslint/vue`

Extends `base`. Adds `eslint-plugin-vue` and `vue-eslint-parser` for Vue 3 Single File Components.

```js
// eslint.config.js
import vue from "@tardiq/dev-config/eslint/vue"

export default [...vue]
```

### Key rules

| Rule | Setting | Effect |
|---|---|---|
| `@typescript-eslint/no-explicit-any` | error | Forbids `any` — use `unknown` instead |
| `@typescript-eslint/consistent-type-imports` | error | All type-only imports must use `import type` |
| `@typescript-eslint/explicit-function-return-type` | error (expressions allowed) | Functions must declare return types |
| `@typescript-eslint/consistent-type-definitions` | error: interface | Prefer `interface` over `type` for object shapes |
| `@typescript-eslint/typedef` | error: memberVariableDeclaration | Class members must be typed explicitly |
| `@typescript-eslint/no-inferrable-types` | off | Allow explicit types even when TypeScript could infer them |
| `curly` | error: all | Always use braces — no single-line `if`/`else` |
| `eqeqeq` | error: always | Forbids `==` / `!=` — use `===` / `!==` |
| `no-console` | warn (off in node/vue) | Warns on `console.*` in non-Node code |

The `strictTypeChecked` preset additionally enables `no-floating-promises`, `no-misused-promises`, `await-thenable`, `no-unsafe-*`, and other type-aware rules that require `projectService`.

---

## Prettier

```js
// prettier.config.js
export { default } from "@tardiq/dev-config/prettier"
```

| Option | Value |
|---|---|
| `semi` | `false` |
| `singleQuote` | `false` (double quotes) |
| `trailingComma` | `"all"` |
| `printWidth` | `100` |
| `tabWidth` | `2` |
| `endOfLine` | `"lf"` |

---

## TypeScript

Three `tsconfig.json` variants are provided. Each extends the shared strict base.

### `@tardiq/dev-config/tsconfig/base.json`

Strict ES2023 baseline with maximum type safety:

- `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noPropertyAccessFromIndexSignature`
- `verbatimModuleSyntax`, `isolatedModules` — required for single-file transpilers (`tsx`, Vite, esbuild)
- `forceConsistentCasingInFileNames`, `noFallthroughCasesInSwitch`
- `declaration`, `declarationMap`, `sourceMap`

```json
{
  "extends": "@tardiq/dev-config/tsconfig/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

### `@tardiq/dev-config/tsconfig/node.json`

Extends `base`. Sets `module` and `moduleResolution` to `NodeNext` for ESM Node.js packages.

```json
{
  "extends": "@tardiq/dev-config/tsconfig/node.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

### `@tardiq/dev-config/tsconfig/vue.json`

Extends `base`. Sets `module` to `ESNext`, `moduleResolution` to `Bundler`, and includes the `DOM` lib. Use with Vite + Vue 3.

```json
{
  "extends": "@tardiq/dev-config/tsconfig/vue.json",
  "include": ["src", "env.d.ts"]
}
```

---

## Commitlint

All repositories follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

Install `@commitlint/cli` and reference this config:

```bash
npm install --save-dev @commitlint/cli
```

```js
// commitlint.config.js
export { default } from "@tardiq/dev-config/commitlint"
```

Wire it into git via a `commit-msg` hook. With [Husky](https://typicode.github.io/husky/):

```bash
npx husky init
echo 'npx --no -- commitlint --edit "$1"' > .husky/commit-msg
```

### Commit format

```
<type>(<scope>): <description>
```

| Type | Semver bump | When to use |
|---|---|---|
| `feat` | minor | New feature |
| `fix` | patch | Bug fix |
| `chore` | — | Maintenance, dependency updates |
| `docs` | — | Documentation only |
| `refactor` | — | Code restructure, no behaviour change |
| `test` | — | Adding or updating tests |
| `style` | — | Formatting, whitespace |
| `perf` | patch | Performance improvement |
| `ci` | — | CI/CD changes |
| `build` | — | Build system changes |
| `revert` | — | Reverts a previous commit |

Breaking changes append `!` after the type — `feat!:` or `fix!:` — and bump the major version.

---

## VS Code

The package ships a `.vscode/settings.json`. When consumed via `file:../tardiq-dev-config` locally, VS Code picks it up automatically. It configures:

- Format on save with Prettier as the default formatter
- ESLint auto-fix on save
- Tab size 2
- TypeScript SDK resolved from `node_modules`
