/** 配列を「全 N 件中 M 件を表示」形式のテキストに整形する（0 件の場合は emptyMsg） */
export const listToText = <T>(items: T[], total: number, format: (x: T) => string, emptyMsg: string): string => {
  if (items.length === 0) return emptyMsg;
  const header = `全 ${total} 件中 ${items.length} 件を表示:\n`;
  const body = items.map((x, i) => `${i + 1}. ${format(x)}`).join("\n\n");
  return header + body;
};
