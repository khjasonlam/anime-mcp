import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerWorksTools } from "@/tools/works.js";
import { registerSeriesTools } from "@/tools/series.js";

export const registerTools = (server: McpServer) => {
  registerWorksTools(server);
  registerSeriesTools(server);
};
