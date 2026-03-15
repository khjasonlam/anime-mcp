/**
 * Annict API request params (query string building)
 * @see https://developers.annict.com/docs/rest-api/v1/works
 * @see https://developers.annict.com/docs/rest-api/v1/series
 */

/** クエリ文字列組み立て用のパラメータ型（undefined は除外して付与） */
export type ApiParams = Record<string, string | number | number[] | string[] | undefined>;

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
