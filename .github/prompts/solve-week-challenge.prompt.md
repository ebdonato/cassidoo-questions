---
description: "Solve this week's challenge from a user-provided question"
name: "solve-week-challenge"
argument-hint: "Paste the challenge question. Optional: include target folder number."
agent: "agent"
---

Solve one weekly coding challenge in this repository using the question provided by the user.

Inputs:

- Challenge question: ${input:challengeQuestion:Paste the full challenge question}
- Target folder (optional): ${input:targetFolder:Folder number like 452; leave blank to infer latest}

Workflow:

1. Identify the target weekly folder.

- If Target folder is provided, use that folder.
- Otherwise, infer the latest numbered folder in the workspace and ask for confirmation before editing files.
- Keep all edits isolated to that folder.

2. Read repository guidance in [AGENTS.md](../../AGENTS.md), then read the target folder files:

- README.md
- index.ts
- index.test.ts

3. Implement the solution in index.ts based on the challenge question.

- Keep the implementation small, direct, and type-safe.
- Match the local file style of that folder.
- Avoid unrelated refactors.

4. Add or update tests in index.test.ts.

- Cover prompt examples and edge cases.
- Add invalid-input tests when relevant.

5. Run tests with Bun.

- Run the target test file first.
- Run full test suite only if needed by broader changes.

6. If tests fail, attempt focused fixes up to 3 times, then stop and report blockers.
7. Return a concise result summary.

Output format:

- Target folder used
- Files changed
- Short explanation of algorithm
- Test command(s) run and pass/fail result
- Any assumptions or ambiguities from the question
