import { describe, it, expect } from "vitest";
import { formatEpisode, episodesToText } from "@/utils/format/episodes.js";
import type { AnnictEpisode } from "@/types/episodes.js";

const minimalEpisode: AnnictEpisode = {
  id: 45,
};

describe("formatEpisode", () => {
  it("formats minimal episode with id only", () => {
    const text = formatEpisode(minimalEpisode);
    expect(text).toContain("#45");
    expect(text).toContain("ID: 45");
    expect(text).toContain("記録: 0");
    expect(text).toContain("感想付き: 0");
  });

  it("includes number_text and title when present", () => {
    const episode: AnnictEpisode = {
      ...minimalEpisode,
      number_text: "第1話",
      title: "はじまりの日",
    };
    const text = formatEpisode(episode);
    expect(text).toContain("【第1話】");
    expect(text).toContain("はじまりの日");
  });

  it("includes work title when present", () => {
    const episode: AnnictEpisode = {
      ...minimalEpisode,
      work: { id: 1, title: "しろばこ", media: "tv", media_text: "TV" },
    };
    const text = formatEpisode(episode);
    expect(text).toContain("（しろばこ）");
  });
});

describe("episodesToText", () => {
  it("returns empty message when episodes array is empty", () => {
    const text = episodesToText([], 0);
    expect(text).toBe("該当するエピソードはありませんでした。");
  });

  it("returns header and formatted list when episodes exist", () => {
    const episodes: AnnictEpisode[] = [
      { ...minimalEpisode, id: 1, number_text: "第1話", title: "A" },
      { ...minimalEpisode, id: 2, number_text: "第2話", title: "B" },
    ];
    const text = episodesToText(episodes, 50);
    expect(text).toMatch(/^全 50 件中 2 件を表示:/);
    expect(text).toContain("【第1話】");
    expect(text).toContain("【第2話】");
    expect(text).toContain("1.");
    expect(text).toContain("2.");
  });
});
