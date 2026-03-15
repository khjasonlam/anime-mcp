import { describe, it, expect } from "vitest";
import { formatProgram, programsToText } from "@/utils/format/programs.js";
import type { AnnictProgram } from "@/types/programs.js";

const minimalProgram: AnnictProgram = {
  id: 1,
  started_at: "2024-01-15 24:00:00",
  is_rebroadcast: false,
};

describe("formatProgram", () => {
  it("formats minimal program with required fields only", () => {
    const text = formatProgram(minimalProgram);
    expect(text).toContain("【-】");
    expect(text).toContain("放送: 2024-01-15 24:00:00");
    expect(text).toContain(" | -");
    expect(text).toContain("エピソード: -");
    expect(text).toContain("ID: 1");
  });

  it("appends (再) when is_rebroadcast is true", () => {
    const program: AnnictProgram = {
      ...minimalProgram,
      is_rebroadcast: true,
    };
    const text = formatProgram(program);
    expect(text).toContain(" (再)");
  });

  it("includes channel name when present", () => {
    const program: AnnictProgram = {
      ...minimalProgram,
      channel: { id: 1, name: "TOKYO MX" },
    };
    const text = formatProgram(program);
    expect(text).toContain(" | TOKYO MX");
  });

  it("includes work title when present", () => {
    const program: AnnictProgram = {
      ...minimalProgram,
      work: { id: 1, title: "しろばこ", media: "tv", media_text: "TV" },
    };
    const text = formatProgram(program);
    expect(text).toContain("【しろばこ】");
  });

  it("includes episode number_text and title when present", () => {
    const program: AnnictProgram = {
      ...minimalProgram,
      episode: {
        id: 1,
        number_text: "第1話",
        title: "はじまりの日",
      },
    };
    const text = formatProgram(program);
    expect(text).toContain("エピソード: 第1話 はじまりの日");
  });
});

describe("programsToText", () => {
  it("returns empty message when programs array is empty", () => {
    const text = programsToText([], 0);
    expect(text).toBe("該当する放送予定はありませんでした。");
  });

  it("returns header and formatted list when programs exist", () => {
    const programs: AnnictProgram[] = [
      { ...minimalProgram, id: 1, started_at: "2024-01-01 24:00:00" },
      { ...minimalProgram, id: 2, started_at: "2024-01-08 24:00:00" },
    ];
    const text = programsToText(programs, 10);
    expect(text).toMatch(/^全 10 件中 2 件を表示:/);
    expect(text).toContain("放送: 2024-01-01 24:00:00");
    expect(text).toContain("放送: 2024-01-08 24:00:00");
    expect(text).toContain("1.");
    expect(text).toContain("2.");
  });
});
