import type { AnnictSeries } from "@/types/series.js";
import { listToText } from "./common.js";

/** シリーズ 1 件を表示用テキストに整形する */
export const formatSeries = (s: AnnictSeries): string => {
  const parts = [`【${s.name}】`, s.name_ro && ` (${s.name_ro})`, s.name_en && ` / ${s.name_en}`, ` | ID: ${s.id}`];
  return parts.filter(Boolean).join("");
};

/** シリーズ一覧を「全 N 件中 M 件を表示」＋一覧テキストに整形する */
export const seriesToText = (series: AnnictSeries[], totalCount: number): string =>
  listToText(series, totalCount, formatSeries, "該当するシリーズはありませんでした。");
