import type { AnnictWork } from "@/types/works.js";
import { listToText } from "./common.js";

/** 作品 1 件を表示用テキストに整形する */
export const formatWork = (w: AnnictWork): string => {
  const lines = [
    `【${w.title}】${w.title_kana ? ` (${w.title_kana})` : ""}`,
    `ID: ${w.id} | ${w.media_text} | ${w.season_name_text ?? "-"} | 話数: ${w.episodes_count ?? "-"} | ウォッチャー: ${w.watchers_count ?? "-"}`,
    ...(w.released_on ? [`放送日: ${w.released_on}`] : []),
    ...(w.official_site_url ? [`公式: ${w.official_site_url}`] : []),
    ...(w.images?.recommended_url ? [`画像: ${w.images.recommended_url}`] : []),
  ];
  return lines.filter(Boolean).join("\n");
};

/** 作品一覧を「全 N 件中 M 件を表示」＋一覧テキストに整形する */
export const worksToText = (works: AnnictWork[], totalCount: number): string =>
  listToText(works, totalCount, formatWork, "該当する作品はありませんでした。");
