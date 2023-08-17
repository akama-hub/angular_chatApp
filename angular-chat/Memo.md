### プロジェクトの立ち上げ

    ng new angular-caht --prefix=ac

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
