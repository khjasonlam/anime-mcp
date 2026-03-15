/**
 * App config (env and constants)
 */
export const ANNICT_API_BASE = "https://api.annict.com/v1";

const TOKEN_URL = "https://annict.com/settings/apps";

export const getAnnictAccessToken = (): string => {
  const token = process.env.ANNICT_ACCESS_TOKEN;
  if (!token) throw new Error(`ANNICT_ACCESS_TOKEN is not set. Get a token from ${TOKEN_URL}`);
  return token;
};
