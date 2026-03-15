import { z } from "zod";
import { PER_PAGE, PAGE, IDS } from "./common.js";

/** 団体 1 件（GET /v1/organizations の organizations 要素） */
export interface AnnictOrganization {
  id: number;
  name: string;
  name_kana?: string;
  name_en?: string;
  url?: string;
  url_en?: string;
  wikipedia_url?: string;
  wikipedia_url_en?: string;
  twitter_username?: string;
  twitter_username_en?: string;
  favorite_organizations_count?: number;
  staffs_count?: number;
}

/** GET /v1/organizations のレスポンス本体 */
export interface AnnictOrganizationsResponse {
  organizations: AnnictOrganization[];
  total_count: number;
  next_page: number | null;
  prev_page: number | null;
}

/** search_organizations ツールの入力スキーマ（名前検索） */
export const SearchOrganizationsInputSchema = z.object({
  name: z.string().min(1).describe("Search by organization name (e.g. 株式会社, P.A.WORKS)"),
  per_page: PER_PAGE,
  page: PAGE,
  sort_id: z.enum(["asc", "desc"]).optional().default("desc").describe("Sort by ID"),
});
export type SearchOrganizationsInput = z.infer<typeof SearchOrganizationsInputSchema>;

/** get_organizations_by_ids ツールの入力スキーマ（団体ID指定） */
export const GetOrganizationsByIdsInputSchema = z.object({
  ids: IDS.describe("Annict organization IDs (e.g. [3, 74])"),
});
export type GetOrganizationsByIdsInput = z.infer<typeof GetOrganizationsByIdsInputSchema>;
