import { describe, it, expect, vi, beforeEach } from "vitest";
import { createFakeMcpServer, type ToolResult } from "../helpers/test-helpers.js";
import { registerWorksTools } from "@/tools/works.js";
import * as apiWorks from "@/api/works.js";

vi.mock("@/api/works.js", () => ({
  fetchWorks: vi.fn(),
  seasonParam: (year: number, season: string) => {
    const s = season.toLowerCase();
    return s === "all" ? `${year}-all` : `${year}-${s}`;
  },
}));

const mockWorksResponse = {
  works: [{ id: 4168, title: "しろばこ", media: "tv", media_text: "TV" }],
  total_count: 1,
  next_page: null,
  prev_page: null,
};

describe("registerWorksTools", () => {
  beforeEach(() => {
    vi.mocked(apiWorks.fetchWorks).mockResolvedValue(mockWorksResponse);
  });

  it("search_anime calls fetchWorks with filter_title and returns formatted text", async () => {
    const server = createFakeMcpServer();
    registerWorksTools(server);
    const handler = server.getHandler("search_anime");
    expect(handler).toBeDefined();

    const result = (await handler!({ title: "しろばこ", per_page: 25 })) as ToolResult;
    expect(result).toHaveProperty("content");
    expect(result.content[0]).toEqual({ type: "text", text: expect.stringContaining("しろばこ") });
    expect(apiWorks.fetchWorks).toHaveBeenCalledWith({
      filter_title: "しろばこ",
      per_page: 25,
    });
  });

  it("search_anime_by_season calls fetchWorks with filter_season and sort", async () => {
    const server = createFakeMcpServer();
    registerWorksTools(server);
    const handler = server.getHandler("search_anime_by_season");
    expect(handler).toBeDefined();

    await handler!({ year: 2024, season: "spring", per_page: 25, sort: "season_desc" });
    expect(apiWorks.fetchWorks).toHaveBeenCalledWith(
      expect.objectContaining({
        filter_season: "2024-spring",
        sort_season: "desc",
        per_page: 25,
      })
    );
  });

  it("get_anime_by_ids calls fetchWorks with filter_ids", async () => {
    const server = createFakeMcpServer();
    registerWorksTools(server);
    const handler = server.getHandler("get_anime_by_ids");
    expect(handler).toBeDefined();

    await handler!({ ids: [4168, 4681] });
    expect(apiWorks.fetchWorks).toHaveBeenCalledWith({
      filter_ids: [4168, 4681],
      per_page: 2,
    });
  });

  it("returns error content when fetchWorks throws", async () => {
    vi.mocked(apiWorks.fetchWorks).mockRejectedValue(new Error("API error"));
    const server = createFakeMcpServer();
    registerWorksTools(server);
    const handler = server.getHandler("search_anime");
    expect(handler).toBeDefined();

    const result = (await handler!({ title: "test", per_page: 25 })) as ToolResult;
    expect(result).toHaveProperty("isError", true);
    expect(result.content[0].text).toContain("検索に失敗しました");
  });
});
