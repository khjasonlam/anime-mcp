import { z } from "zod";
import { PER_PAGE, PAGE, IDS, SeasonName, SeasonSort } from "./common.js";

/** 作品の画像URL情報（GET /v1/works の images フィールド） */
export interface AnnictWorkImages {
  recommended_url?: string;
  facebook?: { og_image_url?: string };
  twitter?: {
    mini_avatar_url?: string;
    normal_avatar_url?: string;
    bigger_avatar_url?: string;
    original_avatar_url?: string;
    image_url?: string;
  };
}

/** 作品 1 件（GET /v1/works の work 要素） */
export interface AnnictWork {
  id: number;
  title: string;
  title_kana?: string;
  media: string;
  media_text: string;
  season_name?: string;
  season_name_text?: string;
  released_on?: string;
  released_on_about?: string;
  official_site_url?: string;
  wikipedia_url?: string;
  twitter_username?: string;
  twitter_hashtag?: string;
  syobocal_tid?: string;
  mal_anime_id?: string;
  images?: AnnictWorkImages;
  episodes_count?: number;
  watchers_count?: number;
  reviews_count?: number;
  no_episodes?: boolean;
}

/** GET /v1/works のレスポンス本体 */
export interface AnnictWorksResponse {
  works: AnnictWork[];
  total_count: number;
  next_page: number | null;
  prev_page: number | null;
}

/** search_anime ツールの入力スキーマ（タイトル検索） */
export const SearchAnimeInputSchema = z.object({
  title: z.string().min(1).describe("Search by title (e.g. shirobako, しろばこ)"),
  per_page: PER_PAGE,
  page: PAGE,
});
export type SearchAnimeInput = z.infer<typeof SearchAnimeInputSchema>;

/** search_anime_by_season ツールの入力スキーマ（クール検索） */
export const SearchAnimeBySeasonInputSchema = z.object({
  year: z.number().int().min(2000).max(2030).describe("Year (e.g. 2024)"),
  season: SeasonName.describe("Season: spring, summer, autumn, winter, or all"),
  per_page: PER_PAGE,
  page: PAGE,
  sort: SeasonSort.optional().default("watchers_desc").describe("Sort order"),
});
export type SearchAnimeBySeasonInput = z.infer<typeof SearchAnimeBySeasonInputSchema>;

/** get_anime_by_ids ツールの入力スキーマ（作品ID指定） */
export const GetAnimeByIdsInputSchema = z.object({
  ids: IDS.describe("Annict work IDs (e.g. [4168, 4681])"),
});
export type GetAnimeByIdsInput = z.infer<typeof GetAnimeByIdsInputSchema>;
