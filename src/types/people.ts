import { z } from "zod";
import { PER_PAGE, PAGE, IDS } from "./common.js";

/** 人物の出身地（GET /v1/people の prefecture） */
export interface AnnictPrefecture {
  id: number;
  name: string;
}

/** 人物 1 件（GET /v1/people の people 要素） */
export interface AnnictPerson {
  id: number;
  name: string;
  name_kana?: string;
  name_en?: string;
  nickname?: string;
  nickname_en?: string;
  gender_text?: string;
  url?: string;
  url_en?: string;
  wikipedia_url?: string;
  wikipedia_url_en?: string;
  twitter_username?: string;
  twitter_username_en?: string;
  birthday?: string;
  blood_type?: string;
  height?: number;
  favorite_people_count?: number;
  casts_count?: number;
  staffs_count?: number;
  prefecture?: AnnictPrefecture;
}

/** GET /v1/people のレスポンス本体 */
export interface AnnictPeopleResponse {
  people: AnnictPerson[];
  total_count: number;
  next_page: number | null;
  prev_page: number | null;
}

/** search_people ツールの入力スキーマ（名前検索） */
export const SearchPeopleInputSchema = z.object({
  name: z.string().min(1).describe("Search by person name (e.g. 井上, 水瀬いのり)"),
  per_page: PER_PAGE,
  page: PAGE,
  sort_id: z.enum(["asc", "desc"]).optional().default("desc").describe("Sort by ID"),
});
export type SearchPeopleInput = z.infer<typeof SearchPeopleInputSchema>;

/** get_people_by_ids ツールの入力スキーマ（人物ID指定） */
export const GetPeopleByIdsInputSchema = z.object({
  ids: IDS.describe("Annict person IDs (e.g. [7118])"),
});
export type GetPeopleByIdsInput = z.infer<typeof GetPeopleByIdsInputSchema>;
