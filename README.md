# Life Assistant Agent App

AI搭載のフルスタック生活支援アプリケーション

## 概要

Life Assistant Agent Appは、最新のWeb技術とAIを組み合わせた生活支援アプリケーションです。クリーンアーキテクチャパターンに基づいて設計され、スケーラブルで保守性の高いコードベースを実現しています。

## 技術スタック

### フロントエンド
- **Next.js 16** - App Router
- **React 19** - UI構築
- **TypeScript** - 型安全性
- **Tailwind CSS 4** - スタイリング
- **Clerk** - 認証・ユーザー管理

### バックエンド
- **FastAPI** - 高速APIフレームワーク
- **Python 3.13** - 最新のPython
- **SQLAlchemy 2.0+** - 非同期ORM
- **Alembic** - データベースマイグレーション
- **PostgreSQL 17** - データベース

### AI・外部サービス
- **OpenAI API** - AI機能統合
- **Clerk** - JWT認証

### インフラストラクチャ
- **Docker & Docker Compose** - コンテナオーケストレーション
- **UV** - 高速Pythonパッケージマネージャー

## アーキテクチャ

### バックエンド構造（クリーンアーキテクチャ）

```
server/app/
├── api/v1/           # API層（プレゼンテーション層）
│   ├── router.py     # APIルーターの集約
│   └── llm.py        # LLM関連エンドポイント
├── core/             # コア機能（横断的関心事）
│   ├── security.py   # JWT認証・セキュリティ
│   └── dependencies.py # 依存性注入
├── domain/           # ドメイン層（ビジネスロジック）
│   └── llm/          # LLM関連ドメインロジック
├── infrastructure/   # インフラストラクチャ層
│   ├── db/           # データベース（モデル、セッション）
│   └── llm_client/   # 外部AI APIクライアント
└── services/         # アプリケーションサービス
    └── user_service.py # ユーザー関連サービス
```

**データフロー**: API → Domain → Infrastructure → Database

### 認証フロー

```
クライアントリクエスト
  → Clerk JWTトークン
  → FastAPI verify_clerk_token()
  → get_current_user()
  → 保護されたエンドポイント
```

- 初回認証時、ユーザーは自動的にデータベースに作成されます
- Clerk JWTトークンをJWKSエンドポイントで検証

## セットアップ

### 前提条件

- Docker & Docker Compose
- Node.js 18+ （ローカル開発の場合）
- Python 3.13+ （ローカル開発の場合）

### 環境変数の設定

プロジェクトルートに `.env` ファイルを作成：

```bash
# Database
POSTGRES_DB=life_assistant_db
POSTGRES_USER=life_assistant_user
POSTGRES_PASSWORD=your_secure_password

# Clerk（https://clerk.com から取得）
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_FRONTEND_API_URL=https://your-app.clerk.accounts.dev
CLERK_JWKS_URL=https://your-app.clerk.accounts.dev/.well-known/jwks.json

# OpenAI
OPENAI_API_KEY=sk-...

# Backend
NEXT_PUBLIC_API_URL=http://localhost:8000
CORS_ORIGINS=http://localhost:3000

# Development
DEBUG=true
PYTHON_ENV=development
```

### アプリケーションの起動

```bash
# すべてのサービスを起動
docker-compose up

# バックグラウンドで起動
docker-compose up -d

# ログを確認
docker-compose logs -f server
docker-compose logs -f client
```

起動後、以下のURLでアクセス可能：

- **フロントエンド**: http://localhost:3000
- **バックエンドAPI**: http://localhost:8000
- **API ドキュメント**: http://localhost:8000/docs

### サービスの停止

```bash
docker-compose down
```

## 開発ガイド

### データベースマイグレーション

```bash
# マイグレーションファイルを自動生成
docker-compose exec server uv run alembic revision --autogenerate -m "説明"

# マイグレーションを適用
docker-compose exec server uv run alembic upgrade head

# マイグレーション履歴を確認
docker-compose exec server uv run alembic history

# 現在のリビジョンを確認
docker-compose exec server uv run alembic current
```

### データベースへの接続

```bash
# PostgreSQLに接続
docker-compose exec db psql -U life_assistant_user -d life_assistant_db
```

### バックエンド開発

```bash
# Pythonシェルを起動（アプリコンテキスト内）
docker-compose exec server uv run python

# 依存関係を追加
docker-compose exec server uv add パッケージ名

# 依存関係をインストール
docker-compose exec server uv sync
```

### フロントエンド開発

```bash
# lintを実行
docker-compose exec client npm run lint

# ビルド
docker-compose exec client npm run build
```

## プロジェクト構成

```
life-assistant-agent-app/
├── client/                 # Next.jsフロントエンド
│   ├── app/                # App Router
│   ├── components/         # Reactコンポーネント
│   └── lib/                # ユーティリティ
├── server/                 # FastAPIバックエンド
│   ├── alembic/            # データベースマイグレーション
│   ├── app/                # アプリケーションコード
│   │   ├── api/v1/         # APIエンドポイント
│   │   ├── core/           # コア機能
│   │   ├── domain/         # ビジネスロジック
│   │   ├── infrastructure/ # データベース・外部サービス
│   │   └── services/       # アプリケーションサービス
│   └── pyproject.toml      # Python依存関係
├── docker-compose.yml      # Docker設定
├── CLAUDE.md               # Claude Code向けドキュメント
└── README.md               # このファイル
```

## 主要機能

- **ユーザー認証**: Clerkによる安全なJWT認証
- **AI統合**: OpenAI APIを使用したインテリジェント機能
- **データベース管理**: Alembicによるバージョン管理されたマイグレーション
- **型安全性**: TypeScript（フロントエンド）、Pydantic（バックエンド）
- **非同期処理**: FastAPI + SQLAlchemy（asyncpg）による高パフォーマンス
- **レスポンシブデザイン**: Tailwind CSSによるモダンなUI
- **ダークモード**: ユーザーの好みに応じたテーマ切り替え

## データベース設計

### デュアルデータベースURL戦略

- **DATABASE_URL_ASYNC**: FastAPIの非同期操作用（asyncpgドライバー）
- **DATABASE_URL_SYNC**: Alembicマイグレーション用（psycopgドライバー）

両方とも同じPostgreSQLデータベースに接続しますが、それぞれの用途に最適化されたドライバーを使用します。

## 開発のベストプラクティス

### 新しいAPIエンドポイントの追加

1. **モデルを定義** (必要な場合): `app/infrastructure/db/models.py`
2. **サービスを作成**: `app/services/` または `app/domain/`
3. **APIエンドポイントを追加**: `app/api/v1/`
4. **ルーターを登録**: `app/api/v1/router.py`

### コーディング規約

- **FastAPI**: 常に `async`/`await` を使用
- **SQLAlchemy**: 新しい `select()` 構文を使用（レガシーな `.query()` は避ける）
- **Next.js**: デフォルトでServer Componentsを使用
- **環境変数**: クライアント側の変数には `NEXT_PUBLIC_` プレフィックスが必須

## トラブルシューティング

### サービスが起動しない

```bash
# コンテナとボリュームをクリーン
docker-compose down -v
docker-compose up --build
```

### データベース接続エラー

```bash
# データベースの健全性チェック
docker-compose exec db pg_isready -U life_assistant_user
```

### マイグレーションエラー

```bash
# マイグレーション履歴を確認
docker-compose exec server uv run alembic history
docker-compose exec server uv run alembic current

# 必要に応じてマイグレーションをロールバック
docker-compose exec server uv run alembic downgrade -1
```
