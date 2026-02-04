import type { AnnictWork } from "../types.js";

export function formatWork(w: AnnictWork): string {
  const lines = [
    `【${w.title}】${w.title_kana ? ` (${w.title_kana})` : ""}`,
    `ID: ${w.id} | ${w.media_text} | ${w.season_name_text ?? "-"} | 話数: ${w.episodes_count ?? "-"} | ウォッチャー: ${w.watchers_count ?? "-"}`,
    ...(w.released_on ? [`放送日: ${w.released_on}`] : []),
    ...(w.official_site_url ? [`公式: ${w.official_site_url}`] : []),
    ...(w.images?.recommended_url ? [`画像: ${w.images.recommended_url}`] : []),
  ];
  return lines.filter(Boolean).join("\n");
}

export function worksToText(works: AnnictWork[], totalCount: number): string {
  if (works.length === 0) {
    return "該当する作品はありませんでした。";
  }
  const header = `全 ${totalCount} 件中 ${works.length} 件を表示:\n`;
  const body = works.map((w, i) => `${i + 1}. ${formatWork(w)}`).join("\n\n");
  return header + body;
}
