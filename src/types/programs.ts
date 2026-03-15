import { z } from "zod";
import { PER_PAGE, PAGE } from "./common.js";
import type { AnnictWork } from "./works.js";
import type { AnnictEpisode } from "./episodes.js";

/** 放送予定のチャンネル情報 */
export interface AnnictChannel {
  id: number;
  name: string;
}

/** 放送予定 1 件（GET /v1/me/programs の programs 要素） */
export interface AnnictProgram {
  id: number;
  started_at: string;
  is_rebroadcast: boolean;
  channel?: AnnictChannel;
  work?: AnnictWork;
  episode?: AnnictEpisode;
}

/** GET /v1/me/programs のレスポンス本体 */
export interface AnnictProgramsResponse {
  programs: AnnictProgram[];
  total_count: number;
  next_page: number | null;
  prev_page: number | null;
}

/** get_my_programs ツールの入力スキーマ（自分の放送予定） */
export const GetMyProgramsInputSchema = z.object({
  per_page: PER_PAGE,
  page: PAGE,
  filter_work_ids: z
    .array(z.number().int().positive())
    .optional()
    .describe("Filter by work IDs"),
  filter_started_at_gt: z
    .string()
    .optional()
    .describe("UTC datetime, e.g. 2016/05/06 21:10 (programs after this)"),
  filter_started_at_lt: z
    .string()
    .optional()
    .describe("UTC datetime, e.g. 2016/05/06 21:10 (programs before this)"),
  filter_unwatched: z.boolean().optional().describe("Only unwatched programs"),
  filter_rebroadcast: z.boolean().optional().describe("true = only rebroadcasts, false = exclude rebroadcasts"),
  sort_started_at: z
    .enum(["asc", "desc"])
    .optional()
    .default("desc")
    .describe("Sort by started_at"),
});
export type GetMyProgramsInput = z.infer<typeof GetMyProgramsInputSchema>;
