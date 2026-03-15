import { describe, it, expect, vi, beforeEach } from "vitest";
import { seasonParam, fetchWorks } from "@/api/works.js";
import * as client from "@/api/client.js";

vi.mock("@/api/client.js", () => ({
  get: vi.fn(),
}));

describe("seasonParam", () => {
  it("returns year-season for spring", () => {
    expect(seasonParam(2024, "spring")).toBe("2024-spring");
  });

  it("returns year-season for summer, autumn, winter", () => {
    expect(seasonParam(2016, "summer")).toBe("2016-summer");
    expect(seasonParam(2020, "autumn")).toBe("2020-autumn");
    expect(seasonParam(2022, "winter")).toBe("2022-winter");
  });

  it("returns year-all when season is all", () => {
    expect(seasonParam(2024, "all")).toBe("2024-all");
  });

  it("lowercases season string", () => {
    expect(seasonParam(2024, "Spring")).toBe("2024-spring");
    expect(seasonParam(2024, "ALL")).toBe("2024-all");
  });
});

describe("fetchWorks", () => {
  beforeEach(() => {
    vi.mocked(client.get).mockResolvedValue({
      works: [],
      total_count: 0,
      next_page: null,
      prev_page: null,
    });
  });

  it("calls get with path 'works' and given params", async () => {
    await fetchWorks({ filter_title: "しろばこ", per_page: 25 });
    expect(client.get).toHaveBeenCalledWith("works", {
      filter_title: "しろばこ",
      per_page: 25,
    });
  });

  it("returns the response from get", async () => {
    const response = {
      works: [{ id: 4168, title: "しろばこ", media: "tv", media_text: "TV" }],
      total_count: 1,
      next_page: null,
      prev_page: null,
    };
    vi.mocked(client.get).mockResolvedValue(response);
    const result = await fetchWorks({});
    expect(result).toEqual(response);
  });
});
