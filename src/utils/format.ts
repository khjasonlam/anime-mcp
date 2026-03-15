import type { AnnictWork, AnnictSeries } from "../types/index.js";

const listToText = <T>(
  items: T[],
  total: number,
  format: (x: T) => string,
  emptyMsg: string
): string => {
  if (items.length === 0) return emptyMsg;
  const header = `全 ${total} 件中 ${items.length} 件を表示:\n`;
  const body = items.map((x, i) => `${i + 1}. ${format(x)}`).join("\n\n");
  return header + body;
};

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

export const worksToText = (works: AnnictWork[], totalCount: number): string =>
  listToText(works, totalCount, formatWork, "該当する作品はありませんでした。");

export const formatSeries = (s: AnnictSeries): string => {
  const parts = [`【${s.name}】`, s.name_ro && ` (${s.name_ro})`, s.name_en && ` / ${s.name_en}`, ` | ID: ${s.id}`];
  return parts.filter(Boolean).join("");
};

export const seriesToText = (series: AnnictSeries[], totalCount: number): string =>
  listToText(series, totalCount, formatSeries, "該当するシリーズはありませんでした。");
