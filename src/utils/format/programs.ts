import type { AnnictProgram } from "@/types/programs.js";
import { listToText } from "./common.js";

/** 放送予定 1 件を表示用テキストに整形する */
export const formatProgram = (p: AnnictProgram): string => {
  const workTitle = p.work ? p.work.title : "-";
  const ep = p.episode ? `${p.episode.number_text ?? `#${p.episode.id}`} ${p.episode.title ?? ""}`.trim() : "-";
  const ch = p.channel ? p.channel.name : "-";
  const rebroadcast = p.is_rebroadcast ? " (再)" : "";
  const lines = [
    `【${workTitle}】${rebroadcast}`,
    `放送: ${p.started_at} | ${ch}`,
    `エピソード: ${ep}`,
    `ID: ${p.id}`,
  ];
  return lines.join("\n");
};

/** 放送予定一覧を「全 N 件中 M 件を表示」＋一覧テキストに整形する */
export const programsToText = (programs: AnnictProgram[], totalCount: number): string =>
  listToText(programs, totalCount, formatProgram, "該当する放送予定はありませんでした。");
