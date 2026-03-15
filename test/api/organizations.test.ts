import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchOrganizations } from "@/api/organizations.js";
import * as client from "@/api/client.js";

vi.mock("@/api/client.js", () => ({
  get: vi.fn(),
}));

describe("fetchOrganizations", () => {
  beforeEach(() => {
    vi.mocked(client.get).mockResolvedValue({
      organizations: [],
      total_count: 0,
      next_page: null,
      prev_page: null,
    });
  });

  it("calls get with path 'organizations' and given params", async () => {
    await fetchOrganizations({ filter_name: "P.A.WORKS", per_page: 10 });
    expect(client.get).toHaveBeenCalledWith("organizations", {
      filter_name: "P.A.WORKS",
      per_page: 10,
    });
  });

  it("returns the response from get", async () => {
    const response = {
      organizations: [{ id: 74, name: "P.A.WORKS" }],
      total_count: 1,
      next_page: null,
      prev_page: null,
    };
    vi.mocked(client.get).mockResolvedValue(response);
    const result = await fetchOrganizations({});
    expect(result).toEqual(response);
  });
});
