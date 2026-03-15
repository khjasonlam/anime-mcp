import { describe, it, expect } from "vitest";
import { formatOrganization, organizationsToText } from "@/utils/format/organizations.js";
import type { AnnictOrganization } from "@/types/organizations.js";

const minimalOrganization: AnnictOrganization = {
  id: 74,
  name: "P.A.WORKS",
};

describe("formatOrganization", () => {
  it("formats minimal organization with required fields only", () => {
    const text = formatOrganization(minimalOrganization);
    expect(text).toContain("【P.A.WORKS】");
    expect(text).toContain("ID: 74");
    expect(text).toContain("スタッフ登録作品数: 0");
  });

  it("includes name_kana and name_en when present", () => {
    const org: AnnictOrganization = {
      ...minimalOrganization,
      name_kana: "ピーエーワークス",
      name_en: "P.A.WORKS",
    };
    const text = formatOrganization(org);
    expect(text).toContain("(ピーエーワークス)");
    expect(text).toContain(" / P.A.WORKS");
  });

  it("includes staffs_count when present", () => {
    const org: AnnictOrganization = {
      ...minimalOrganization,
      staffs_count: 10,
    };
    const text = formatOrganization(org);
    expect(text).toContain("スタッフ登録作品数: 10");
  });
});

describe("organizationsToText", () => {
  it("returns empty message when organizations array is empty", () => {
    const text = organizationsToText([], 0);
    expect(text).toBe("該当する団体はありませんでした。");
  });

  it("returns header and formatted list when organizations exist", () => {
    const organizations: AnnictOrganization[] = [
      { ...minimalOrganization, id: 1, name: "団体A" },
      { ...minimalOrganization, id: 2, name: "団体B" },
    ];
    const text = organizationsToText(organizations, 50);
    expect(text).toMatch(/^全 50 件中 2 件を表示:/);
    expect(text).toContain("【団体A】");
    expect(text).toContain("【団体B】");
    expect(text).toContain("1.");
    expect(text).toContain("2.");
  });
});
