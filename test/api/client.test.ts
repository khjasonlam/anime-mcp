import { describe, it, expect } from "vitest";
import { buildParams } from "@/api/client.js";

describe("buildParams", () => {
  it("omits undefined values", () => {
    const params = { a: "x", b: undefined, c: 1 };
    const search = buildParams(params);
    expect(search.get("a")).toBe("x");
    expect(search.get("c")).toBe("1");
    expect(search.has("b")).toBe(false);
  });

  it("joins array values with comma", () => {
    const params = { ids: [1, 2, 3] };
    const search = buildParams(params);
    expect(search.get("ids")).toBe("1,2,3");
  });

  it("converts number to string", () => {
    const search = buildParams({ page: 2, per_page: 25 });
    expect(search.get("page")).toBe("2");
    expect(search.get("per_page")).toBe("25");
  });

  it("converts boolean to string", () => {
    const search = buildParams({ filter_unwatched: true });
    expect(search.get("filter_unwatched")).toBe("true");
  });

  it("returns empty URLSearchParams for empty object", () => {
    const search = buildParams({});
    expect(search.toString()).toBe("");
  });

  it("handles string array", () => {
    const search = buildParams({ fields: ["id", "title"] });
    expect(search.get("fields")).toBe("id,title");
  });
});
