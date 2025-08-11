# Word Wolf Game 🐺

AI技術を活用したワードウルフゲームのWebアプリケーション

## フロントエンド技術スタック

- **React, TypeScript** - UIライブラリ
- **Vite** - ビルドツール
- **TailwindCSS** - CSSフレームワーク
- **Axios, ReactQuery** - HTTP通信
- **swagger-typescript-api** - API型定義自動生成

## API技術スタック

- **FastAPI** - モダンなPython Webフレームワーク
- **Pydantic** - データバリデーション
- **Uvicorn** - ASGI Webサーバー
- **OpenAPI/Swagger** - API仕様書自動生成

## ビジネスロジック技術スタック

- **OpenAI API (GPT-3.5-turbo)** - AIテーマ生成
- **LangGraph** - LLMワークフローオーケストレーション

## インフラ技術スタック

- **Docker & Docker Compose** - コンテナ化
- **マイクロサービス構成** - Frontend / API / LLM の3サービス
- **ポート構成**:
  - Frontend: 5173
  - API: 8000  
  - LLM: 8100

## 環境構築手順

### 1. 前提条件
- Docker & Docker Compose

### 2. セットアップ
```bash
# リポジトリクローン
git clone <repository-url>
cd word_wolf

# 環境変数設定（任意）
echo "OPENAI_API_KEY=your_api_key" > .env

# Docker環境起動
docker-compose up -d

# 動作確認
curl http://localhost:5173   # Frontend
curl http://localhost:8000/docs  # API仕様書
curl http://localhost:8100/docs  # LLM API仕様書
```

### 3. 開発環境
```bash
# デバッグ機能付きで起動
docker-compose -f docker-compose.debug.yml up -d
```

## 型自動生成手順

FastAPIのOpenAPIスキーマからTypeScript型定義を自動生成：

```bash
# 1. APIサービス起動確認
curl http://localhost:8000/health

# 2. 型定義自動生成
cd front_end
npm run generate-api

# 3. 生成ファイル確認
cat src/lib/types.ts
```

### 生成される内容
- **API型定義**: リクエスト/レスポンスの型
- **Enum**: DifficultyLevel, Role などの列挙型
- **Interface**: GameResponse, PlayerInfo などの構造体

### メリット
- ✅ 型安全性（コンパイル時エラー検出）
- ✅ API仕様とフロントエンドの自動同期
- ✅ IntelliSenseによる開発効率向上

## その他

### ゲームルール
1. 3〜10人でプレイ
2. 多数派（村人）と少数派（ウルフ）に異なるお題が配布
3. 議論後、ウルフを見つけ出す

### 主要API
```bash
# ゲーム作成
POST /game/create
{
  "players": ["Player1", "Player2", "Player3"],
  "wolf_count": 1,
  "difficulty": "normal"
}

# テーマ生成
POST /llm/generate-themes
{
  "difficulty": "normal",
  "category": "食べ物"
}
```

### 開発コマンド
```bash
# フロントエンド
npm run dev           # 開発サーバー
npm run build         # ビルド
npm run generate-api  # 型定義生成

# ログ確認
docker-compose logs -f frontend
docker-compose logs -f api
docker-compose logs -f llm
```

### トラブルシューティング
```bash
# ヘルスチェック
curl http://localhost:8000/health
curl http://localhost:8100/health

# コンテナ再起動
docker-compose restart

# 完全再構築
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---
**Happy Gaming! 🎮**