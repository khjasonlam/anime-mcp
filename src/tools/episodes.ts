import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fetchEpisodes } from "@/api/episodes.js";
import {
  GetEpisodesByWorkIdInputSchema,
  GetEpisodesByIdsInputSchema,
} from "@/types/episodes.js";
import { episodesToText } from "@/utils/format/episodes.js";
import { wrap } from "@/utils/result.js";

/** エピソード取得用の MCP ツール（get_episodes_by_work_id, get_episodes_by_ids）を登録する */
export const registerEpisodesTools = (server: McpServer) => {
  server.registerTool(
    "get_episodes_by_work_id",
    {
      description: "Get episodes for an anime work by Annict work ID (e.g. list all episodes of a series).",
      inputSchema: GetEpisodesByWorkIdInputSchema,
    },
    (args) =>
      wrap(async () => {
        const data = await fetchEpisodes({
          filter_work_id: args.work_id,
          per_page: args.per_page,
          ...(args.page && { page: args.page }),
          sort_sort_number: args.sort_sort_number,
        });
        return episodesToText(data.episodes, data.total_count);
      }, "取得に失敗しました")
  );

  server.registerTool(
    "get_episodes_by_ids",
    {
      description: "Get episode details by Annict episode IDs.",
      inputSchema: GetEpisodesByIdsInputSchema,
    },
    (args) =>
      wrap(async () => {
        const data = await fetchEpisodes({
          filter_ids: args.ids,
          per_page: args.ids.length,
        });
        return episodesToText(data.episodes, data.total_count);
      }, "取得に失敗しました")
  );
};
