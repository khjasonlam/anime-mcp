import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchSeries } from "@/api/series.js";
import * as client from "@/api/client.js";

vi.mock("@/api/client.js", () => ({
  get: vi.fn(),
}));

describe("fetchSeries", () => {
  beforeEach(() => {
    vi.mocked(client.get).mockResolvedValue({
      series: [],
      total_count: 0,
      next_page: null,
      prev_page: null,
    });
  });

  it("calls get with path 'series' and given params", async () => {
    await fetchSeries({ filter_name: "ソード", per_page: 10 });
    expect(client.get).toHaveBeenCalledWith("series", {
      filter_name: "ソード",
      per_page: 10,
    });
  });

  it("returns the response from get", async () => {
    const response = {
      series: [{ id: 65, name: "ソードアート・オンライン" }],
      total_count: 1,
      next_page: null,
      prev_page: null,
    };
    vi.mocked(client.get).mockResolvedValue(response);
    const result = await fetchSeries({});
    expect(result).toEqual(response);
  });
});
