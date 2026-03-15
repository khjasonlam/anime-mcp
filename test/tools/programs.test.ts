import { describe, it, expect, vi, beforeEach } from "vitest";
import { createFakeMcpServer, type ToolResult } from "../helpers/test-helpers.js";
import { registerProgramsTools } from "@/tools/programs.js";
import * as apiPrograms from "@/api/programs.js";

vi.mock("@/api/programs.js", () => ({
  fetchPrograms: vi.fn(),
}));

const mockProgramsResponse = {
  programs: [
    {
      id: 1,
      started_at: "2024-01-15 24:00:00",
      is_rebroadcast: false,
    },
  ],
  total_count: 1,
  next_page: null,
  prev_page: null,
};

describe("registerProgramsTools", () => {
  beforeEach(() => {
    vi.mocked(apiPrograms.fetchPrograms).mockResolvedValue(mockProgramsResponse);
  });

  it("get_my_programs calls fetchPrograms with params and returns formatted text", async () => {
    const server = createFakeMcpServer();
    registerProgramsTools(server);
    const handler = server.getHandler("get_my_programs");
    expect(handler).toBeDefined();

    const result = (await handler!({ per_page: 25, sort_started_at: "desc" })) as ToolResult;
    expect(result).toHaveProperty("content");
    expect(result.content[0].text).toContain("放送:");
    expect(apiPrograms.fetchPrograms).toHaveBeenCalledWith({
      per_page: 25,
      sort_started_at: "desc",
    });
  });

  it("get_my_programs passes filter params when provided", async () => {
    const server = createFakeMcpServer();
    registerProgramsTools(server);
    const handler = server.getHandler("get_my_programs");
    expect(handler).toBeDefined();

    await handler!({
      per_page: 10,
      filter_work_ids: [4168],
      filter_unwatched: true,
      sort_started_at: "asc",
    });
    expect(apiPrograms.fetchPrograms).toHaveBeenCalledWith({
      per_page: 10,
      filter_work_ids: [4168],
      filter_unwatched: true,
      sort_started_at: "asc",
    });
  });

  it("returns error content when fetchPrograms throws", async () => {
    vi.mocked(apiPrograms.fetchPrograms).mockRejectedValue(new Error("API error"));
    const server = createFakeMcpServer();
    registerProgramsTools(server);
    const handler = server.getHandler("get_my_programs");
    expect(handler).toBeDefined();

    const result = (await handler!({ per_page: 25 })) as ToolResult;
    expect(result).toHaveProperty("isError", true);
    expect(result.content[0].text).toContain("取得に失敗しました");
  });
});
