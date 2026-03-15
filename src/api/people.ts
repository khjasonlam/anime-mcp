import { get } from "./client.js";
import type { FetchPeopleParams } from "@/types/api.js";
import type { AnnictPeopleResponse } from "@/types/people.js";

/** GET /v1/people で人物一覧を取得する */
export const fetchPeople = (params: FetchPeopleParams = {}): Promise<AnnictPeopleResponse> =>
  get<AnnictPeopleResponse>("people", params);
