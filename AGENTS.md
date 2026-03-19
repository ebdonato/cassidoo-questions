# AGENTS.md

Guidance for coding agents working in `cassidoo-questions`.

## Repo Shape

- Runtime: Bun.
- Language: TypeScript.
- Package manager: Bun (`bun.lock` present).
- Each numbered folder (`436/` to `447/`) is a standalone weekly challenge.
- Typical challenge contents:
  - `README.md` - problem statement and examples.
  - `index.ts` - solution implementation.
  - `index.test.ts` - Bun tests.

## Instruction Sources Checked

- No prior root `AGENTS.md` existed.
- No `.cursor/rules/` directory exists.
- No `.cursorrules` file exists.
- No `.github/copilot-instructions.md` file exists.
- This file is the canonical in-repo agent guidance for now.

## Working Rules

- Treat each numbered folder as isolated unless the user asks for cross-folder changes.
- Read the local `README.md` before changing behavior.
- Keep edits local to the relevant challenge directory.
- Do not rename numbered folders.
- Keep solutions small, direct, and easy to test.

## Commands

The root `package.json` has no scripts, so use Bun directly from the repo root.

### Install

```bash
bun install
```

### Run all tests

```bash
bun test
```

- Verified in this repo: runs all `*.test.ts` files and currently passes from root.

### Run one test file

```bash
bun test 447/index.test.ts
```

- Replace the path with any target folder, for example `bun test 446/index.test.ts`.

### Run one test by name

```bash
bun test 447/index.test.ts -t "returns proper swap count"
```

```bash
bun test -t "throws an error when the array is empty"
```

### Useful Bun test flags

```bash
bun test --help
```

- `-t, --test-name-pattern`
- `--coverage`
- `--bail`
- `--timeout`

## Build / Lint / Typecheck Status

- Build command: none configured.
- Lint command: none configured.
- Format command: none configured.
- Typecheck command: none configured via script or local `tsconfig.json`.

Agent implications:

- Do not claim `npm run build`, `npm run lint`, or `npm run test` exists.
- Default verification is `bun test` or `bun test <path>`.
- If asked to lint or format, preserve file style manually.
- If asked to build, explain that this repo is a collection of challenge solutions, not an app build.

## File Conventions

- Each challenge is self-contained.
- `index.ts` usually exports one main function plus local helpers.
- `index.test.ts` imports from `bun:test` and `./index`.
- Root `README.md` is minimal and does not define workflow.

## Formatting Conventions

Formatting is slightly mixed between older and newer folders.

- Newer files (`444/` to `447/`) generally use:
  - 2-space indentation
  - double quotes
  - semicolons
  - spaced imports
- Older files (`436/` to `441/`) often use:
  - 4-space indentation
  - double quotes
  - no semicolons
  - compact imports

Agent rule:

- Match the style of the file you edit.
- Do not reformat unrelated lines.
- For brand-new files, prefer 2 spaces, double quotes, and semicolons.

## Imports

- Keep imports at the top of the file.
- Prefer one import per module source.
- Preserve relative imports such as `./index`.
- Do not introduce path aliases.

Common pattern:

```ts
import { describe, expect, it } from "bun:test";
import { majorityElement } from "./index";
```

## TypeScript Guidelines

- Add explicit parameter and return types for exported functions.
- Use generics when the algorithm is intentionally generic, such as `majorityElement<T>` or `moveNums<T>`.
- Prefer built-in types like `Record<string, string>` when appropriate.
- Keep helper functions unexported unless needed outside the file.
- Avoid `any`.
- `unknown[]` is acceptable when the function truly supports arbitrary values.
- `type` and `enum` are both acceptable when they fit the local file.

## Naming Guidelines

- Use descriptive camelCase for exported functions.
- Match challenge wording when practical.
- Use short, meaningful helper names.
- Use PascalCase for types and enums.
- Write test names as behavior sentences.

Examples already in the repo:

- `checkAlternating`
- `nearestPerfectMonths`
- `minSwapsToAlternate`
- `Bear`
- `Direction`

## Implementation Style

- Favor straightforward algorithms over heavy abstraction.
- Small pure functions are the norm.
- Mutation is acceptable if it simplifies the solution and matches the function contract.
- Standard array helpers are common: `map`, `filter`, `reduce`, `every`, `sort`.
- Prefer early returns over deep nesting.

## Error Handling

- Throw plain `Error` with direct, stable messages.
- Validate unsupported input near the top of the function.
- Keep error strings unchanged if tests assert exact text.
- Do not introduce custom error classes unless the user asks for them.

Existing message patterns:

- `"Array must not be empty"`
- `"k must be greater than or equal to 2"`
- `"Input must have 2 distinct characters"`

## Test Guidelines

- Tests use Bun's `describe`, `it`, and `expect`.
- Include prompt examples plus additional edge cases.
- Add invalid-input coverage when the implementation throws.
- Use nested `describe` blocks when they improve readability.

Suggested workflow:

1. Read `README.md`, `index.ts`, and `index.test.ts` in the target folder.
2. Make the smallest change that solves the task.
3. Run `bun test <folder>/index.test.ts`.
4. Run `bun test` if the change is broad or the user wants full verification.

## Comments And Docs

- JSDoc on exported functions is common and useful.
- Keep comments concise and accurate.
- Add inline comments only for non-obvious logic or edge cases.
- Avoid comment noise on self-explanatory code.

## Do Not Assume

- No ESLint, Prettier, Biome, or CI workflow is configured.
- No build artifact is produced.
- No cross-folder imports should be expected.
- No repo-wide formatting rule overrides local file style.

## Bottom Line

This repo is a Bun-tested collection of standalone TypeScript challenge solutions.
Keep changes local, preserve file-specific formatting, and verify with `bun test`.
