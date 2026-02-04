import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { fetchWorks, seasonParam } from "./api/annict.js";
import {
  SearchAnimeInputSchema,
  SearchAnimeBySeasonInputSchema,
  GetAnimeByIdsInputSchema,
} from "./types.js";
import { worksToText } from "./utils/format.js";

const server = new McpServer({
  name: "anime-mcp",
  version: "1.0.0",
});

// --- search_anime: タイトルでアニメを検索
server.registerTool(
  "search_anime",
  {
    description:
      "Search anime works by title using Annict. Use this when the user asks to search or find anime by name.",
    inputSchema: SearchAnimeInputSchema,
  },
  async ({ title, per_page, page }) => {
    try {
      const data = await fetchWorks({
        filter_title: title,
        per_page,
        ...(page && { page }),
      });
      const text = worksToText(data.works, data.total_count);
      return { content: [{ type: "text", text }] };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        content: [{ type: "text", text: `検索に失敗しました: ${message}` }],
        isError: true,
      };
    }
  }
);

// --- search_anime_by_season: クール（季節・年）で検索
server.registerTool(
  "search_anime_by_season",
  {
    description:
      "Search anime by broadcast season (year and season). Use when the user asks for anime from a specific season (e.g. 2024 spring, 2016年秋).",
    inputSchema: SearchAnimeBySeasonInputSchema,
  },
  async ({ year, season, per_page, page, sort }) => {
    try {
      const filterSeason = seasonParam(year, season);
      const sortSeason = sort.startsWith("season")
        ? (sort === "season_desc" ? "desc" : "asc")
        : undefined;
      const sortWatchers =
        sort.startsWith("watchers")
          ? (sort === "watchers_desc" ? "desc" : "asc")
          : undefined;
      const data = await fetchWorks({
        filter_season: filterSeason,
        per_page,
        ...(page && { page }),
        ...(sortSeason && { sort_season: sortSeason }),
        ...(sortWatchers && { sort_watchers_count: sortWatchers }),
      });
      const text = worksToText(data.works, data.total_count);
      return { content: [{ type: "text", text }] };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        content: [{ type: "text", text: `検索に失敗しました: ${message}` }],
        isError: true,
      };
    }
  }
);

// --- get_anime_by_ids: 作品IDで取得
server.registerTool(
  "get_anime_by_ids",
  {
    description:
      "Get anime works by Annict work IDs. Use when the user has specific work IDs or wants details for known IDs.",
    inputSchema: GetAnimeByIdsInputSchema,
  },
  async ({ ids }) => {
    try {
      const data = await fetchWorks({ filter_ids: ids, per_page: ids.length });
      const text = worksToText(data.works, data.total_count);
      return { content: [{ type: "text", text }] };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        content: [{ type: "text", text: `取得に失敗しました: ${message}` }],
        isError: true,
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Anime MCP Server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
