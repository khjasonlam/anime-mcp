/**
 * MCP tool result helpers
 */
export const ok = (text: string) => ({
  content: [{ type: "text" as const, text }],
});
export const err = (msg: string) => ({
  content: [{ type: "text" as const, text: msg }],
  isError: true,
});

export const wrap = async (run: () => Promise<string>, errPrefix: string) => {
  try {
    return ok(await run());
  } catch (e) {
    return err(`${errPrefix}: ${e instanceof Error ? e.message : String(e)}`);
  }
};
