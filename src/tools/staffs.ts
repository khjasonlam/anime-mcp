import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fetchStaffs } from "@/api/staffs.js";
import {
  GetStaffsByIdsInputSchema,
  GetStaffsByWorkIdInputSchema,
} from "@/types/staffs.js";
import { staffsToText } from "@/utils/format/staffs.js";
import { wrap } from "@/utils/result.js";

/** スタッフ取得用の MCP ツール（get_staffs_by_ids, get_staffs_by_work_id）を登録する */
export const registerStaffsTools = (server: McpServer) => {
  server.registerTool(
    "get_staffs_by_ids",
    {
      description: "Get staff entries by Annict staff IDs.",
      inputSchema: GetStaffsByIdsInputSchema,
    },
    (args) =>
      wrap(async () => {
        const data = await fetchStaffs({
          filter_ids: args.ids,
          per_page: args.ids.length,
        });
        return staffsToText(data.staffs, data.total_count);
      }, "取得に失敗しました")
  );

  server.registerTool(
    "get_staffs_by_work_id",
    {
      description: "Get staff for an anime work by Annict work ID (e.g. directors, animation studio).",
      inputSchema: GetStaffsByWorkIdInputSchema,
    },
    (args) =>
      wrap(async () => {
        const data = await fetchStaffs({
          filter_work_id: args.work_id,
          per_page: args.per_page,
          ...(args.page && { page: args.page }),
          sort_sort_number: args.sort_sort_number,
        });
        return staffsToText(data.staffs, data.total_count);
      }, "取得に失敗しました")
  );
};
