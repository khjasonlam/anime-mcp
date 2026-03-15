import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerWorksTools } from "@/tools/works.js";
import { registerSeriesTools } from "@/tools/series.js";
import { registerEpisodesTools } from "@/tools/episodes.js";
import { registerPeopleTools } from "@/tools/people.js";
import { registerOrganizationsTools } from "@/tools/organizations.js";
import { registerStaffsTools } from "@/tools/staffs.js";
import { registerProgramsTools } from "@/tools/programs.js";

const server = new McpServer({ name: "anime-mcp", version: "1.0.0" });
registerWorksTools(server);
registerSeriesTools(server);
registerEpisodesTools(server);
registerPeopleTools(server);
registerOrganizationsTools(server);
registerStaffsTools(server);
registerProgramsTools(server);

/** MCP サーバーを stdio で起動する */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Anime MCP Server running on stdio");
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
