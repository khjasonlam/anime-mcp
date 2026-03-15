import { z } from "zod";
import { PER_PAGE, PAGE, IDS } from "./common.js";
import type { AnnictWork } from "./works.js";
import type { AnnictPerson } from "./people.js";
import type { AnnictOrganization } from "./organizations.js";

/** スタッフ 1 件（GET /v1/staffs の staffs 要素） */
export interface AnnictStaff {
  id: number;
  name: string;
  name_en?: string;
  role_text?: string;
  role_other?: string;
  role_other_en?: string;
  sort_number?: number;
  work?: AnnictWork;
  person?: AnnictPerson | null;
  organization?: AnnictOrganization | null;
}

/** GET /v1/staffs のレスポンス本体 */
export interface AnnictStaffsResponse {
  staffs: AnnictStaff[];
  total_count: number;
  next_page: number | null;
  prev_page: number | null;
}

/** get_staffs_by_ids ツールの入力スキーマ（スタッフID指定） */
export const GetStaffsByIdsInputSchema = z.object({
  ids: IDS.describe("Annict staff IDs (e.g. [35319])"),
});
export type GetStaffsByIdsInput = z.infer<typeof GetStaffsByIdsInputSchema>;

/** get_staffs_by_work_id ツールの入力スキーマ（作品ID指定でスタッフ一覧） */
export const GetStaffsByWorkIdInputSchema = z.object({
  work_id: z.number().int().positive().describe("Annict work ID to list staff for"),
  per_page: PER_PAGE,
  page: PAGE,
  sort_sort_number: z
    .enum(["asc", "desc"])
    .optional()
    .default("asc")
    .describe("Sort by sort_number (asc = lower first)"),
});
export type GetStaffsByWorkIdInput = z.infer<typeof GetStaffsByWorkIdInputSchema>;
