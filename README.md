# Anime MCP Server

Annict REST API の [作品 (works)](https://developers.annict.com/docs/rest-api/v1/works) エンドポイントを使い、アニメを検索する [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) サーバーです。

## 必要なもの

- Node.js 18+
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
| `ANNICT_ACCESS_TOKEN` | ✅ | Annict API のアクセストークン。[アプリ設定](https://annict.com/settings/apps)で取得してください。 |

## 提供ツール

| ツール名 | 説明 |
|----------|------|
| `search_anime` | タイトルでアニメを検索（例: 「しろばこ」「shirobako」） |
| `search_anime_by_season` | 放送クール（年・季節）で検索（例: 2024年春、2016年秋） |
| `get_anime_by_ids` | 作品IDのリストで作品情報を取得 |

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

`/ABSOLUTE/PATH/TO/anime-mcp` を実際のプロジェクトの絶対パスに置き換えてください。トークンは `env.ANNICT_ACCESS_TOKEN` で渡すか、`.env` を読み込むようにして用意してください。

## 開発

```bash
npm run build   # ビルド
npm start       # build/index.js を実行
```

## 参考

- [Annict REST API - 作品](https://developers.annict.com/docs/rest-api/v1/works)
- [MCP - Server concepts](https://modelcontextprotocol.io/docs/learn/server-concepts)
- [MCP - Build a server (TypeScript)](https://modelcontextprotocol.io/docs/develop/build-server#typescript)
