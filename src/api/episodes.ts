import { get } from "./client.js";
import type { FetchEpisodesParams } from "@/types/api.js";
import type { AnnictEpisodesResponse } from "@/types/episodes.js";

/** GET /v1/episodes でエピソード一覧を取得する */
export const fetchEpisodes = (params: FetchEpisodesParams = {}): Promise<AnnictEpisodesResponse> =>
  get<AnnictEpisodesResponse>("episodes", params);
