import { z } from "zod";
import { PER_PAGE, PAGE, IDS } from "./common.js";

/** シリーズ 1 件（GET /v1/series の series 要素） */
export interface AnnictSeries {
  id: number;
  name: string;
  name_ro?: string;
  name_en?: string;
}

/** GET /v1/series のレスポンス本体 */
export interface AnnictSeriesResponse {
  series: AnnictSeries[];
  total_count: number;
  next_page: number | null;
  prev_page: number | null;
}

/** search_series ツールの入力スキーマ（シリーズ名検索） */
export const SearchSeriesInputSchema = z.object({
  name: z.string().min(1).describe("Search by series name (e.g. ソードアート, Sword Art)"),
  per_page: PER_PAGE,
  page: PAGE,
  sort_id: z.enum(["asc", "desc"]).optional().default("desc").describe("Sort by ID"),
});
export type SearchSeriesInput = z.infer<typeof SearchSeriesInputSchema>;

/** get_series_by_ids ツールの入力スキーマ（シリーズID指定） */
export const GetSeriesByIdsInputSchema = z.object({
  ids: IDS.describe("Annict series IDs (e.g. [65])"),
});
export type GetSeriesByIdsInput = z.infer<typeof GetSeriesByIdsInputSchema>;
