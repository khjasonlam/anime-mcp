import { describe, it, expect } from "vitest";
import { formatStaff, staffsToText } from "@/utils/format/staffs.js";
import type { AnnictStaff } from "@/types/staffs.js";

const minimalStaff: AnnictStaff = {
  id: 35319,
  name: "スタッフ名",
};

describe("formatStaff", () => {
  it("formats minimal staff with required fields only", () => {
    const text = formatStaff(minimalStaff);
    expect(text).toContain("【スタッフ】");
    expect(text).toContain("スタッフ名");
    expect(text).toContain("ID: 35319");
  });

  it("includes role_text and role_other when present", () => {
    const staff: AnnictStaff = {
      ...minimalStaff,
      role_text: "監督",
      role_other: "チーフディレクター",
    };
    const text = formatStaff(staff);
    expect(text).toContain("【監督】");
    expect(text).toContain("その他: チーフディレクター");
  });

  it("includes work title when present", () => {
    const staff: AnnictStaff = {
      ...minimalStaff,
      work: { id: 1, title: "しろばこ", media: "tv", media_text: "TV" },
    };
    const text = formatStaff(staff);
    expect(text).toContain("（しろばこ）");
  });

  it("uses person name when person is present", () => {
    const staff: AnnictStaff = {
      ...minimalStaff,
      person: { id: 1, name: "水瀬いのり" },
    };
    const text = formatStaff(staff);
    expect(text).toContain("水瀬いのり");
  });

  it("uses organization name when organization is present", () => {
    const staff: AnnictStaff = {
      ...minimalStaff,
      organization: { id: 1, name: "P.A.WORKS" },
    };
    const text = formatStaff(staff);
    expect(text).toContain("P.A.WORKS");
  });
});

describe("staffsToText", () => {
  it("returns empty message when staffs array is empty", () => {
    const text = staffsToText([], 0);
    expect(text).toBe("該当するスタッフはありませんでした。");
  });

  it("returns header and formatted list when staffs exist", () => {
    const staffs: AnnictStaff[] = [
      { ...minimalStaff, id: 1, name: "スタッフA", role_text: "監督" },
      { ...minimalStaff, id: 2, name: "スタッフB", role_text: "脚本" },
    ];
    const text = staffsToText(staffs, 20);
    expect(text).toMatch(/^全 20 件中 2 件を表示:/);
    expect(text).toContain("【監督】");
    expect(text).toContain("【脚本】");
    expect(text).toContain("1.");
    expect(text).toContain("2.");
  });
});
