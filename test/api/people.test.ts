import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchPeople } from "@/api/people.js";
import * as client from "@/api/client.js";

vi.mock("@/api/client.js", () => ({
  get: vi.fn(),
}));

describe("fetchPeople", () => {
  beforeEach(() => {
    vi.mocked(client.get).mockResolvedValue({
      people: [],
      total_count: 0,
      next_page: null,
      prev_page: null,
    });
  });

  it("calls get with path 'people' and given params", async () => {
    await fetchPeople({ filter_name: "水瀬", per_page: 25 });
    expect(client.get).toHaveBeenCalledWith("people", {
      filter_name: "水瀬",
      per_page: 25,
    });
  });

  it("returns the response from get", async () => {
    const response = {
      people: [{ id: 7118, name: "水瀬いのり" }],
      total_count: 1,
      next_page: null,
      prev_page: null,
    };
    vi.mocked(client.get).mockResolvedValue(response);
    const result = await fetchPeople({});
    expect(result).toEqual(response);
  });
});
