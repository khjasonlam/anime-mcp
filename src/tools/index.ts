import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerWorksTools } from "./works.js";
import { registerSeriesTools } from "./series.js";

export const registerTools = (server: McpServer) => {
  registerWorksTools(server);
  registerSeriesTools(server);
};
