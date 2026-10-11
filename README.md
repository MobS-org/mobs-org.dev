# MobS website

サイトURL: [https://mobs-org.dev](https://mobs-org.dev)

MobSの紹介サイト。日本語（`/`）・英語（`/en/`）に対応。

GitHub ActionsでPush時にビルド・チェックを実行します。Cloudflare Pagesへの自動公開は、Pagesプロジェクト `mobs-org-dev` を作成し、リポジトリのSecretsに `CLOUDFLARE_API_TOKEN`・`CLOUDFLARE_ACCOUNT_ID`、Variablesに `SITE_URL=https://mobs-org.dev`・`CLOUDFLARE_DEPLOY_ENABLED=true` を設定すると有効になります。
