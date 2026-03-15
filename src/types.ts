/**
 * Annict API types & MCP tool input schemas (Zod)
 * @see https://developers.annict.com/docs/rest-api/v1/works
 * @see https://developers.annict.com/docs/rest-api/v1/series
 */
import { z } from "zod";

// --- API response types ---

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

export interface AnnictWorksResponse {
  works: AnnictWork[];
  total_count: number;
  next_page: number | null;
  prev_page: number | null;
}

export interface AnnictSeries {
  id: number;
  name: string;
  name_ro?: string;
  name_en?: string;
}

export interface AnnictSeriesResponse {
  series: AnnictSeries[];
  total_count: number;
  next_page: number | null;
  prev_page: number | null;
}

// --- Common schemas ---

export const SeasonName = z.enum(["spring", "summer", "autumn", "winter", "all"]);
export type SeasonName = z.infer<typeof SeasonName>;

export const SeasonSort = z.enum(["watchers_desc", "watchers_asc", "season_desc", "season_asc"]);
export type SeasonSort = z.infer<typeof SeasonSort>;

const PER_PAGE = z.number().min(1).max(50).optional().default(25).describe("Results per page (max 50)");
const PAGE = z.number().min(1).optional().describe("Page number");
const IDS = z.array(z.number().int().positive()).min(1).max(50);

// --- Tool input schemas ---

export const SearchAnimeInputSchema = z.object({
  title: z.string().min(1).describe("Search by title (e.g. shirobako, しろばこ)"),
  per_page: PER_PAGE,
  page: PAGE,
});
export type SearchAnimeInput = z.infer<typeof SearchAnimeInputSchema>;

export const SearchAnimeBySeasonInputSchema = z.object({
  year: z.number().int().min(2000).max(2030).describe("Year (e.g. 2024)"),
  season: SeasonName.describe("Season: spring, summer, autumn, winter, or all"),
  per_page: PER_PAGE,
  page: PAGE,
  sort: SeasonSort.optional().default("watchers_desc").describe("Sort order"),
});
export type SearchAnimeBySeasonInput = z.infer<typeof SearchAnimeBySeasonInputSchema>;

export const GetAnimeByIdsInputSchema = z.object({
  ids: IDS.describe("Annict work IDs (e.g. [4168, 4681])"),
});
export type GetAnimeByIdsInput = z.infer<typeof GetAnimeByIdsInputSchema>;

export const SearchSeriesInputSchema = z.object({
  name: z.string().min(1).describe("Search by series name (e.g. ソードアート, Sword Art)"),
  per_page: PER_PAGE,
  page: PAGE,
  sort_id: z.enum(["asc", "desc"]).optional().default("desc").describe("Sort by ID"),
});
export type SearchSeriesInput = z.infer<typeof SearchSeriesInputSchema>;

export const GetSeriesByIdsInputSchema = z.object({
  ids: IDS.describe("Annict series IDs (e.g. [65])"),
});
export type GetSeriesByIdsInput = z.infer<typeof GetSeriesByIdsInputSchema>;
