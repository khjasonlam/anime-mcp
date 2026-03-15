import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fetchPrograms } from "@/api/programs.js";
import { GetMyProgramsInputSchema } from "@/types/programs.js";
import { programsToText } from "@/utils/format/programs.js";
import { wrap } from "@/utils/result.js";

/** 放送予定取得用の MCP ツール（get_my_programs）を登録する */
export const registerProgramsTools = (server: McpServer) => {
  server.registerTool(
    "get_my_programs",
    {
      description:
        "Get the authenticated user's program schedule (broadcast times). Filter by work IDs, date range, unwatched, rebroadcast; sort by started_at. Requires ANNICT_ACCESS_TOKEN.",
      inputSchema: GetMyProgramsInputSchema,
    },
    (args) =>
      wrap(async () => {
        const data = await fetchPrograms({
          per_page: args.per_page,
          ...(args.page && { page: args.page }),
          ...(args.filter_work_ids && args.filter_work_ids.length > 0 && { filter_work_ids: args.filter_work_ids }),
          ...(args.filter_started_at_gt && { filter_started_at_gt: args.filter_started_at_gt }),
          ...(args.filter_started_at_lt && { filter_started_at_lt: args.filter_started_at_lt }),
          ...(args.filter_unwatched !== undefined && { filter_unwatched: args.filter_unwatched }),
          ...(args.filter_rebroadcast !== undefined && { filter_rebroadcast: args.filter_rebroadcast }),
          sort_started_at: args.sort_started_at,
        });
        return programsToText(data.programs, data.total_count);
      }, "取得に失敗しました")
  );
};
