import { describe, it, expect, vi, beforeEach } from "vitest";
import { createFakeMcpServer, type ToolResult } from "../helpers/test-helpers.js";
import { registerSeriesTools } from "@/tools/series.js";
import * as apiSeries from "@/api/series.js";

vi.mock("@/api/series.js", () => ({
  fetchSeries: vi.fn(),
}));

const mockSeriesResponse = {
  series: [{ id: 65, name: "ソードアート・オンライン" }],
  total_count: 1,
  next_page: null,
  prev_page: null,
};

describe("registerSeriesTools", () => {
  beforeEach(() => {
    vi.mocked(apiSeries.fetchSeries).mockResolvedValue(mockSeriesResponse);
  });

  it("search_series calls fetchSeries with filter_name and returns formatted text", async () => {
    const server = createFakeMcpServer();
    registerSeriesTools(server);
    const handler = server.getHandler("search_series");
    expect(handler).toBeDefined();

    const result = (await handler!({ name: "ソード", per_page: 25, sort_id: "desc" })) as ToolResult;
    expect(result).toHaveProperty("content");
    expect(result.content[0].text).toContain("ソードアート・オンライン");
    expect(apiSeries.fetchSeries).toHaveBeenCalledWith(
      expect.objectContaining({
        filter_name: "ソード",
        per_page: 25,
      })
    );
  });

  it("get_series_by_ids calls fetchSeries with filter_ids", async () => {
    const server = createFakeMcpServer();
    registerSeriesTools(server);
    const handler = server.getHandler("get_series_by_ids");
    expect(handler).toBeDefined();

    await handler!({ ids: [65, 66] });
    expect(apiSeries.fetchSeries).toHaveBeenCalledWith({
      filter_ids: [65, 66],
      per_page: 2,
    });
  });

  it("returns error content when fetchSeries throws", async () => {
    vi.mocked(apiSeries.fetchSeries).mockRejectedValue(new Error("API error"));
    const server = createFakeMcpServer();
    registerSeriesTools(server);
    const handler = server.getHandler("search_series");
    expect(handler).toBeDefined();

    const result = (await handler!({ name: "test", per_page: 25 })) as ToolResult;
    expect(result).toHaveProperty("isError", true);
    expect(result.content[0].text).toContain("検索に失敗しました");
  });
});
