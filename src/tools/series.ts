import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fetchSeries } from "@/api/series.js";
import { SearchSeriesInputSchema, GetSeriesByIdsInputSchema } from "@/types/series.js";
import { seriesToText } from "@/utils/format/series.js";
import { wrap } from "@/utils/result.js";

/** シリーズ検索用の MCP ツール（search_series, get_series_by_ids）を登録する */
export const registerSeriesTools = (server: McpServer) => {
  server.registerTool(
    "search_series",
    {
      description: "Search anime series by name (e.g. ソードアート, Sword Art).",
      inputSchema: SearchSeriesInputSchema,
    },
    (args) =>
      wrap(async () => {
        const data = await fetchSeries({
          filter_name: args.name,
          per_page: args.per_page,
          ...(args.page && { page: args.page }),
          sort_id: args.sort_id,
        });
        return seriesToText(data.series, data.total_count);
      }, "検索に失敗しました")
  );

  server.registerTool(
    "get_series_by_ids",
    {
      description: "Get anime series by Annict series IDs.",
      inputSchema: GetSeriesByIdsInputSchema,
    },
    (args) =>
      wrap(async () => {
        const data = await fetchSeries({
          filter_ids: args.ids,
          per_page: args.ids.length,
        });
        return seriesToText(data.series, data.total_count);
      }, "取得に失敗しました")
  );
};
