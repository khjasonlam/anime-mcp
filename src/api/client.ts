import { getAnnictAccessToken, ANNICT_API_BASE } from "@/config.js";
import type { ApiParams } from "@/types/api.js";

/** クエリ用オブジェクトを URLSearchParams に変換する（配列はカンマ区切り） */
export const buildParams = (params: ApiParams): URLSearchParams => {
  const search = new URLSearchParams();
  for (const [key, val] of Object.entries(params)) {
    if (val === undefined) continue;
    search.set(key, Array.isArray(val) ? val.join(",") : String(val));
  }
  return search;
};

/** Annict API の指定パスに GET でリクエストし、JSON を返す */
export const get = async <T>(path: string, params: ApiParams = {}): Promise<T> => {
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
