import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchEpisodes } from "@/api/episodes.js";
import * as client from "@/api/client.js";

vi.mock("@/api/client.js", () => ({
  get: vi.fn(),
}));

describe("fetchEpisodes", () => {
  beforeEach(() => {
    vi.mocked(client.get).mockResolvedValue({
      episodes: [],
      total_count: 0,
      next_page: null,
      prev_page: null,
    });
  });

  it("calls get with path 'episodes' and given params", async () => {
    await fetchEpisodes({ filter_work_id: 4168, per_page: 50 });
    expect(client.get).toHaveBeenCalledWith("episodes", {
      filter_work_id: 4168,
      per_page: 50,
    });
  });

  it("returns the response from get", async () => {
    const response = {
      episodes: [{ id: 45, number_text: "第1話", title: "はじまりの日" }],
      total_count: 1,
      next_page: null,
      prev_page: null,
    };
    vi.mocked(client.get).mockResolvedValue(response);
    const result = await fetchEpisodes({});
    expect(result).toEqual(response);
  });
});
