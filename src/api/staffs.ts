import { get } from "./client.js";
import type { FetchStaffsParams } from "@/types/api.js";
import type { AnnictStaffsResponse } from "@/types/staffs.js";

/** GET /v1/staffs でスタッフ一覧を取得する */
export const fetchStaffs = (params: FetchStaffsParams = {}): Promise<AnnictStaffsResponse> =>
  get<AnnictStaffsResponse>("staffs", params);
