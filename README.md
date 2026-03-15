# Anime MCP Server

Annict REST APIを使い、アニメの検索・人物・団体・スタッフ・放送予定の取得を行う [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) サーバーです。

## 必要なもの

- Node.js 22+
- [Annict](https://annict.com/) のアクセストークン（[アプリ設定](https://annict.com/settings/apps)で発行）

## セットアップ

```bash
npm install
cp .env.example .env
# .env に ANNICT_ACCESS_TOKEN **を設定**
npm run build
```

## 環境変数

**`ANNICT_ACCESS_TOKEN`**（必須）— Annict API のアクセストークン。[アプリ設定](https://annict.com/settings/apps)で取得。`.env` に書くか、MCP 設定の `env` で渡す。

## 提供ツール

### 作品（works）

| ツール名 | 説明 |
|----------|------|
| `search_anime` | タイトルで作品を検索（例: しろばこ, shirobako） |
| `search_anime_by_season` | 放送クール（年・季節）で検索（例: 2024年春, 2016年秋） |
| `get_anime_by_ids` | 作品IDのリストで作品情報を取得 |

### シリーズ（series）

| ツール名 | 説明 |
|----------|------|
| `search_series` | シリーズ名で検索（例: ソードアート, Sword Art） |
| `get_series_by_ids` | シリーズIDのリストでシリーズ情報を取得 |

### エピソード（episodes）

| ツール名 | 説明 |
|----------|------|
| `get_episodes_by_work_id` | 作品IDに紐づくエピソード一覧を取得（話数順など） |
| `get_episodes_by_ids` | エピソードIDのリストでエピソード情報を取得 |

### 人物（people）

| ツール名 | 説明 |
|----------|------|
| `search_people` | 名前で人物を検索（声優・スタッフなど。例: 井上, 水瀬いのり） |
| `get_people_by_ids` | 人物IDのリストで人物情報を取得 |

### 団体（organizations）

| ツール名 | 説明 |
|----------|------|
| `search_organizations` | 名前で団体を検索（制作会社など。例: 株式会社, P.A.WORKS） |
| `get_organizations_by_ids` | 団体IDのリストで団体情報を取得 |

### スタッフ（staffs）

| ツール名 | 説明 |
|----------|------|
| `get_staffs_by_ids` | スタッフIDのリストでスタッフ情報を取得 |
| `get_staffs_by_work_id` | 作品IDに紐づくスタッフ一覧を取得（監督・アニメーション制作など） |

### 放送予定（programs）

| ツール名 | 説明 |
|----------|------|
| `get_my_programs` | 認証ユーザーの放送予定を取得。日時範囲・作品ID・未視聴・再放送で絞り込み可能。`ANNICT_ACCESS_TOKEN` 必須。 |

## Cursor / Claude Desktop での使い方

MCP サーバーとして登録します。

**Cursor** の MCP 設定、または **Claude Desktop** の `claude_desktop_config.json` に追加例:

```json
{
  "mcpServers": {
    "anime": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/anime-mcp/build/index.js"],
      "env": {
        "ANNICT_ACCESS_TOKEN": "your_annict_token"
      }
    }
  }
}
```

`/ABSOLUTE/PATH/TO/anime-mcp` をプロジェクトの絶対パスに置き換えてください。トークンは `env` で渡すか、プロジェクト直下に `.env` を置いても読み込まれます。

## プロジェクト構成

- **api/** — Annict API クライアント（`client.ts` + works, series, episodes, people, organizations, staffs, programs）
- **types/** — リクエスト型（`api.ts`, `common.ts`）と各リソースの型・Zod スキーマ
- **tools/** — MCP ツール登録（リソースごと 1 ファイル）
- **utils/format/** — リソース別テキスト整形（`common.ts` + 各リソース）
- **utils/result.ts** — ツール返却（ok / err / wrap）

## 開発

```bash
npm run build        # ビルド (tsc + tsc-alias)
npm start            # ビルド済み index.js を実行
npm run dev          # tsc --watch
npm run lint         # ESLint
npm run lint:fix     # ESLint 自動修正
npm run format       # Prettier でフォーマット
npm run format:check # フォーマットチェック
```

## 参考

- [Annict REST API](https://developers.annict.com/docs/rest-api)
- [MCP](https://modelcontextprotocol.io/)（[Server concepts](https://modelcontextprotocol.io/docs/learn/server-concepts) / [Build a server](https://modelcontextprotocol.io/docs/develop/build-server#typescript)）
