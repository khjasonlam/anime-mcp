/** 成功時のテキストレスポンスを MCP の content 形式で返す */
export const ok = (text: string) => ({
  content: [{ type: "text" as const, text }],
});

/** エラー時のメッセージを MCP の content 形式で返す（isError: true） */
export const err = (msg: string) => ({
  content: [{ type: "text" as const, text: msg }],
  isError: true,
});

/** 非同期処理を実行し、成功時は ok、失敗時は err でラップして返す */
export const wrap = async (run: () => Promise<string>, errPrefix: string) => {
  try {
    return ok(await run());
  } catch (e) {
    return err(`${errPrefix}: ${e instanceof Error ? e.message : String(e)}`);
  }
};
