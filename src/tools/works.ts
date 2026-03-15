import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fetchWorks, seasonParam } from "@/api/works.js";
import { SearchAnimeInputSchema, SearchAnimeBySeasonInputSchema, GetAnimeByIdsInputSchema } from "@/types/works.js";
import { worksToText } from "@/utils/format/works.js";
import { wrap } from "@/utils/result.js";

/** 作品検索用の MCP ツール（search_anime, search_anime_by_season, get_anime_by_ids）を登録する */
export const registerWorksTools = (server: McpServer) => {
  server.registerTool(
    "search_anime",
    {
      description: "Search anime by title (e.g. shirobako, しろばこ).",
      inputSchema: SearchAnimeInputSchema,
    },
    (args) =>
      wrap(async () => {
        const data = await fetchWorks({
          filter_title: args.title,
          per_page: args.per_page,
          ...(args.page && { page: args.page }),
        });
        return worksToText(data.works, data.total_count);
      }, "検索に失敗しました")
  );

  server.registerTool(
    "search_anime_by_season",
    {
      description: "Search anime by season (e.g. 2024 spring, 2016年秋).",
      inputSchema: SearchAnimeBySeasonInputSchema,
    },
    (args) =>
      wrap(async () => {
        const sortKey = args.sort.startsWith("season") ? "sort_season" : "sort_watchers_count";
        const sortVal = args.sort.endsWith("desc") ? "desc" : "asc";
        const data = await fetchWorks({
          filter_season: seasonParam(args.year, args.season),
          per_page: args.per_page,
          ...(args.page && { page: args.page }),
          [sortKey]: sortVal,
        });
        return worksToText(data.works, data.total_count);
      }, "検索に失敗しました")
  );

  server.registerTool(
    "get_anime_by_ids",
    {
      description: "Get anime works by Annict work IDs.",
      inputSchema: GetAnimeByIdsInputSchema,
    },
    (args) =>
      wrap(async () => {
        const data = await fetchWorks({
          filter_ids: args.ids,
          per_page: args.ids.length,
        });
        return worksToText(data.works, data.total_count);
      }, "取得に失敗しました")
  );
};
