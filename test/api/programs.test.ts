import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchPrograms } from "@/api/programs.js";
import * as client from "@/api/client.js";

vi.mock("@/api/client.js", () => ({
  get: vi.fn(),
}));

describe("fetchPrograms", () => {
  beforeEach(() => {
    vi.mocked(client.get).mockResolvedValue({
      programs: [],
      total_count: 0,
      next_page: null,
      prev_page: null,
    });
  });

  it("calls get with path 'me/programs' and given params", async () => {
    await fetchPrograms({ per_page: 25, sort_started_at: "asc" });
    expect(client.get).toHaveBeenCalledWith("me/programs", {
      per_page: 25,
      sort_started_at: "asc",
    });
  });

  it("returns the response from get", async () => {
    const response = {
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
    vi.mocked(client.get).mockResolvedValue(response);
    const result = await fetchPrograms({});
    expect(result).toEqual(response);
  });
});
