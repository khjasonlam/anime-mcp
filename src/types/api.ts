/**
 * Annict API request params (query string building)
 * @see https://developers.annict.com/docs/rest-api/v1/works
 * @see https://developers.annict.com/docs/rest-api/v1/series
 */

export type ApiParams = Record<string, string | number | number[] | string[] | undefined>;

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

export interface FetchSeriesParams extends ApiParams {
  filter_ids?: number[];
  filter_name?: string;
  page?: number;
  per_page?: number;
  sort_id?: "asc" | "desc";
  fields?: string[];
}
