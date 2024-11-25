### 始める前に

> window環境での利用を想定しています

1.  **node** と **npm** のversionを確認↓ **vsCodeのターミナル**

- [ ] `node -v`　**v22.11.0** ならok

> 違った場合、[https://nodejs.org/en/download/source-code](https://nodejs.org/en/download/source-code)から **v22.11.0(LTS)** をインストール
> → **node-v22.11.0-x64.msi** を開き、セットアップ後、再度`node -v`

- [ ] `npm -v`　**v10.9.1** ならok

> 違った場合、`npm install -g npm`、完了後、再度`npm -v`

2.   **PostgreSQL** のインストール

- [ ] **コマンドプロンプト** で`psql -U postgres`が実行できるようになればok

設定したパスワードを後ほど使います

> 学科HPからmsd先生のデータベースの資料を見ると良いです

### 実行手順

**初回**
**vsCodeのターミナル** で
1. `git clone https://github.com/kwyr0928/giftbox-app.git`
2. `cd giftbox-app`
3. `code .` 新しく開いたウィンドウに移動
4.  一番外側に **.env** ファイルを作成（ **package.json** と同じ階層）
5. **.env** ファイル内に以下を記述

> DATABASE_URL="postgresql://postgres:**password**@localhost:5432/giftbox-app"

**password** の部分を自分の **PostgreSQL** の **postgres** のパスワードに変更

7. `npm install`
8. `npm run db:push`
9. `npm run dev`
- [http://localhost:3000/](http://localhost:3000/)で接続できるか確認

**二回目以降**
1. `git pull origin main`
2. `npm install`
3. `npm run db:push`

### 作業上の注意

- ブランチを切って作業してください
- mainに直接マージせず、プルリクを送ってください

↑分からなければ別途説明します
