# 要件定義（MVP）

## 重要事項
実装を開始する前に、必ず以下のドキュメントを読むこと。

- ./design-guidelines.md

デザインに関する判断は、design-guidelines.md を最優先とする。

---

## 概要
ジャンルレスな「ブックマークまとめサイト」を作成する。

- 主役は「まとめページ」
- 閲覧は誰でも可能（会員登録なし）
- 投稿・管理は管理者（自分）のみ

1つのまとめを1つのコンテンツとして扱い、SEO流入を狙う。

---

## 想定ユーザー

### 一般ユーザー
- 会員登録なし
- 公開されているまとめを閲覧できるのみ

### 管理ユーザー
- 1人のみ（自分）
- `/admin` 配下から操作
- Basic認証でアクセス制限

---

## 技術スタック
- フレームワーク：Next.js（App Router）
- スタイリング：Tailwind CSS
- Backend / DB：Supabase
- ホスティング：Vercel（想定）

---

## 機能要件

### 1. まとめ（Collections）

#### 項目
- id
- slug（必須・ユニーク）
- title（必須）
- description（必須・導入文）
- target_audience（任意）
- status
  - draft（下書き）
  - published（公開）
- created_at
- updated_at

#### URL仕様
- 詳細ページのURLは `/collections/[slug]` を基本とする
- slug は一意であること
- 内部的な fallback として id を使用してもよい

#### 仕様
- 公開状態が `published` のもののみ一般公開
- 初期状態でまとめが0件でも正常に動作すること

---

### 2. ブックマーク（Bookmarks）

#### 項目
- id
- collection_id
- title（必須）
- url（必須）
- comment（必須）
- position（表示順）
- created_at

#### 仕様
- 1つのまとめにつき **約10件** を想定
- 管理画面で並び順を変更できる

---

## ページ構成

### トップページ `/`
- 公開中のまとめ一覧を表示
- 新着順
- データが0件でもレイアウトが崩れないこと

---

### まとめ詳細ページ `/collections/[slug]`
- タイトル
- 導入文
- 対象読者
- ブックマーク一覧
  - サイト名
  - 外部リンク
  - コメント
- 作成日 / 更新日

---

## 管理画面 `/admin`
- Basic認証必須
- 以下の操作が可能
  - まとめの作成 / 編集 / 削除
  - 公開・非公開の切り替え
  - ブックマークの追加 / 編集 / 削除
  - ブックマークの並び順変更

※ UIは最小限でよい（装飾より操作性を優先）

---

## SEO / OGP
- Next.js の Metadata API を使用する
- 各まとめページで以下を動的に生成する
  - title：Collection.title
  - description：Collection.description
- OGP
  - og:title：Collection.title
  - og:description：Collection.description
- `/admin` 配下は noindex

---

## セキュリティ
- Supabase の Row Level Security（RLS）を必ず有効化する
- anon ロール
  - select のみ許可
- 管理操作（insert / update / delete）
  - service_role または管理者セッションのみ許可

---

## 初期データ
- 初期状態はデータ0件でも動作する
- 本番公開後、管理画面から
  - 3〜5本のまとめを手動で登録する想定

---

## 将来検討事項（MVP外）
- 管理画面において、URL入力時にリンク先の title を自動取得する機能
- 実装する場合は Route Handler 等を用いた簡易取得とする

---

## MVPでやらないこと
以下はMVPでは実装しない。

- 一般ユーザーの会員登録
- コメント機能
- いいね / ブックマーク機能
- タグ / 検索機能
- SNS連携
- 収益機能（広告・アフィリエイト）
