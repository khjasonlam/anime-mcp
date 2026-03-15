import type { AnnictOrganization } from "@/types/organizations.js";
import { listToText } from "./common.js";

/** 団体 1 件を表示用テキストに整形する */
export const formatOrganization = (o: AnnictOrganization): string => {
  const parts = [
    `【${o.name}】`,
    o.name_kana && ` (${o.name_kana})`,
    o.name_en && ` / ${o.name_en}`,
    ` | ID: ${o.id} | スタッフ登録作品数: ${o.staffs_count ?? 0}`,
  ];
  return parts.filter(Boolean).join("");
};

/** 団体一覧を「全 N 件中 M 件を表示」＋一覧テキストに整形する */
export const organizationsToText = (organizations: AnnictOrganization[], totalCount: number): string =>
  listToText(organizations, totalCount, formatOrganization, "該当する団体はありませんでした。");
