# 紹介文の確認元

確認日: 2026-10-10

## 掲載する論文

- DOI: https://doi.org/10.14923/transinfj.2025PDP0011
- 出版社: https://search.ieice.org/bin/summary.php?abst=&category=A&id=j109-d_4_137&lang=J&year=2026
- 和文題名: サプライチェーン全体での依存関係管理を支援するコンソーシアム型ソフトウェア依存関係管理手法の提案
- 英文題名: Proposal of a Consortium-Type Software Dependency Management Method to Support Dependency Management in the Entire Supply Chain
- 著者: 池上 峻平（Shumpei Ikegami）、高野 知佐（Chisa Takano）、稲村 勝樹（Masaki Inamura）
- 出版情報: 電子情報通信学会論文誌 D, Vol. J109-D, No. 4, pp. 137–148, 2026-04-01
- 早期公開日: 2025-12-02

公開あらましを確認し、手法を短く要約しています。全文の転載やPDFの再配布はしていません。論文での実装・評価を、現在のMobSの製品完成度や本番運用の実績として表現しません。

## 掲載する目的と現在の段階

ユーザーが示した中心的な目的は、ソフトウェアの利用者がベンダーへの信頼を前提にせず、依存関係を自ら検証できるようにすることです。トップ、課題説明、ZK検証の説明図を、この利用者視点に合わせています。

検証の対象は登録された情報に対する依存関係の主張として説明します。登録内容と実際のソフトウェア構成の一致まで、ゼロ知識証明だけで保証できるとは表現しません。独自性はこの目的によって説明し、世界初・唯一といった比較の裏付けがない表現は使用しません。

SBOMや依存関係の検証は、脆弱性の影響を調べる手がかりとして説明します。影響の有無を判断するには、部品の使われ方なども確認する必要があります。依存関係だけで影響の有無まで検証できるとは表現しません。OpenVEXの仕様でも、部品の存在と脆弱なコードの実行経路を区別しています。https://github.com/openvex/spec/blob/main/OPENVEX-SPEC.md

具体的な機能や構成、提供方法は未確定です。個別の実装やリポジトリの紹介、API・CLIなどの機能一覧、未確定の製品構成は掲載しません。

## 課題の具体例と「なぜ今か」

- Log4Shell: 2021年に公表されたLog4jの脆弱性（CVE-2021-44228）。依存する部品の問題が、それを使うソフトウェアにも影響しうる事例として挙げています。https://logging.apache.org/security.html
- XZ Utils: 2024年3月に発覚したバックドア混入（CVE-2024-3094）。Red Hatの報告では、5.6.0と5.6.1に悪意あるコードが含まれ、ビルドや利用環境によって影響が異なります。Log4Shellと合わせ、問題のある部品やバージョンへの依存を利用者が確かめる必要性を説明します。依存関係の検証だけでバックドアを発見・防止できるとは表現しません。https://www.redhat.com/en/blog/urgent-security-alert-fedora-40-and-rawhide-users
- npm / Shai-Hulud: 2025年9月に報告された、npmパッケージを通じて広がる攻撃。GitHubの報告では、侵害されたメンテナーのアカウントを使い、JavaScriptパッケージのインストール後のスクリプトに悪意あるコードが混入しました。Log4Shell、XZ Utilsと合わせて短く紹介し、問題のある部品やバージョンへの依存を確認する必要性につなげます。MobSによる攻撃の検出・防止を保証するとは表現しません。https://github.blog/security/supply-chain-security/our-plan-for-a-more-secure-npm-supply-chain/
- EUサイバーレジリエンス法（CRA、Regulation (EU) 2024/2847）: 対象製品の製造者にSBOMの作成を求めます。報告義務は2026-09-11から、主な義務は2027-12-11から適用。利用者への公開や取引先への共有が一律の義務であるとは説明しません。作成は附属書I第II部(1)、利用者に提供する場合の案内は附属書II(9)を参照。https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act / https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R2847
- 経済産業省「ソフトウェア管理に向けたSBOM（Software Bill of Materials）の導入に関する手引ver2.0」: 2024-08-29公表。SBOMの取引モデル（発注者と受注者の契約での取り決め）を含みます。https://www.meti.go.jp/press/2024/08/20240829001/20240829001.html

CRAによるSBOMの作成義務と、取引先への共有に関する実務上の取り決めを分けて説明します。MobSが規制への対応を保証するとは表現しません。

## アプローチと既存手法との関係

ゼロ知識証明とブロックチェーンを使う理由を、利用者の視点で説明しています。ブロックチェーンについては、暗号資産の発行や取引を目的としないことを明記しています。

既存手法（SBOMの個別共有、ベンダーの回答・VEX、Sigstore・SLSAなどの署名・来歴の証明）は、優劣ではなく「できること」と「残る課題」で比較し、MobSはこれらを置き換えず組み合わせて使う想定と記載しています。

## チームと連絡先

メンバーの表示名・役割とGitHubのプロフィールを掲載しています。表示名はユーザーの指定により、日本語ページで「いけぺ〜」、英語ページで「ikepe」とします。論文とのつながりを示すため、関連論文の第一著者（池上 峻平）であることを、ユーザーの確認を得て併記しています。

- いけぺ〜 / ikepe（池上 峻平）: https://github.com/ikepe / 研究・開発、関連論文の第一著者
- Huyu2239: https://github.com/Huyu2239 / 開発

GitHub組織の他のメンバーは、ユーザーの指示により掲載しません。

連絡先は共通アドレス contact@mobs-org.dev のみを掲載し、個人のメールアドレスは載せません。

## 名前の由来

MobSは「SBOM」を逆から読んだ名前です。提供する側が開示するSBOMに対し、受け取る側から確かめるという考え方の説明として、フッターに記載しています（ユーザーが選んだ案）。

## 図と表記

トップの図は、土や霧に隠れた根のネットワークの中で、一つの経路だけを確かめるイメージです。依存関係の全体を明かさず、特定の関係を検証する考え方を、植物と根で表現します。

トップのイメージ図は`src/assets/dependency-verification.webp`です。ユーザー指定のプロンプトで内蔵の`image_gen`を使って生成し、正方形のWebP形式で掲載します。日英で同じ画像を使用し、代替テキストを翻訳しています。画像下のキャプションは表示しません。

<details>
<summary>画像生成プロンプト</summary>

```text
Minimal editorial illustration, cross-section of soil on an off-white background.
Above the ground line, a small young plant. Below, a dense network of roots,
mostly hidden and softened by layers of soil and mist. Only one root, from the stem
down to a single small node, is clearly visible and outlined in deep forest green,
as if traced by a fine line. Flat shapes, subtle paper grain, lots of negative space.
Limited palette: off-white #f8f9f5, ink green #19271f, forest green #416844,
pale lime #d9ebc4. Calm, scientific, quiet. Square composition. No text.

Negative prompt:
text, letters, numbers, logo, watermark, neon glow, blockchain cubes, chains, coins,
bitcoin, padlock, circuit board, hacker, dark background, cyberpunk, UI screenshot
```

</details>

SNS共有用画像は`src/assets/social-ja.png`と`social-en.png`です。各言語のトップの見出しとトップのイメージ図を組み合わせ、1200 × 630で作成しています。見出しを変更したときは、共有用画像も作り直します。

プロジェクト名は通常のテキストで表記します。独自のロゴや図形のマークは使用しません。

## 支援担当者向けの内容

ユーザーの目的は、スタートアップ支援プログラムなどへの応募を念頭に置いた開発支援の獲得です。研究を踏まえた実装と評価を進めるための、開発ツールや検証環境の支援を求める旨を記載しています。

支援プログラムへの採択、導入企業、製品へのAI機能の搭載といった実績は記載しません。具体的な支援条件や金額も掲載しません。支援や共同での検証についての連絡は、contact@mobs-org.devで受け付けます。特定の支援プログラム名は本文に書かず、複数のプログラムへの応募で共通して使える内容にしています。
