# AGENTS

このリポジトリで Codex がスムーズに作業するための最小ガイド。

## TL;DR

- 起動: `make up`
- 停止: `make down`
- Supabase スキーマの正: `supabase/migrations/20250212000000_init_bookmark_schema.sql`
- 読み取り用 Supabase: `lib/supabase/`

## 開発フロー

- ローカル起動: `make up`
- 停止: `make down`
- Supabase 再初期化（ローカル）: `npx supabase db reset`

## ディレクトリ構成と責務

- `app/`: Next.js App Router（Server Components 前提）
- `lib/supabase/`: Supabase の server client / queries / types
- `supabase/migrations/`: DB 定義の正（README や docs は参照のみ）
- `docs/`: 設計・ガイド類

## Supabase 前提

- 読み取り専用（匿名 select のみ）
- 書き込み処理は現状不要
- 今後 Auth を入れる想定だが、現時点では user_id は未追加

## 環境変数

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`（現状未使用）

## コーディング方針（MVP）

- Server Component で完結する構成を優先
- キャッシュ（revalidate / cache）は現時点で使わない
- UI は最小・検証優先

## コミットルール

- 原則、日本語（必要なら英語も可）
- `接頭辞: 内容` の形式
- 2行目以降は任意
- 接頭辞一覧は `README.md` を参照
