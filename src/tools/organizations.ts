import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fetchOrganizations } from "@/api/organizations.js";
import { SearchOrganizationsInputSchema, GetOrganizationsByIdsInputSchema } from "@/types/organizations.js";
import { organizationsToText } from "@/utils/format/organizations.js";
import { wrap } from "@/utils/result.js";

/** 団体検索用の MCP ツール（search_organizations, get_organizations_by_ids）を登録する */
export const registerOrganizationsTools = (server: McpServer) => {
  server.registerTool(
    "search_organizations",
    {
      description: "Search organizations (studios, etc.) by name (e.g. 株式会社, P.A.WORKS).",
      inputSchema: SearchOrganizationsInputSchema,
    },
    (args) =>
      wrap(async () => {
        const data = await fetchOrganizations({
          filter_name: args.name,
          per_page: args.per_page,
          ...(args.page && { page: args.page }),
          sort_id: args.sort_id,
        });
        return organizationsToText(data.organizations, data.total_count);
      }, "検索に失敗しました")
  );

  server.registerTool(
    "get_organizations_by_ids",
    {
      description: "Get organizations by Annict organization IDs.",
      inputSchema: GetOrganizationsByIdsInputSchema,
    },
    (args) =>
      wrap(async () => {
        const data = await fetchOrganizations({
          filter_ids: args.ids,
          per_page: args.ids.length,
        });
        return organizationsToText(data.organizations, data.total_count);
      }, "取得に失敗しました")
  );
};
