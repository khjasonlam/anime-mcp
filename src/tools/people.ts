import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fetchPeople } from "@/api/people.js";
import { SearchPeopleInputSchema, GetPeopleByIdsInputSchema } from "@/types/people.js";
import { peopleToText } from "@/utils/format/people.js";
import { wrap } from "@/utils/result.js";

/** 人物検索用の MCP ツール（search_people, get_people_by_ids）を登録する */
export const registerPeopleTools = (server: McpServer) => {
  server.registerTool(
    "search_people",
    {
      description: "Search people (voice actors, staff, etc.) by name (e.g. 井上, 水瀬いのり).",
      inputSchema: SearchPeopleInputSchema,
    },
    (args) =>
      wrap(async () => {
        const data = await fetchPeople({
          filter_name: args.name,
          per_page: args.per_page,
          ...(args.page && { page: args.page }),
          sort_id: args.sort_id,
        });
        return peopleToText(data.people, data.total_count);
      }, "検索に失敗しました")
  );

  server.registerTool(
    "get_people_by_ids",
    {
      description: "Get people by Annict person IDs.",
      inputSchema: GetPeopleByIdsInputSchema,
    },
    (args) =>
      wrap(async () => {
        const data = await fetchPeople({
          filter_ids: args.ids,
          per_page: args.ids.length,
        });
        return peopleToText(data.people, data.total_count);
      }, "取得に失敗しました")
  );
};
