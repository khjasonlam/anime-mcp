import { getAnnictAccessToken, ANNICT_API_BASE } from "@/config.js";
import type { ApiParams, FetchWorksParams, FetchSeriesParams } from "@/types/api.js";
import type { AnnictWorksResponse, AnnictSeriesResponse } from "@/types/index.js";

/** クエリ用オブジェクトを URLSearchParams に変換する（配列はカンマ区切り） */
const buildParams = (params: ApiParams): URLSearchParams => {
  const search = new URLSearchParams();
  for (const [key, val] of Object.entries(params)) {
    if (val === undefined) continue;
    search.set(key, Array.isArray(val) ? val.join(",") : String(val));
  }
  return search;
};

/** Annict API の指定パスに GET でリクエストし、JSON を返す */
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

/** GET /v1/works で作品一覧を取得する */
export const fetchWorks = (params: FetchWorksParams = {}): Promise<AnnictWorksResponse> =>
  get<AnnictWorksResponse>("works", params);

/** GET /v1/series でシリーズ一覧を取得する */
export const fetchSeries = (params: FetchSeriesParams = {}): Promise<AnnictSeriesResponse> =>
  get<AnnictSeriesResponse>("series", params);

/** クール指定用の文字列を組み立てる（例: 2016-spring, 2024-all） */
export const seasonParam = (year: number, season: string): string => {
  const s = season.toLowerCase();
  return s === "all" ? `${year}-all` : `${year}-${s}`;
};
