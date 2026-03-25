# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run build          # Compile TypeScript (tsc + tsc-alias + chmod)
npm run dev            # Watch mode
npm start              # Run the compiled MCP server
npm test               # Run all tests with Vitest
npm run lint           # ESLint check on src/
npm run lint:fix       # Auto-fix ESLint issues
npm run format         # Prettier format src/
npm run format:check   # Check Prettier formatting
```

To run a single test file:
```bash
npx vitest run test/api/works.test.ts
```

## Architecture

This is an MCP (Model Context Protocol) server that exposes Annict anime API data as tools for AI assistants. It uses `StdioServerTransport` — the server communicates via stdin/stdout, not HTTP.

### Request Flow

1. MCP client calls a tool (e.g. `search_anime`)
2. Tool handler in `src/tools/*.ts` validates input with Zod schema
3. Handler calls the corresponding function in `src/api/*.ts`
4. `src/api/client.ts` — `get<T>()` — makes authenticated HTTP GET to Annict API
5. Response is formatted by `src/utils/format/*.ts` into a human-readable string
6. `src/utils/result.ts` wraps the string into MCP content format (`ok()`) or error (`err()`)
7. `wrap()` in result.ts handles try/catch for all async tool handlers

### Key Conventions

- **Path alias**: `@/` maps to `src/` — use `@/api/client` not relative paths
- **Tool registration**: Each resource type has a dedicated file in `src/tools/` with a `registerXxxTools(server)` export; all are called in `src/index.ts`
- **Adding a new resource**: Create `src/api/new.ts`, `src/types/new.ts`, `src/tools/new.ts`, `src/utils/format/new.ts`, then register in `src/index.ts`
- **Error handling**: Always use `wrap(async () => { ... }, "prefix")` in tool handlers — never throw directly
- **Auth**: `getAnnictAccessToken()` in `src/config.ts` reads `ANNICT_ACCESS_TOKEN` env var; required for all API calls (including non-user endpoints)

### Testing Pattern

Tests use a `createFakeMcpServer()` helper (`test/helpers/test-helpers.ts`) that captures tool registrations and allows direct handler invocation without a real MCP transport. API calls are mocked with `vi.spyOn` / `vi.fn()` on the fetch global or the api module functions.

## Environment

Copy `.env.example` to `.env` and set `ANNICT_ACCESS_TOKEN` from https://annict.com/settings/apps. Node.js 22+ is required.
