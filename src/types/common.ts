import { z } from "zod";

/** クール名（春・夏・秋・冬・通年）の Zod enum */
export const SeasonName = z.enum(["spring", "summer", "autumn", "winter", "all"]);
export type SeasonName = z.infer<typeof SeasonName>;

/** 作品一覧のソート指定の Zod enum */
export const SeasonSort = z.enum(["watchers_desc", "watchers_asc", "season_desc", "season_asc"]);
export type SeasonSort = z.infer<typeof SeasonSort>;

/** 1 ページあたりの件数（1〜50、デフォルト 25） */
export const PER_PAGE = z.number().min(1).max(50).optional().default(25).describe("Results per page (max 50)");
/** ページ番号（1 以上） */
export const PAGE = z.number().min(1).optional().describe("Page number");
/** 作品ID / シリーズID / エピソードID の配列（1〜50 件） */
export const IDS = z.array(z.number().int().positive()).min(1).max(50);
