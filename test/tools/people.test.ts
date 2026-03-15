import { describe, it, expect, vi, beforeEach } from "vitest";
import { createFakeMcpServer, type ToolResult } from "../helpers/test-helpers.js";
import { registerPeopleTools } from "@/tools/people.js";
import * as apiPeople from "@/api/people.js";

vi.mock("@/api/people.js", () => ({
  fetchPeople: vi.fn(),
}));

const mockPeopleResponse = {
  people: [{ id: 7118, name: "水瀬いのり" }],
  total_count: 1,
  next_page: null,
  prev_page: null,
};

describe("registerPeopleTools", () => {
  beforeEach(() => {
    vi.mocked(apiPeople.fetchPeople).mockResolvedValue(mockPeopleResponse);
  });

  it("search_people calls fetchPeople with filter_name and returns formatted text", async () => {
    const server = createFakeMcpServer();
    registerPeopleTools(server);
    const handler = server.getHandler("search_people");
    expect(handler).toBeDefined();

    const result = (await handler!({ name: "水瀬", per_page: 25, sort_id: "desc" })) as ToolResult;
    expect(result).toHaveProperty("content");
    expect(result.content[0].text).toContain("水瀬いのり");
    expect(apiPeople.fetchPeople).toHaveBeenCalledWith(
      expect.objectContaining({
        filter_name: "水瀬",
        per_page: 25,
      })
    );
  });

  it("get_people_by_ids calls fetchPeople with filter_ids", async () => {
    const server = createFakeMcpServer();
    registerPeopleTools(server);
    const handler = server.getHandler("get_people_by_ids");
    expect(handler).toBeDefined();

    await handler!({ ids: [7118] });
    expect(apiPeople.fetchPeople).toHaveBeenCalledWith({
      filter_ids: [7118],
      per_page: 1,
    });
  });

  it("returns error content when fetchPeople throws", async () => {
    vi.mocked(apiPeople.fetchPeople).mockRejectedValue(new Error("API error"));
    const server = createFakeMcpServer();
    registerPeopleTools(server);
    const handler = server.getHandler("search_people");
    expect(handler).toBeDefined();

    const result = (await handler!({ name: "test", per_page: 25 })) as ToolResult;
    expect(result).toHaveProperty("isError", true);
    expect(result.content[0].text).toContain("検索に失敗しました");
  });
});
