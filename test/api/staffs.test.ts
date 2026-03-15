import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchStaffs } from "@/api/staffs.js";
import * as client from "@/api/client.js";

vi.mock("@/api/client.js", () => ({
  get: vi.fn(),
}));

describe("fetchStaffs", () => {
  beforeEach(() => {
    vi.mocked(client.get).mockResolvedValue({
      staffs: [],
      total_count: 0,
      next_page: null,
      prev_page: null,
    });
  });

  it("calls get with path 'staffs' and given params", async () => {
    await fetchStaffs({ filter_work_id: 4168, per_page: 50 });
    expect(client.get).toHaveBeenCalledWith("staffs", {
      filter_work_id: 4168,
      per_page: 50,
    });
  });

  it("returns the response from get", async () => {
    const response = {
      staffs: [{ id: 35319, name: "スタッフ", role_text: "監督" }],
      total_count: 1,
      next_page: null,
      prev_page: null,
    };
    vi.mocked(client.get).mockResolvedValue(response);
    const result = await fetchStaffs({});
    expect(result).toEqual(response);
  });
});
