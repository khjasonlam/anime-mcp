import type { AnnictWork } from "@/types/works.js";
import type { AnnictSeries } from "@/types/series.js";
import type { AnnictEpisode } from "@/types/episodes.js";

/** 配列を「全 N 件中 M 件を表示」形式のテキストに整形する（0 件の場合は emptyMsg） */
const listToText = <T>(items: T[], total: number, format: (x: T) => string, emptyMsg: string): string => {
  if (items.length === 0) return emptyMsg;
  const header = `全 ${total} 件中 ${items.length} 件を表示:\n`;
  const body = items.map((x, i) => `${i + 1}. ${format(x)}`).join("\n\n");
  return header + body;
};

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

/** シリーズ 1 件を表示用テキストに整形する */
export const formatSeries = (s: AnnictSeries): string => {
  const parts = [`【${s.name}】`, s.name_ro && ` (${s.name_ro})`, s.name_en && ` / ${s.name_en}`, ` | ID: ${s.id}`];
  return parts.filter(Boolean).join("");
};

/** シリーズ一覧を「全 N 件中 M 件を表示」＋一覧テキストに整形する */
export const seriesToText = (series: AnnictSeries[], totalCount: number): string =>
  listToText(series, totalCount, formatSeries, "該当するシリーズはありませんでした。");

/** エピソード 1 件を表示用テキストに整形する */
export const formatEpisode = (e: AnnictEpisode): string => {
  const workTitle = e.work ? `（${e.work.title}）` : "";
  const lines = [
    `【${e.number_text ?? `#${e.id}`}】${e.title ?? ""} ${workTitle}`.trim(),
    `ID: ${e.id} | 記録: ${e.records_count ?? 0} | 感想付き: ${e.record_comments_count ?? 0}`,
  ];
  return lines.join("\n");
};

/** エピソード一覧を「全 N 件中 M 件を表示」＋一覧テキストに整形する */
export const episodesToText = (episodes: AnnictEpisode[], totalCount: number): string =>
  listToText(episodes, totalCount, formatEpisode, "該当するエピソードはありませんでした。");
