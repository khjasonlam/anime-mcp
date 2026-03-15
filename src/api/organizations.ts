import { get } from "./client.js";
import type { FetchOrganizationsParams } from "@/types/api.js";
import type { AnnictOrganizationsResponse } from "@/types/organizations.js";

/** GET /v1/organizations で団体一覧を取得する */
export const fetchOrganizations = (params: FetchOrganizationsParams = {}): Promise<AnnictOrganizationsResponse> =>
  get<AnnictOrganizationsResponse>("organizations", params);
