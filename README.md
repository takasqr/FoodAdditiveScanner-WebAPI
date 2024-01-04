

## 構成

- AWS VPC
- AWS Lightsail (SQLServer)
- AWS Lambda (Typescript)
- AWS API Gateway (REST API)

API Gateway 以下を VPC を経由させることで通信の安全性を高めています。
本来は Lambda と SQLServer をそのまま接続させる時はプロキシサーバーを挟まないと、パフォーマンス上の問題があります。ですが、まだそこまでアクセス数が見込めないので、AWS API Gateway のキャッシュを利用しつつ様子を見る予定です。

## Lightsail

AWS Lightsail は手軽にサーバーを建てることができるので好きなサービスの一つです。今回は VPC と Lightsail をピア接続させて利用します。

[Amazon Lightsail の外部の AWS リソースを使用するために Amazon VPC ピア接続をセットアップする | Lightsail ドキュメント](https://lightsail.aws.amazon.com/ls/docs/ja_jp/articles/lightsail-how-to-set-up-vpc-peering-with-aws-resources)

## API のセキュリティ

| ステータス | 項目 |
|---|---|
| 🚧 | Key による認証 |
| 🚧 | AWS IAM による認証 |


| マーク | ステータス |
|---|---|
| ✅ | 対応済み |
| 🚧 | 今後対応予定 |

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