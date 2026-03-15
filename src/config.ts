/** Annict API のベースURL */
export const ANNICT_API_BASE = "https://api.annict.com/v1";

const TOKEN_URL = "https://annict.com/settings/apps";

/**
 * 環境変数から Annict のアクセストークンを取得する。
 * 未設定の場合はエラーを投げる。
 */
export const getAnnictAccessToken = (): string => {
  const token = process.env.ANNICT_ACCESS_TOKEN;
  if (!token) throw new Error(`ANNICT_ACCESS_TOKEN is not set. Get a token from ${TOKEN_URL}`);
  return token;
};
