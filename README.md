# Bookmark Collections

ジャンルレスなブックマークまとめサイト。

## Docs
- docs/requirements.md
- docs/design-guidelines.md

## Development

```sh
make up
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開く。

## Commit Message

- 原則、日本語で記載する（英語でしか表現できない場合は英語も可）
- メッセージには接頭辞を付ける
- 形式は `接頭辞: 内容` を推奨
- 2行目以降（本文/詳細）は任意で自由に記載してよい

例:

```
feat: コレクション一覧ページを追加
fix: 404 ページの表示を修正
docs: 開発手順を README に追記
```

| 接頭辞 | 備考 |
| --- | --- |
| feat | 新機能 |
| fix | バグ修正 |
| docs | ドキュメントのみの変更 |
| style | コードの意味に影響を与えない変更（空白、フォーマット、セミコロンの欠落など） |
| refactor | バグを修正も機能も追加しないコード変更 |
| perf | パフォーマンスを向上させるコード変更 |
| test | 足りないテストを追加するか既存のテストを修正する |
| build | ビルドシステムまたは外部の依存関係に影響する変更（スコープの例：gulp、broccoli、npm） |
| ci | CI構成ファイルとスクリプトへの変更（スコープ例：Travis、Circle、BrowserStack、SauceLabs） |
| chore | srcやテストファイルを変更しないその他の変更 |
| revert | 前のコミットを元に戻す |
