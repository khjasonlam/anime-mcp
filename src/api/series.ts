import { get } from "./client.js";
import type { FetchSeriesParams } from "@/types/api.js";
import type { AnnictSeriesResponse } from "@/types/series.js";

/** GET /v1/series でシリーズ一覧を取得する */
export const fetchSeries = (params: FetchSeriesParams = {}): Promise<AnnictSeriesResponse> =>
  get<AnnictSeriesResponse>("series", params);
