### プロジェクトの立ち上げ

    ng new angular-caht --prefix=ac

#### コンストラクターの初期化エラー
tsconfig.jsonに　```"strictPropertyInitialization": false,```　を追加しておくとエラーで怒られなくなる

### BootStrapのインストール
Bootstrapのstyleを利用していく

コマンドで

    npm install bootstrap@4.5.0 --save

angular.json の styles に　

    "./node_modules/bootstrap/dist/css/bootstrap.min.css"

を追加する.

この時、styles.cssより前に記述する

### 自動でブラウザ上にurlを打ってくれる機能の追加
package.jsonの"start"コマンドに　--open　オプションを追加する

    "start": "ng serve --open"

### クラスの作成

    ng g class class/comment


### カスタムパイプを作ってフォーマットを定義

    ng g pipe pipes/comment-date

### FireBase
https://firebase.google.com/?hl=ja

+ プロジェクトを作成(Chat id: chat-99479)
    + アナリティスクを無効(今回は)

    + "</>"の白い丸いボタンをクリック
        + firebaseのwebアプリの設定
        + Firebase Hostingも設定にチェック
        + アプリを登録
        + Firebase SDKは使わずAngular公式ライブラリをつかう
        + FIrebase CLIのインストール

            npm install -g firebase-tools
            firebase login
            以下の二つはangularのライブラリから行う
            firebase init
            firebase deploy

    + Angular公式のfirebaseライブラリのインストール
        https://github.com/angular/angularfire

        または、

        ターミナルから、

        ng add @angular/fire@6.0.2

        どのプロジェクトか聞かれるので選択していく

        buidの際にwaringが出るので、
        angular.jsonのbuildオプションのscriptsフィールドの下に
        新しくallowedCommonJsDependenciesフィールドを作成する

            "allowedCommonJsDependencies": [
              "firebase",
              "@firebase/auth",
              "@firebase/database"
            ]

        その後、型定義ファイルをインストール（vscode上で型補完をしてくれる）

        npm install @types/angularfire --save-dev

    + Firebase 設定
        + 歯車アイコンからプロジェクトの設定をクリック
        + FIrebase SDK snippetの"構成"を選択
            + オブジェクトデータの中身をコピー
                + src/environments/environment.tsのenvironmentオブジェクトの中にコピペ
                
                ※angular7ではプロジェクトの作成時にenvironmentsフォルダが自動で作成されている 

                export const environment = {
                    production: false,
                    firebase: {
                        apiKey: "",
                        authDomain: "",
                        projectId: "",
                        storageBucket: "",
                        messagingSenderId: "",
                        appId: ""
                    }
                }

                + app.module.tsにimportする

                    import { AngularFireModule} from '@angular/fire/compat';
                    import { environment } from 'environments/environment';
                    import { AngularFireAuthModule } from '@angular/fire//compat/auth';
                    import { AngularFireDatabaseModule} from "@angular/fire/compat/database";
                
            + FIrebaseでリアルタイムデータベースからデータベースの作成
                + セキュリティルールで"ロックモードで開始"
                + "ルール"タブでread, writeをtrueにすると読み書きができるようになる

            + Realtime Database の list を使ってデータを配列で保存

    + icon にはFont Awesomeを使ってみる
    パッケージインストール

        npm install @fortawesome/fontawesome-free@5.14.0 --save

    angular.jsonのstylesに

        "./node_modules/@fortawesome/fontawesome-free/css/all.min.css"

    を追加する

+ Fire base の Authenticationを使ったメール認証
    + "構築"から Authentication を選択
    + メール / パスワードを有効にする

    + 自動送信メールの設定
        + templateタブからtemplate言語の円光
        + ここで、メアドの確認、パスワードの再設定、メアドの変更などを編集できる
            + 差出人の変更や、ドメインの変更は行える

### AngularのModuleシステムについて
NgModuledデコレータを利用してmoduleの定義ができ、
import と export を使ってモジュール間の機能を共有できる

+ 一つのモジュールの中に他のモジュールをimportすることで階層構造のように使える
+ exportsでは、外のモジュールでも使える

![](/figure/module.png)

+ RootModule: アプリケーション全体で読み込む(App moduleのこと)
+ Shared Module: すべてのモジュールで共通化された共通モジュール（コンポーネントやパイプ、カスタムディレクティブなど）
+ Feature Module: 機能モジュール（画面ごとに作成するモジュール、ルーティングとセット）
+ Core Module: サービスやコンポーネントなど、一度だけ読み込めばよいモジュール
※ver7以降で削除

### AngularでAuthGuardを使ったユーザのページアクセス制御

    const routes: Routes = [
        {
            path: '',
            component: ***,
            canActivate: [AuthGuard] <=　これ
        }
    ];

Guardは配列で指定する
+ CanActivate: 対象パスへのページ遷移を許可するか
+ CanActivateChild: 対象パスの子ルートへの遷移を許可するか
+ CanDeactivate: 現在のパスから他のパスへの遷移を制限するか
+ Canload: loadChildrenでモジュールを読み込むかどうか
+ Resolve: ルーティングの遷移中の中間処理を指定する

コマンドで ```ng g guard ファイル名``` を実行すると、
上記のどれについて記述するか聞かれるので選択して作成する


### Firebaseアプリケーションの公開
コマンドで```firebase use --add```を実行すると、
アプリケーションIDを聞かれるので、firebaseのwebページの歯車アイコン（設定）からアプリケーションIDを調べてきて、それを選択

    ng build --configuration production
    # ng build --prod   <-　ver14から上に変更となった

本番環境用のプロダクション用のbuildが行える。

本番環境になると、environments/environemnt.tsではなくenvironments/environemnt.prod.tsが読み込まれるので、
environments/environemnt.prod.tsにもfirebaseのコンフィグが必要。
逆に言えば、このコンフィグを編集することでデプロイ先の変更ができる。

このビルドされたファイルをfirebaseホスティングにデプロイする

    firebase experiments:enable webframeworks
    firebase deploy

hosting URLに公開URLが書いてある

このプロジェクトは、
+ Project Console: https://console.firebase.google.com/project/chat-99479/overview
+ Hosting URL: https://chat-99479.web.app


### 関連ライブラリ
+ BootStrap: https://ng-bootstrap.github.io/#/home
 
    cssやコンポーネントのダウンロードができる

+ Angular Material: https://material.angular.io/
 
    コンポーネントのダウンロードができる

+ Swiper: https://swiperjs.com/

    javascriptのライブラリをangularようにしたものでスマホのスワイプ機能に対応している

+ NGRX: https://ngrx.io/

    状態管理用のライブラリ
