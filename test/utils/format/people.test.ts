import { describe, it, expect } from "vitest";
import { formatPerson, peopleToText } from "@/utils/format/people.js";
import type { AnnictPerson } from "@/types/people.js";

const minimalPerson: AnnictPerson = {
  id: 7118,
  name: "水瀬いのり",
};

describe("formatPerson", () => {
  it("formats minimal person with required fields only", () => {
    const text = formatPerson(minimalPerson);
    expect(text).toContain("【水瀬いのり】");
    expect(text).toContain("ID: 7118");
    expect(text).toContain("キャスト: 0");
    expect(text).toContain("スタッフ: 0");
  });

  it("includes name_kana and name_en when present", () => {
    const person: AnnictPerson = {
      ...minimalPerson,
      name_kana: "みなせいのり",
      name_en: "Minase Inori",
    };
    const text = formatPerson(person);
    expect(text).toContain("(みなせいのり)");
    expect(text).toContain(" / Minase Inori");
  });

  it("includes nickname, birthday, prefecture when present", () => {
    const person: AnnictPerson = {
      ...minimalPerson,
      nickname: "いのりん",
      birthday: "1995-09-06",
      prefecture: { id: 13, name: "東京都" },
    };
    const text = formatPerson(person);
    expect(text).toContain("ニックネーム: いのりん");
    expect(text).toContain("誕生日: 1995-09-06");
    expect(text).toContain("出身: 東京都");
  });
});

describe("peopleToText", () => {
  it("returns empty message when people array is empty", () => {
    const text = peopleToText([], 0);
    expect(text).toBe("該当する人物はありませんでした。");
  });

  it("returns header and formatted list when people exist", () => {
    const people: AnnictPerson[] = [
      { ...minimalPerson, id: 1, name: "人物A" },
      { ...minimalPerson, id: 2, name: "人物B" },
    ];
    const text = peopleToText(people, 100);
    expect(text).toMatch(/^全 100 件中 2 件を表示:/);
    expect(text).toContain("【人物A】");
    expect(text).toContain("【人物B】");
    expect(text).toContain("1.");
    expect(text).toContain("2.");
  });
});
