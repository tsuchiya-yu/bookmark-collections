# データベース設計（MVP）

## テーブル概要

### collections（まとめ）
- 役割: ブックマークの「まとめ」単位。公開/非公開の切り替えと URL 用 slug を持つ。
- 主なカラム: `title`, `description`, `slug`, `is_public`, `created_at`, `updated_at`

### bookmarks（ブックマーク）
- 役割: 1つのまとめに属するリンク群。`position` で並び順を管理する。
- 主なカラム: `collection_id`, `title`, `url`, `position`, `created_at`, `updated_at`

## RLS 方針（MVP）

- 匿名閲覧のみ許可
- `collections.is_public = true` の行のみ `select` 可能
- `bookmarks` は紐づく `collections` が public の場合のみ `select` 可能
- `insert/update/delete` はすべて禁止（ポリシー未定義）

## SQL の正

SQL 定義は migration を唯一の正とします。  
内容は以下のファイルを参照してください。

- `supabase/migrations/20250212000000_init_bookmark_schema.sql`
