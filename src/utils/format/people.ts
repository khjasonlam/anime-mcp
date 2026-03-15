import type { AnnictPerson } from "@/types/people.js";
import { listToText } from "./common.js";

/** 人物 1 件を表示用テキストに整形する */
export const formatPerson = (p: AnnictPerson): string => {
  const lines = [
    `【${p.name}】${p.name_kana ? ` (${p.name_kana})` : ""}${p.name_en ? ` / ${p.name_en}` : ""}`,
    `ID: ${p.id} | ${p.gender_text ?? "-"} | キャスト: ${p.casts_count ?? 0} | スタッフ: ${p.staffs_count ?? 0}`,
    ...(p.nickname ? [`ニックネーム: ${p.nickname}`] : []),
    ...(p.birthday ? [`誕生日: ${p.birthday}`] : []),
    ...(p.prefecture ? [`出身: ${p.prefecture.name}`] : []),
    ...(p.twitter_username ? [`Twitter: @${p.twitter_username}`] : []),
    ...(p.wikipedia_url ? [`Wikipedia: ${p.wikipedia_url}`] : []),
  ];
  return lines.filter(Boolean).join("\n");
};

/** 人物一覧を「全 N 件中 M 件を表示」＋一覧テキストに整形する */
export const peopleToText = (people: AnnictPerson[], totalCount: number): string =>
  listToText(people, totalCount, formatPerson, "該当する人物はありませんでした。");
