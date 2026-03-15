import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

type Handler = (args: unknown) => Promise<unknown>;

/** wrap() の戻り値（ツールハンドラの戻り値） */
export type ToolResult = {
  content: { type: "text"; text: string }[];
  isError?: true;
};

/**
 * テスト用のフェイク MCP サーバー。
 * registerTool で登録されたハンドラを getHandler で取得し、直接呼び出せる。
 */
export function createFakeMcpServer(): McpServer & { getHandler: (name: string) => Handler | undefined } {
  const tools = new Map<string, Handler>();
  return {
    registerTool(name: string, _options: { description?: string; inputSchema?: unknown }, handler: Handler) {
      tools.set(name, handler);
    },
    getHandler(name: string) {
      return tools.get(name);
    },
  } as McpServer & { getHandler: (name: string) => Handler | undefined };
}
