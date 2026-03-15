import { describe, it, expect } from "vitest";
import { listToText } from "@/utils/format/common.js";

describe("listToText", () => {
  it("returns emptyMsg when items array is empty", () => {
    const result = listToText([], 0, (x: number) => String(x), "該当なし");
    expect(result).toBe("該当なし");
  });

  it("returns header and formatted items when items exist", () => {
    const result = listToText(
      ["a", "b"],
      10,
      (x) => `item: ${x}`,
      "empty"
    );
    expect(result).toBe(
      "全 10 件中 2 件を表示:\n1. item: a\n\n2. item: b"
    );
  });

  it("uses 1-based index for each item", () => {
    const result = listToText(
      [100, 200],
      2,
      (n) => `id=${n}`,
      "empty"
    );
    expect(result).toBe("全 2 件中 2 件を表示:\n1. id=100\n\n2. id=200");
  });

  it("handles single item", () => {
    const result = listToText(
      [{ name: "x" }],
      1,
      (o: { name: string }) => o.name,
      "empty"
    );
    expect(result).toBe("全 1 件中 1 件を表示:\n1. x");
  });
});
