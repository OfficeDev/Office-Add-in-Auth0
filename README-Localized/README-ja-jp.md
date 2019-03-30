---
topic: sample
products:
  - Word
  - Office 365
languages:
  - JavaScript
extensions:
  contentType: samples
  technologies:
    - Add-ins
  createdDate: '9/1/2016 3:14:40 PM'
---
# <a name="archived-office-add-in-that-uses-the-auth0-service-to-simplify-social-login"></a>(アーカイブ済み) Auth0 サービスを使用してソーシャル ログインを簡略化する Office アドイン

> **注:** このリポジトリはアーカイブされており、アクティブなメンテナンスは終了しています。 プロジェクトまたはその依存関係にはセキュリティの脆弱性が存在する可能性があります。 このリポジトリのコードを再利用するか、実行することを計画している場合は、必ず最初にコードまたは依存関係に対して適切なセキュリティ チェックを実行してください。 運用 Office アドインの開始点として、このプロジェクトを使わないでください。 運用コードを開始する際は、必ず Visual Studio の Office/SharePoint 開発ワークロードか [Office アドイン用 Yeoman ジェネレーター](https://github.com/OfficeDev/generator-office)を使用するようにし、アドインを開発する際はセキュリティのベスト プラクティスに従ってください。

Auth0 サービスは、Facebook、Google、Microsoft などのオンライン サービスで提供されるソーシャル ログインを使用するプロセスを簡略化します。 このサンプルでは、Office アドインで Auth0 を使用する方法を示します。 

## <a name="table-of-contents"></a>目次
* [変更履歴](#change-history)
* [前提条件](#prerequisites)
* [プロジェクトを構成する](#configure-the-project)
* [Auth0 アカウントを作成し、Google、Facebook、および Microsoft のアカウントを使用するように構成する](#create-an-auth0-account-and-configure-it-to-use-google,-facebook,-and-microsoft-account)
* [サンプル コードに Auth0 アカウントの値を追加する](#add-your-auth0-account-values-to-the-sample-code)
* [アドインを展開する](#deploy-the-add-in)
* [プロジェクトを実行する](#run-the-project)
* [アドインを起動する](#start-the-add-in)
* [アドインをテストする](#test-the-add-in)
* [質問とコメント](#questions-and-comments)
* [その他のリソース](#additional-resources)

## <a name="change-history"></a>変更履歴

2016 年 9 月 6 日:

* 初期バージョン。

## <a name="prerequisites"></a>前提条件

* [Auth0](https://auth0.com) を使用したアカウント
* Windows 用の Word 2016 (16.0.6727.1000 以降のビルド)。
* [Node と npm](https://nodejs.org/en/) プロジェクトはパッケージ マネージャーとタスク ランナーの両方として npm を使用するように構成されます。また、開発中にアドインをホストする Web サーバーとして Lite サーバーを使用するようにも構成されるため、アドインをすばやくオンにして実行することができます。別のタスク ランナーまたは Web サーバーを使用することもできます。
* [Git バッシュ](https://git-scm.com/downloads) (またはその他の Git クライアント。)

## <a name="configure-the-project"></a>プロジェクトを構成する

プロジェクトを配置するフォルダーで、Git バッシュ シェルで次のコマンドを実行します。

1. ローカル コンピューターにこのリポジトリのクローンを作成する ```git clone {URL of this repo}```
2. package.json ファイル内のアイテム化されたすべての依存関係をインストールする ```npm install```。
3. このサンプルを実行するために必要な証明書を作成する ```bash gen-cert.sh```。 

証明書を信頼されたルート機関にするように設定します。Windows コンピューターでの手順は次のとおりです。

1. ローカル コンピューターにあるリポジトリ フォルダーで、ca.crt をダブルクリックし、**[証明書のインストール]** を選択します。 
2. **[ローカル コンピューター]** を選択して、**[次へ]** を選択して続行します。 
3. **[証明書をすべて次のストアに配置する]** を選択してから **[参照]** を選択します。
4. **[信頼されたルート証明機関]** を選択して、**[OK]** を選択します。 
5. **[次へ]**、**[完了]** の順に選択します。 

## <a name="create-an-auth0-account-and-configure-it-to-use-google-facebook-and-microsoft-account"></a>Auth0 アカウントを作成し、Google、Facebook および Microsoft のアカウントを使用するように構成する

この Readme の発行後、Auth0 によって UI と用語が変更される場合があります。UI に関する前提事項をできる限り少なくするようにしていますが、必要な場合、実行する必要のある事項の要点を理解するためにこれらの手順を確認し、それから手順に関する Auth0 のヘルプを確認していただけます。

1. Auth0 ダッシュボードで、アカウントを作成します (既存のアカウントを使用することもできます)。 アドインが対話する auth0.com 内でサブドメインとして機能するアカウント名 (例: `officeaddin.auth0.com`) を選択するよう求めるダイアログが表示されます。 この名前を書き留めておきます。
2. プロバイダーを選択するよう求めるダイアログが表示されたら、Facebook、Google および Microsoft のアカウントを選択します。 このサンプルではその他のものは使用しないため、**データベース** (または**ユーザー名とパスワードによる認証**) オプションなど、既定で有効になっているすべてのものを無効にします。 サンプルを他のプロバイダーに拡張する場合は、この設定を後で変更できます。
3. Auth0 は、アカウントに**既定のアプリ** (**クライアント**とも呼ばれる) を作成します。 このアプリの **[設定]** に移動します。
4. 後の手順で使用するので、クライアント ID を書き留めておきます。
5. **[クライアントの種類]** に、**[単一ページ アプリケーション]** を選択します。 
6. **[許可されているコールバック]** で、`https://localhost:3000/popupRedirect.html` を入力します。
7. 他のすべての設定は既定値のままにしておき、**[変更の保存]** をクリックします。

## <a name="add-your-auth0-account-values-to-the-sample-code"></a>サンプル コードに Auth0 アカウントの値を追加する

1. index.js ファイルを開き、上部付近にある次の行を探します。
```
Auth0AccountData.subdomain = '{Auth0 account subdomain}';
Auth0AccountData.clientID = '{Auth0 client ID}';
```
2. プレースホルダーを前の手順で記録した適切な文字列に置き換えます。

## <a name="deploy-the-add-in"></a>アドインを展開する

次に、Microsoft Word がアドインを検索する場所を認識できるようにする必要があります。

1. ネットワーク共有を作成するか、[フォルダーをネットワークに共有します](https://technet.microsoft.com/ja-jp/library/cc770880.aspx)。
2. プロジェクトのルートから、Office-Add-in-Auth0.xml マニフェスト ファイルのコピーを共有フォルダーに配置します。
3. Word を起動し、ドキュメントを開きます。
4. [**ファイル**] タブを選択し、[**オプション**] を選択します。
5. [**セキュリティ センター**] を選択し、[**セキュリティ センターの設定**] ボタンを選択します。
6. **[信頼されているアドイン カタログ]** を選択します。
7. **[カタログの URL]** フィールドに、Office-Add-in-Auth0.xml があるフォルダー共有へのネットワーク パスを入力して、**[カタログの追加]** を選択します。
8. **[メニューに表示する]** チェック ボックスをオンにして、**[OK]** を選択します。
9. これらの設定は Microsoft Office を次回起動したときに適用されることを示すメッセージが表示されます。Word を終了します。

## <a name="run-the-project"></a>プロジェクトを実行する

1. プロジェクトのフォルダー内でノード コマンド ウィンドウを開き、```npm start``` を実行して Web サービスを開始します。コマンド ウィンドウを開いたままにしておきます。
2. Internet Explorer または Microsoft Edge を開いて、```https://localhost:3000``` をアドレス ボックスに入力します。証明書に関する警告が表示されない場合は、ブラウザーを閉じて、「**アドインを起動する**」というタイトルのセクションに進みます。証明書が信頼されていないという警告が表示された場合は、以下の手順に進みます。
3. 警告があっても、ブラウザーにはページを開くためのリンクが表示されます。そのリンクを開きます。
4. ページが開いたら、アドレス バーに赤い証明書エラーが表示されます。エラーをダブルクリックします。
5. **[証明書の表示]** を選択します。
5. **[証明書のインストール]** を選択します。
4. **[ローカル コンピューター]** を選択して、**[次へ]** を選択して続行します。 
3. **[証明書をすべて次のストアに配置する]** を選択してから **[参照]** を選択します。
4. **[信頼されたルート証明機関]** を選択して、**[OK]** を選択します。 
5. **[次へ]**、**[完了]** の順に選択します。
6. ブラウザーを閉じます。

## <a name="start-the-add-in"></a>アドインを起動する

1. Word を再起動して、Word 文書を開きます。
2. Word 2016 の **[挿入]** タブで、**[マイ アドイン]** を選択します。(このボタンは、**[挿入]** タブではなく、**[開発]** タブにある可能性があります。**[開発]** タブを表示するには、[こちらの手順](https://support.office.com/ja-jp/article/Show-the-Developer-tab-E1192344-5E56-4D45-931B-E5FD9BEA2D45) を参照してください。)
3. **[共有フォルダー]** タブを選択します。
4. **[Auth0 を使用して認証する]** を選択して、**[OK]** を選択します。
5. ご使用の Word バージョンでアドイン コマンドがサポートされている場合、UI によってアドインが読み込まれたことが通知されます。
6. [ホーム] では、リボンは **Auth0** と呼ばれる新しいグループであり、**[表示する]** というラベル付きのボタンとアイコンが用意されています。そのボタンをクリックして、アドインを開きます。

 > 注: アドイン コマンドが Word バージョンによってサポートされていない場合は、アドインが作業ウィンドウに読み込まれます。

## <a name="test-the-add-in"></a>アドインをテストする

1. [ようこそ] ページでアドインが開きます。**[サインイン]** ボタンをクリックします。
2. ポップアップが開き、ID プロバイダーを選択するように求めるメッセージが表示されます。いずれかのボタンをクリックします。 
3. そのプロバイダーを使用してまだサインインしていない場合は、プロバイダーのサインイン ページが表示されます。 (初回のサインイン時に、プロフィールへの Auth0 アクセス許可を付与するように求めるダイアログが表示されます。)サインインすると、ダイアログが閉じ、作業ウィンドウにメインの作業ページが表示されます。 (プロバイダーを使用して既にサインインしている場合は、プロバイダーのボタンをクリックするとすぐにダイアログが閉じます。)
4. **[ユーザー名の挿入]** ボタンをクリックします。 自分のユーザー名が Word 文書に挿入されます。

## <a name="questions-and-comments"></a>質問とコメント

このサンプルに関するフィードバックをお寄せください。このリポジトリの「*問題*」セクションでフィードバックを送信できます。

Microsoft Office 365 開発全般の質問につきましては、「[スタック オーバーフロー](http://stackoverflow.com/questions/tagged/office-js+API)」に投稿してください。Office JavaScript API に関する質問の場合は、必ず質問に [office-js] と [API] のタグを付けてください。

## <a name="additional-resources"></a>追加リソース

* 
  [Office アドインのドキュメント](https://msdn.microsoft.com/ja-jp/library/office/jj220060.aspx)
* [Office デベロッパー センター](http://dev.office.com/)
* [Github の OfficeDev](https://github.com/officedev) にあるその他の Office アドイン サンプル

## <a name="copyright"></a>著作権
Copyright (c) 2016 Microsoft Corporation. All rights reserved.



このプロジェクトでは、[Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/) が採用されています。詳細については、「[Code of Conduct の FAQ](https://opensource.microsoft.com/codeofconduct/faq/)」を参照してください。また、その他の質問やコメントがあれば、[opencode@microsoft.com](mailto:opencode@microsoft.com) までお問い合わせください。
