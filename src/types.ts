/**
 * Annict API GET /v1/works response types & MCP tool input schemas (Zod)
 * @see https://developers.annict.com/docs/rest-api/v1/works
 */
import { z } from "zod";

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

export const SeasonName = z.enum(["spring", "summer", "autumn", "winter", "all"]);
export type SeasonName = z.infer<typeof SeasonName>;

const PER_PAGE_MAX = 50;
const PER_PAGE_DEFAULT = 25;

export const PerPageSchema = z
  .number()
  .min(1)
  .max(PER_PAGE_MAX)
  .optional()
  .default(PER_PAGE_DEFAULT)
  .describe(`Number of results per page (max ${PER_PAGE_MAX})`);
export const PageSchema = z.number().min(1).optional().describe("Page number");

export const SeasonSort = z.enum([
  "watchers_desc",
  "watchers_asc",
  "season_desc",
  "season_asc",
]);
export type SeasonSort = z.infer<typeof SeasonSort>;

/** search_anime: タイトルでアニメを検索 */
export const SearchAnimeInputSchema = z.object({
  title: z
    .string()
    .min(1)
    .describe("Search query (title or part of title, e.g. shirobako, しろばこ)"),
  per_page: PerPageSchema,
  page: PageSchema,
});
export type SearchAnimeInput = z.infer<typeof SearchAnimeInputSchema>;

/** search_anime_by_season: クール（季節・年）で検索 */
export const SearchAnimeBySeasonInputSchema = z.object({
  year: z.number().int().min(2000).max(2030).describe("Year (e.g. 2024)"),
  season: SeasonName.describe(
    "Season: spring, summer, autumn, winter, or all for the whole year"
  ),
  per_page: PerPageSchema,
  page: PageSchema,
  sort: SeasonSort.optional()
    .default("watchers_desc")
    .describe("Sort order"),
});
export type SearchAnimeBySeasonInput = z.infer<
  typeof SearchAnimeBySeasonInputSchema
>;

/** get_anime_by_ids: 作品IDで取得 */
export const GetAnimeByIdsInputSchema = z.object({
  ids: z
  .array(z.number().int().positive())
  .min(1)
  .max(50)
  .describe("List of Annict work IDs (e.g. [4168, 4681])"),
});
export type GetAnimeByIdsInput = z.infer<typeof GetAnimeByIdsInputSchema>;
