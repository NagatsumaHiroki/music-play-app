# Gitワークフロー

## コミットメッセージ形式
```
<type>: <説明>

<オプションの本文>
```

タイプ: feat, fix, refactor, docs, test, chore, perf, ci

注: 帰属表示は ~/.claude/settings.json でグローバルに無効化されています。

## プルリクエストワークフロー

PR作成時:
1. 最新コミットだけでなく、完全なコミット履歴を分析
2. `git diff [base-branch]...HEAD` ですべての変更を確認
3. 包括的なPRサマリーを作成
4. TODOを含むテスト計画を記載
5. 新しいブランチの場合は `-u` フラグでプッシュ

> git操作前の完全な開発プロセス（計画、TDD、コードレビュー）については、
> [development-workflow.md](./development-workflow.md) を参照してください。
