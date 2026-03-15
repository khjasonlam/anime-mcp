import { describe, it, expect, vi, beforeEach } from "vitest";
import { createFakeMcpServer, type ToolResult } from "../helpers/test-helpers.js";
import { registerEpisodesTools } from "@/tools/episodes.js";
import * as apiEpisodes from "@/api/episodes.js";

vi.mock("@/api/episodes.js", () => ({
  fetchEpisodes: vi.fn(),
}));

const mockEpisodesResponse = {
  episodes: [{ id: 45, number_text: "第1話", title: "はじまりの日" }],
  total_count: 1,
  next_page: null,
  prev_page: null,
};

describe("registerEpisodesTools", () => {
  beforeEach(() => {
    vi.mocked(apiEpisodes.fetchEpisodes).mockResolvedValue(mockEpisodesResponse);
  });

  it("get_episodes_by_work_id calls fetchEpisodes with filter_work_id", async () => {
    const server = createFakeMcpServer();
    registerEpisodesTools(server);
    const handler = server.getHandler("get_episodes_by_work_id");
    expect(handler).toBeDefined();

    const result = (await handler!({ work_id: 4168, per_page: 50, sort_sort_number: "asc" })) as ToolResult;
    expect(result).toHaveProperty("content");
    expect(result.content[0].text).toContain("第1話");
    expect(apiEpisodes.fetchEpisodes).toHaveBeenCalledWith(
      expect.objectContaining({
        filter_work_id: 4168,
        per_page: 50,
      })
    );
  });

  it("get_episodes_by_ids calls fetchEpisodes with filter_ids", async () => {
    const server = createFakeMcpServer();
    registerEpisodesTools(server);
    const handler = server.getHandler("get_episodes_by_ids");
    expect(handler).toBeDefined();

    await handler!({ ids: [45, 46] });
    expect(apiEpisodes.fetchEpisodes).toHaveBeenCalledWith({
      filter_ids: [45, 46],
      per_page: 2,
    });
  });

  it("returns error content when fetchEpisodes throws", async () => {
    vi.mocked(apiEpisodes.fetchEpisodes).mockRejectedValue(new Error("API error"));
    const server = createFakeMcpServer();
    registerEpisodesTools(server);
    const handler = server.getHandler("get_episodes_by_work_id");
    expect(handler).toBeDefined();

    const result = (await handler!({ work_id: 4168, per_page: 25 })) as ToolResult;
    expect(result).toHaveProperty("isError", true);
    expect(result.content[0].text).toContain("取得に失敗しました");
  });
});
