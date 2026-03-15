import { describe, it, expect, vi, beforeEach } from "vitest";
import { createFakeMcpServer, type ToolResult } from "../helpers/test-helpers.js";
import { registerStaffsTools } from "@/tools/staffs.js";
import * as apiStaffs from "@/api/staffs.js";

vi.mock("@/api/staffs.js", () => ({
  fetchStaffs: vi.fn(),
}));

const mockStaffsResponse = {
  staffs: [{ id: 35319, name: "スタッフ", role_text: "監督" }],
  total_count: 1,
  next_page: null,
  prev_page: null,
};

describe("registerStaffsTools", () => {
  beforeEach(() => {
    vi.mocked(apiStaffs.fetchStaffs).mockResolvedValue(mockStaffsResponse);
  });

  it("get_staffs_by_ids calls fetchStaffs with filter_ids", async () => {
    const server = createFakeMcpServer();
    registerStaffsTools(server);
    const handler = server.getHandler("get_staffs_by_ids");
    expect(handler).toBeDefined();

    const result = (await handler!({ ids: [35319] })) as ToolResult;
    expect(result).toHaveProperty("content");
    expect(result.content[0].text).toContain("監督");
    expect(apiStaffs.fetchStaffs).toHaveBeenCalledWith({
      filter_ids: [35319],
      per_page: 1,
    });
  });

  it("get_staffs_by_work_id calls fetchStaffs with filter_work_id", async () => {
    const server = createFakeMcpServer();
    registerStaffsTools(server);
    const handler = server.getHandler("get_staffs_by_work_id");
    expect(handler).toBeDefined();

    await handler!({ work_id: 4168, per_page: 50, sort_sort_number: "asc" });
    expect(apiStaffs.fetchStaffs).toHaveBeenLastCalledWith(
      expect.objectContaining({
        filter_work_id: 4168,
        per_page: 50,
      })
    );
  });

  it("returns error content when fetchStaffs throws", async () => {
    vi.mocked(apiStaffs.fetchStaffs).mockRejectedValue(new Error("API error"));
    const server = createFakeMcpServer();
    registerStaffsTools(server);
    const handler = server.getHandler("get_staffs_by_ids");
    expect(handler).toBeDefined();

    const result = (await handler!({ ids: [1] })) as ToolResult;
    expect(result).toHaveProperty("isError", true);
    expect(result.content[0].text).toContain("取得に失敗しました");
  });
});
