

## API のセキュリティ


| マーク | ステータス |
|---|---|
| ✅ | 対応済み |
| 🚧 | 今後対応予定 |


| ステータス | 項目 |
|---|---|
| 🚧 | Key による認証 |
| 🚧 | AWS IAM による認証 |


## デプロイ方法

ディレクトリを移動する
```
cd sam-app
```

SAM プロジェクトをビルド
```
sam build
```

SAM プロジェクトをデプロイ
```
sam deploy --guided
```