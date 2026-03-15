import { getAnnictAccessToken, ANNICT_API_BASE } from "../config.js";
import type { AnnictWorksResponse, AnnictSeriesResponse } from "../types.js";

type ApiParams = Record<string, string | number | number[] | string[] | undefined>;

const buildParams = (params: ApiParams): URLSearchParams => {
  const search = new URLSearchParams();
  for (const [key, val] of Object.entries(params)) {
    if (val === undefined) continue;
    search.set(key, Array.isArray(val) ? val.join(",") : String(val));
  }
  return search;
};

const get = async <T>(path: string, params: ApiParams = {}): Promise<T> => {
  const search = buildParams({ access_token: getAnnictAccessToken(), per_page: 25, ...params });
  const res = await fetch(`${ANNICT_API_BASE}/${path}?${search}`, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Annict API error ${res.status}: ${await res.text()}`);
  return res.json() as Promise<T>;
};

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

export const fetchWorks = (params: FetchWorksParams = {}): Promise<AnnictWorksResponse> =>
  get<AnnictWorksResponse>("works", params);

export interface FetchSeriesParams extends ApiParams {
  filter_ids?: number[];
  filter_name?: string;
  page?: number;
  per_page?: number;
  sort_id?: "asc" | "desc";
  fields?: string[];
}

export const fetchSeries = (params: FetchSeriesParams = {}): Promise<AnnictSeriesResponse> =>
  get<AnnictSeriesResponse>("series", params);

export const seasonParam = (year: number, season: string): string => {
  const s = season.toLowerCase();
  return s === "all" ? `${year}-all` : `${year}-${s}`;
};
