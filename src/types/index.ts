import { z } from "zod";

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

// --- Common schemas ---

/** クール名（春・夏・秋・冬・通年）の Zod enum */
export const SeasonName = z.enum(["spring", "summer", "autumn", "winter", "all"]);
export type SeasonName = z.infer<typeof SeasonName>;

/** 作品一覧のソート指定の Zod enum */
export const SeasonSort = z.enum(["watchers_desc", "watchers_asc", "season_desc", "season_asc"]);
export type SeasonSort = z.infer<typeof SeasonSort>;

/** 1 ページあたりの件数（1〜50、デフォルト 25） */
const PER_PAGE = z.number().min(1).max(50).optional().default(25).describe("Results per page (max 50)");
/** ページ番号（1 以上） */
const PAGE = z.number().min(1).optional().describe("Page number");
/** 作品ID または シリーズID の配列（1〜50 件） */
const IDS = z.array(z.number().int().positive()).min(1).max(50);

// --- Tool input schemas ---

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

/** get_episodes_by_work_id ツールの入力スキーマ（作品ID指定でエピソード一覧） */
export const GetEpisodesByWorkIdInputSchema = z.object({
  work_id: z.number().int().positive().describe("Annict work ID to list episodes for"),
  per_page: PER_PAGE,
  page: PAGE,
  sort_sort_number: z.enum(["asc", "desc"]).optional().default("asc").describe("Sort by episode order (asc = 1st first)"),
});
export type GetEpisodesByWorkIdInput = z.infer<typeof GetEpisodesByWorkIdInputSchema>;

/** get_episodes_by_ids ツールの入力スキーマ（エピソードID指定） */
export const GetEpisodesByIdsInputSchema = z.object({
  ids: IDS.describe("Annict episode IDs (e.g. [45, 46])"),
});
export type GetEpisodesByIdsInput = z.infer<typeof GetEpisodesByIdsInputSchema>;
