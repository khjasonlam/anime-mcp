import { describe, it, expect, vi, beforeEach } from "vitest";
import { createFakeMcpServer, type ToolResult } from "../helpers/test-helpers.js";
import { registerOrganizationsTools } from "@/tools/organizations.js";
import * as apiOrganizations from "@/api/organizations.js";

vi.mock("@/api/organizations.js", () => ({
  fetchOrganizations: vi.fn(),
}));

const mockOrganizationsResponse = {
  organizations: [{ id: 74, name: "P.A.WORKS" }],
  total_count: 1,
  next_page: null,
  prev_page: null,
};

describe("registerOrganizationsTools", () => {
  beforeEach(() => {
    vi.mocked(apiOrganizations.fetchOrganizations).mockResolvedValue(mockOrganizationsResponse);
  });

  it("search_organizations calls fetchOrganizations with filter_name and returns formatted text", async () => {
    const server = createFakeMcpServer();
    registerOrganizationsTools(server);
    const handler = server.getHandler("search_organizations");
    expect(handler).toBeDefined();

    const result = (await handler!({ name: "P.A", per_page: 25, sort_id: "desc" })) as ToolResult;
    expect(result).toHaveProperty("content");
    expect(result.content[0].text).toContain("P.A.WORKS");
    expect(apiOrganizations.fetchOrganizations).toHaveBeenCalledWith(
      expect.objectContaining({
        filter_name: "P.A",
        per_page: 25,
      })
    );
  });

  it("get_organizations_by_ids calls fetchOrganizations with filter_ids", async () => {
    const server = createFakeMcpServer();
    registerOrganizationsTools(server);
    const handler = server.getHandler("get_organizations_by_ids");
    expect(handler).toBeDefined();

    await handler!({ ids: [74, 3] });
    expect(apiOrganizations.fetchOrganizations).toHaveBeenCalledWith({
      filter_ids: [74, 3],
      per_page: 2,
    });
  });

  it("returns error content when fetchOrganizations throws", async () => {
    vi.mocked(apiOrganizations.fetchOrganizations).mockRejectedValue(new Error("API error"));
    const server = createFakeMcpServer();
    registerOrganizationsTools(server);
    const handler = server.getHandler("search_organizations");
    expect(handler).toBeDefined();

    const result = (await handler!({ name: "test", per_page: 25 })) as ToolResult;
    expect(result).toHaveProperty("isError", true);
    expect(result.content[0].text).toContain("検索に失敗しました");
  });
});
