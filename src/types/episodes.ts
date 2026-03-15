import { z } from "zod";
import { PER_PAGE, PAGE, IDS } from "./common.js";
import type { AnnictWork } from "./works.js";

/** エピソードの前後参照（prev_episode / next_episode 用の簡易型） */
export interface AnnictEpisodeRef {
  id: number;
  number?: number | null;
  number_text?: string;
  sort_number?: number;
  title?: string;
  records_count?: number;
  record_comments_count?: number;
}

/** エピソード 1 件（GET /v1/episodes の episode 要素） */
export interface AnnictEpisode {
  id: number;
  number?: number | null;
  number_text?: string;
  sort_number?: number;
  title?: string;
  records_count?: number;
  record_comments_count?: number;
  work?: AnnictWork;
  prev_episode?: AnnictEpisodeRef | null;
  next_episode?: AnnictEpisodeRef | null;
}

/** GET /v1/episodes のレスポンス本体 */
export interface AnnictEpisodesResponse {
  episodes: AnnictEpisode[];
  total_count: number;
  next_page: number | null;
  prev_page: number | null;
}

/** get_episodes_by_work_id ツールの入力スキーマ（作品ID指定でエピソード一覧） */
export const GetEpisodesByWorkIdInputSchema = z.object({
  work_id: z.number().int().positive().describe("Annict work ID to list episodes for"),
  per_page: PER_PAGE,
  page: PAGE,
  sort_sort_number: z
    .enum(["asc", "desc"])
    .optional()
    .default("asc")
    .describe("Sort by episode order (asc = 1st first)"),
});
export type GetEpisodesByWorkIdInput = z.infer<typeof GetEpisodesByWorkIdInputSchema>;

/** get_episodes_by_ids ツールの入力スキーマ（エピソードID指定） */
export const GetEpisodesByIdsInputSchema = z.object({
  ids: IDS.describe("Annict episode IDs (e.g. [45, 46])"),
});
export type GetEpisodesByIdsInput = z.infer<typeof GetEpisodesByIdsInputSchema>;
