import { get } from "./client.js";
import type { FetchProgramsParams } from "@/types/api.js";
import type { AnnictProgramsResponse } from "@/types/programs.js";

/** GET /v1/me/programs で自分の放送予定を取得する */
export const fetchPrograms = (params: FetchProgramsParams = {}): Promise<AnnictProgramsResponse> =>
  get<AnnictProgramsResponse>("me/programs", params);
