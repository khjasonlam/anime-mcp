import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerWorksTools } from "@/tools/works.js";
import { registerSeriesTools } from "@/tools/series.js";
import { registerEpisodesTools } from "@/tools/episodes.js";

/** 作品・シリーズ・エピソードの全 MCP ツールをサーバーに登録する */
export const registerTools = (server: McpServer) => {
  registerWorksTools(server);
  registerSeriesTools(server);
  registerEpisodesTools(server);
};
