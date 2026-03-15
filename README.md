# Anime MCP Server

Annict REST API（[作品](https://developers.annict.com/docs/rest-api/v1/works)・[シリーズ](https://developers.annict.com/docs/rest-api/v1/series)・[エピソード](https://developers.annict.com/docs/rest-api/v1/episodes)）を使い、アニメの検索を行う [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) サーバーです。

## 必要なもの

- Node.js 22+
- [Annict](https://annict.com/) のアクセストークン（[アプリ設定](https://annict.com/settings/apps)で発行）

## セットアップ

```bash
npm install
cp .env.example .env
# .env に ANNICT_ACCESS_TOKEN を設定
npm run build
```

## 環境変数

| 変数名 | 必須 | 説明 |
|--------|------|------|
| `ANNICT_ACCESS_TOKEN` | ✅ | Annict API のアクセストークン。[アプリ設定](https://annict.com/settings/apps)で取得。 |

起動時に `dotenv` で `.env` を読み込むため、MCP の設定で `env` を渡さずともプロジェクト直下の `.env` でトークンを指定できます。

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

```
src/
├── api/annict.ts    # Annict API (works / series / episodes)
├── config.ts        # 環境変数・定数
├── index.ts         # エントリ (MCP サーバー起動)
├── types/
│   ├── index.ts     # レスポンス型・Zod ツールスキーマ
│   └── api.ts       # リクエスト用型
├── tools/           # MCP ツール登録
│   ├── index.ts
│   ├── works.ts     # 作品ツール
│   ├── series.ts    # シリーズツール
│   └── episodes.ts  # エピソードツール
└── utils/
    ├── format.ts    # 作品・シリーズ・エピソードのテキスト整形
    └── result.ts    # ツール返却用 (ok / err / wrap)
```

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

- [Annict REST API - 作品](https://developers.annict.com/docs/rest-api/v1/works)
- [Annict REST API - シリーズ](https://developers.annict.com/docs/rest-api/v1/series)
- [Annict REST API - エピソード](https://developers.annict.com/docs/rest-api/v1/episodes)
- [MCP - Server concepts](https://modelcontextprotocol.io/docs/learn/server-concepts)
- [MCP - Build a server (TypeScript)](https://modelcontextprotocol.io/docs/develop/build-server#typescript)
