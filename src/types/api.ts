/**
 * Annict API request params (query string building)
 * @see https://developers.annict.com/docs/rest-api/v1/works
 * @see https://developers.annict.com/docs/rest-api/v1/series
 * @see https://developers.annict.com/docs/rest-api/v1/episodes
 */

/** クエリ文字列組み立て用のパラメータ型（undefined は除外して付与） */
export type ApiParams = Record<string, string | number | number[] | string[] | boolean | undefined>;

/** GET /v1/works のクエリパラメータ */
export interface FetchWorksParams extends ApiParams {
  filter_title?: string;
  filter_season?: string;
  filter_ids?: number[];
  page?: number;
  per_page?: number;
  sort_id?: "asc" | "desc";
  sort_season?: "asc" | "desc";
  sort_watchers_count?: "asc" | "desc";
  fields?: string[];
}

/** GET /v1/series のクエリパラメータ */
export interface FetchSeriesParams extends ApiParams {
  filter_ids?: number[];
  filter_name?: string;
  page?: number;
  per_page?: number;
  sort_id?: "asc" | "desc";
  fields?: string[];
}

/** GET /v1/episodes のクエリパラメータ */
export interface FetchEpisodesParams extends ApiParams {
  filter_ids?: number[];
  filter_work_id?: number;
  page?: number;
  per_page?: number;
  sort_id?: "asc" | "desc";
  sort_sort_number?: "asc" | "desc";
  fields?: string[];
}

/** GET /v1/people のクエリパラメータ */
export interface FetchPeopleParams extends ApiParams {
  filter_ids?: number[];
  filter_name?: string;
  page?: number;
  per_page?: number;
  sort_id?: "asc" | "desc";
  fields?: string[];
}

/** GET /v1/organizations のクエリパラメータ */
export interface FetchOrganizationsParams extends ApiParams {
  filter_ids?: number[];
  filter_name?: string;
  page?: number;
  per_page?: number;
  sort_id?: "asc" | "desc";
  fields?: string[];
}

/** GET /v1/staffs のクエリパラメータ */
export interface FetchStaffsParams extends ApiParams {
  filter_ids?: number[];
  filter_work_id?: number;
  page?: number;
  per_page?: number;
  sort_id?: "asc" | "desc";
  sort_sort_number?: "asc" | "desc";
  fields?: string[];
}

/** GET /v1/me/programs のクエリパラメータ */
export interface FetchProgramsParams extends ApiParams {
  filter_ids?: number[];
  filter_channel_ids?: number[];
  filter_work_ids?: number[];
  filter_started_at_gt?: string;
  filter_started_at_lt?: string;
  filter_unwatched?: boolean;
  filter_rebroadcast?: boolean;
  page?: number;
  per_page?: number;
  sort_id?: "asc" | "desc";
  sort_started_at?: "asc" | "desc";
  fields?: string[];
}
