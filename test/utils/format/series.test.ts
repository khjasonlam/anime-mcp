import { describe, it, expect } from "vitest";
import { formatSeries, seriesToText } from "@/utils/format/series.js";
import type { AnnictSeries } from "@/types/series.js";

const minimalSeries: AnnictSeries = {
  id: 65,
  name: "ソードアート・オンライン",
};

describe("formatSeries", () => {
  it("formats minimal series with required fields only", () => {
    const text = formatSeries(minimalSeries);
    expect(text).toContain("【ソードアート・オンライン】");
    expect(text).toContain("ID: 65");
  });

  it("includes name_ro and name_en when present", () => {
    const series: AnnictSeries = {
      ...minimalSeries,
      name_ro: "Sword Art Online",
      name_en: "Sword Art Online",
    };
    const text = formatSeries(series);
    expect(text).toContain("(Sword Art Online)");
    expect(text).toContain(" / Sword Art Online");
  });
});

describe("seriesToText", () => {
  it("returns empty message when series array is empty", () => {
    const text = seriesToText([], 0);
    expect(text).toBe("該当するシリーズはありませんでした。");
  });

  it("returns header and formatted list when series exist", () => {
    const series: AnnictSeries[] = [
      { ...minimalSeries, id: 1, name: "シリーズA" },
      { ...minimalSeries, id: 2, name: "シリーズB" },
    ];
    const text = seriesToText(series, 100);
    expect(text).toMatch(/^全 100 件中 2 件を表示:/);
    expect(text).toContain("【シリーズA】");
    expect(text).toContain("【シリーズB】");
    expect(text).toContain("1.");
    expect(text).toContain("2.");
  });
});
