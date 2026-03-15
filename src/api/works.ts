import { get } from "./client.js";
import type { FetchWorksParams } from "@/types/api.js";
import type { AnnictWorksResponse } from "@/types/works.js";

/** クール指定用の文字列を組み立てる（例: 2016-spring, 2024-all） */
export const seasonParam = (year: number, season: string): string => {
  const s = season.toLowerCase();
  return s === "all" ? `${year}-all` : `${year}-${s}`;
};

/** GET /v1/works で作品一覧を取得する */
export const fetchWorks = (params: FetchWorksParams = {}): Promise<AnnictWorksResponse> =>
  get<AnnictWorksResponse>("works", params);
