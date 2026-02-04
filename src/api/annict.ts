import { getAnnictAccessToken, ANNICT_API_BASE } from "../config.js";
import type { AnnictWorksResponse } from "../types.js";

export interface FetchWorksParams {
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

export async function fetchWorks(
  params: FetchWorksParams = {}
): Promise<AnnictWorksResponse> {
  const token = getAnnictAccessToken();
  const searchParams = new URLSearchParams({
    access_token: token,
    per_page: String(params.per_page ?? 25),
  });

  if (params.filter_title) {
    searchParams.set("filter_title", params.filter_title);
  }
  if (params.filter_season) {
    searchParams.set("filter_season", params.filter_season);
  }
  if (params.filter_ids?.length) {
    searchParams.set("filter_ids", params.filter_ids.join(","));
  }
  if (params.page) {
    searchParams.set("page", String(params.page));
  }
  if (params.sort_id) {
    searchParams.set("sort_id", params.sort_id);
  }
  if (params.sort_season) {
    searchParams.set("sort_season", params.sort_season);
  }
  if (params.sort_watchers_count) {
    searchParams.set("sort_watchers_count", params.sort_watchers_count);
  }
  if (params.fields?.length) {
    searchParams.set("fields", params.fields.join(","));
  }

  const url = `${ANNICT_API_BASE}/works?${searchParams.toString()}`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Annict API error ${res.status}: ${text}`);
  }

  return (await res.json()) as AnnictWorksResponse;
}

/**
 * Build season filter string. e.g. 2016-spring, 2024-all
 */
export function seasonParam(year: number, season: string): string {
  const s = season.toLowerCase();
  if (s === "all") return `${year}-all`;
  if (["spring", "summer", "autumn", "winter"].includes(s)) {
    return `${year}-${s}`;
  }
  return `${year}-${season}`;
}
