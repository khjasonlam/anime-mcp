import { getAnnictAccessToken, ANNICT_API_BASE } from "@/config.js";
import type { ApiParams, FetchWorksParams, FetchSeriesParams } from "@/types/api.js";
import type { AnnictWorksResponse, AnnictSeriesResponse } from "@/types/index.js";

const buildParams = (params: ApiParams): URLSearchParams => {
  const search = new URLSearchParams();
  for (const [key, val] of Object.entries(params)) {
    if (val === undefined) continue;
    search.set(key, Array.isArray(val) ? val.join(",") : String(val));
  }
  return search;
};

const get = async <T>(path: string, params: ApiParams = {}): Promise<T> => {
  const search = buildParams({
    access_token: getAnnictAccessToken(),
    per_page: 25,
    ...params,
  });
  const res = await fetch(`${ANNICT_API_BASE}/${path}?${search}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Annict API error ${res.status}: ${await res.text()}`);
  return res.json() as Promise<T>;
};

export const fetchWorks = (params: FetchWorksParams = {}): Promise<AnnictWorksResponse> =>
  get<AnnictWorksResponse>("works", params);

export const fetchSeries = (params: FetchSeriesParams = {}): Promise<AnnictSeriesResponse> =>
  get<AnnictSeriesResponse>("series", params);

export const seasonParam = (year: number, season: string): string => {
  const s = season.toLowerCase();
  return s === "all" ? `${year}-all` : `${year}-${s}`;
};
