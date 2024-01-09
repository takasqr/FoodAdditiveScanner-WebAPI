# 添加物スキャナーのバックエンド

添加物スキャナーはどんな食品添加物が使われているか簡単に調べられるアプリです。食品の添加物ラベルを読み取り、その内容をAI技術を活用して自動的に認識し、分析結果を表示します。

バックエンドのソースコードです。ソースコードは基本的な機能を備えた、Ver.1 まで公開する予定です。


## 技術構成

- AWS VPC
- AWS Lightsail (SQLServer)
- AWS Lambda (Typescript)
- AWS API Gateway (REST API)
- Cloud Functions for Firebase

API Gateway 以下を VPC を経由させることで通信の安全性を高めています。
本来は Lambda と SQLServer をそのまま接続させる時はプロキシサーバーを挟まないと、パフォーマンス上の問題があります。ですが、まだそこまでアクセス数が見込めないので、AWS API Gateway のキャッシュを利用しつつ様子を見る予定です。

OCR 機能で Google Cloud の Cloud Vision を利用しています。Cloud Vision を利用するのに相性がよく、手軽だった Firebase を利用しました。

## ルール
- ステージング環境のリソース名には`-Staging`と接尾辞を付ける
- 本番環境のリソース名には何も付けない。`-Puroduction`とか付けない

## Lightsail

AWS Lightsail は手軽にサーバーを建てることができるので好きなサービスの一つです。今回は VPC と Lightsail をピア接続させて利用します。

[Amazon Lightsail の外部の AWS リソースを使用するために Amazon VPC ピア接続をセットアップする | Lightsail ドキュメント](https://lightsail.aws.amazon.com/ls/docs/ja_jp/articles/lightsail-how-to-set-up-vpc-peering-with-aws-resources)

SQLServer をインストールして IP アドレスを有効化して Lambda からアクセスします。

[レッスン 2: 別のコンピューターからの接続 | Microsoft SQL ドキュメント](https://learn.microsoft.com/ja-jp/sql/relational-databases/lesson-2-connecting-from-another-computer?view=sql-server-ver16)

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

## API Gateway

- 本番環境、ステージング環境の２つの API を作る
- 本番環境は SAM でテンプレートから自動デプロイ、ステージングは手動で設定しながらテストする
- API にカスタムドメインを割り当てる
- API のステージは`v1`から始めて大幅な変更を加える時にバージョンアップする

## Lambda

- 本番環境、ステージング環境の２つの API を作る
- 本番環境は SAM でテンプレートから自動デプロイ、ステージングは手動で設定しながらテストする
- ハンドラは`app.lambdaHandler`とする。`export const lambdaHandler = async ...`とコードを書き始めるため
- タイムアウトは30秒。API Gateway と合わせるため
- VPC に接続して DB に接続する
- 環境変数を活用する。機密情報は暗号化する

[VPC によるプライベートネットワーク | AWS Lambda デベロッパーガイド](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/foundation-networking.html)





## SAM

ローカルで実行する。

```
sam local start-api
```

## トラブル対応履歴

[こちら](https://github.com/takasqr/FoodAdditiveScanner-WebAPI/issues?q=label%3Abug)から確認できます。

## ソースコード

- [FoodAdditiveScanner-LP](https://github.com/takasqr/FoodAdditiveScanner-LP)
- [FoodAdditiveScanner-iOS
](https://github.com/takasqr/FoodAdditiveScanner-iOS)
- [FoodAdditiveScanner-Android
](https://github.com/takasqr/FoodAdditiveScanner-Android)
- [FoodAdditiveScanner-WebApp
](https://github.com/takasqr/FoodAdditiveScanner-WebApp)
- [FoodAdditiveScanner-WebAPI
](https://github.com/takasqr/FoodAdditiveScanner-WebAPI)
