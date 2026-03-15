import type { AnnictEpisode } from "@/types/episodes.js";
import { listToText } from "./common.js";

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
