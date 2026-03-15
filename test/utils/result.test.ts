import { describe, it, expect } from "vitest";
import { ok, err, wrap } from "@/utils/result.js";

describe("ok", () => {
  it("returns content with type text and given string", () => {
    const result = ok("hello");
    expect(result).toEqual({
      content: [{ type: "text", text: "hello" }],
    });
    expect("isError" in result ? result.isError : undefined).toBeUndefined();
  });
});

describe("err", () => {
  it("returns content with isError true and given message", () => {
    const result = err("something failed");
    expect(result).toEqual({
      content: [{ type: "text", text: "something failed" }],
      isError: true,
    });
  });
});

describe("wrap", () => {
  it("returns ok() when the async function resolves", async () => {
    const result = await wrap(async () => "success", "失敗");
    expect(result).toEqual({
      content: [{ type: "text", text: "success" }],
    });
    expect("isError" in result ? result.isError : undefined).toBeUndefined();
  });

  it("returns err() with prefix and message when the async function throws Error", async () => {
    const result = await wrap(
      async () => {
        throw new Error("network error");
      },
      "取得に失敗しました"
    );
    expect("isError" in result && result.isError).toBe(true);
    expect(result.content[0].type).toBe("text");
    expect(result.content[0].text).toBe("取得に失敗しました: network error");
  });

  it("returns err() with prefix and string when the async function throws non-Error", async () => {
    const result = await wrap(
      async () => {
        throw "string throw";
      },
      "エラー"
    );
    expect("isError" in result && result.isError).toBe(true);
    expect(result.content[0].text).toBe("エラー: string throw");
  });
});
