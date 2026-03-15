import { describe, it, expect } from "vitest";
import { formatWork, worksToText } from "@/utils/format/works.js";
import type { AnnictWork } from "@/types/works.js";

const minimalWork: AnnictWork = {
  id: 1,
  title: "しろばこ",
  media: "tv",
  media_text: "TV",
};

describe("formatWork", () => {
  it("formats minimal work with required fields only", () => {
    const text = formatWork(minimalWork);
    expect(text).toContain("【しろばこ】");
    expect(text).toContain("ID: 1");
    expect(text).toContain("TV");
  });

  it("includes title_kana when present", () => {
    const work: AnnictWork = { ...minimalWork, title_kana: "シロバコ" };
    const text = formatWork(work);
    expect(text).toContain("(シロバコ)");
  });

  it("includes released_on and official_site_url when present", () => {
    const work: AnnictWork = {
      ...minimalWork,
      released_on: "2014-10-09",
      official_site_url: "https://example.com",
    };
    const text = formatWork(work);
    expect(text).toContain("放送日: 2014-10-09");
    expect(text).toContain("公式: https://example.com");
  });

  it("includes recommended_url from images when present", () => {
    const work: AnnictWork = {
      ...minimalWork,
      images: { recommended_url: "https://img.example.com/1.jpg" },
    };
    const text = formatWork(work);
    expect(text).toContain("画像: https://img.example.com/1.jpg");
  });
});

describe("worksToText", () => {
  it("returns empty message when works array is empty", () => {
    const text = worksToText([], 0);
    expect(text).toBe("該当する作品はありませんでした。");
  });

  it("returns header and formatted list when works exist", () => {
    const works: AnnictWork[] = [
      { ...minimalWork, id: 1, title: "作品A" },
      { ...minimalWork, id: 2, title: "作品B" },
    ];
    const text = worksToText(works, 100);
    expect(text).toMatch(/^全 100 件中 2 件を表示:/);
    expect(text).toContain("【作品A】");
    expect(text).toContain("【作品B】");
    expect(text).toContain("1.");
    expect(text).toContain("2.");
  });
});
