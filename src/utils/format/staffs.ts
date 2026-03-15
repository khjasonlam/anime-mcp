import type { AnnictStaff } from "@/types/staffs.js";
import { listToText } from "./common.js";

/** スタッフ 1 件を表示用テキストに整形する */
export const formatStaff = (s: AnnictStaff): string => {
  const who = s.person ? s.person.name : s.organization ? s.organization.name : s.name;
  const workTitle = s.work ? `（${s.work.title}）` : "";
  const lines = [
    `【${s.role_text ?? "スタッフ"}】${who} ${workTitle}`.trim(),
    `ID: ${s.id}${s.role_other ? ` | その他: ${s.role_other}` : ""}`,
  ];
  return lines.join("\n");
};

/** スタッフ一覧を「全 N 件中 M 件を表示」＋一覧テキストに整形する */
export const staffsToText = (staffs: AnnictStaff[], totalCount: number): string =>
  listToText(staffs, totalCount, formatStaff, "該当するスタッフはありませんでした。");
