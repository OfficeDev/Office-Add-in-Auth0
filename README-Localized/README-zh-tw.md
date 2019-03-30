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
# <a name="archived-office-add-in-that-uses-the-auth0-service-to-simplify-social-login"></a>[已封存] 使用 Auth0 服務以簡化社交網路帳戶登入的 Office 增益集

> **注意：** 此 Repo 已封存，不再主動進行維護。 安全性漏洞可能存在專案或其相依專案。 如果您計畫重複使用或執行此Repo 的任何程式碼，請務必對程式碼或其相依程式碼執行適當的安全性檢查。 請勿將此專案當成實際 Office 增益集的起點。 一律使用 Visual Studio 中的 Office/SharePoint 開發工作負載，或是使用 [Office 增益集的 Yeoman 產生器](https://github.com/OfficeDev/generator-office)，開始您的實際程式碼，然後在開發增益集的同時，遵循最佳安全性的作法。

Auth0 服務簡化使用 (如 Facebook、Google 及 Microsoft 等線上服務所提供的) 社交網路帳戶登入的程序。 這個範例會示範如何在 Office 增益集中使用 Auth0。 

## <a name="table-of-contents"></a>目錄
* [變更歷程記錄](#change-history)
* [必要條件](#prerequisites)
* [設定專案](#configure-the-project)
* [建立 Auth0 帳戶，並將其設定為使用 Google、Facebook 以及 Microsoft 帳戶](#create-an-auth0-account-and-configure-it-to-use-google,-facebook,-and-microsoft-account)
* [將您的 Auth0 帳戶值加入到範例程式碼中](#add-your-auth0-account-values-to-the-sample-code)
* [部署增益集](#deploy-the-add-in)
* [執行專案](#run-the-project)
* [啟動增益集](#start-the-add-in)
* [測試增益集](#test-the-add-in)
* [問題和建議](#questions-and-comments)
* [其他資源](#additional-resources)

## <a name="change-history"></a>變更歷程記錄

2016 年 9 月 6 日：

* 初始版本。

## <a name="prerequisites"></a>必要條件

* 具有 [Auth0](https://auth0.com) 的帳戶
* Word 2016 for Windows，組建 16.0.6727.1000 或更新版本。
* [節點和 npm](https://nodejs.org/en/) 專案設定為使用 npm 作為封裝管理員和工作執行器。它也設定為使用精簡版伺服器作為 Web 伺服器，在開發期間裝載增益集，因此您可以快速地啟動並執行增益集。您也可以自由地使用其他工作執行器或 Web 伺服器。
* [就可以給艦隊](https://git-scm.com/downloads) (或其他 git 用戶端。)

## <a name="configure-the-project"></a>設定專案

在您要放置專案的資料夾中，以 git bash shell 執行下列命令︰

1. ```git clone {URL of this repo}``` 可複製此儲存機制到本機電腦。
2. ```npm install``` 可安裝 package.json 檔案中的所有分項相依性。
3. ```bash gen-cert.sh``` 可建立執行這個範例所需的憑證。 

將憑證設定為受信任的根授權。在 Windows 電腦上的步驟如下︰

1. 在您本機電腦上的儲存機制資料夾中，連按兩下 ca.crt，然後選取 [安裝憑證]****。 
2. 選取 [本機電腦]****，然後選取 [下一步]**** 以繼續。 
3. 選取 [將所有憑證放入以下的存放區]****，然後選取 [瀏覽]****。
4. 選取 [信任的根憑證授權]****，然後選取 [確定]****。 
5. 選取 [下一步]****，然後選取 [完成]****。 

## <a name="create-an-auth0-account-and-configure-it-to-use-google-facebook-and-microsoft-account"></a>建立 Auth0 帳戶，並將其設定為使用 Google、Facebook，以及 Microsoft 帳戶

此讀我檔案發佈後，Auth0 的 UI 和術語可能會有所變更。我們試著盡可能不做關於 UI 的假設，但如果您需要，可以使用這些步驟來取得必須完成的工作要點，然後使用 Auth0 的說明作為指示。

1. 在 Auth0 儀表板中建立一個帳戶 (您也可以使用現有的帳戶)。 系統將會提示您選擇在 auth0.com 中用做子網域的帳戶名稱 (增益集將與其互動)；例如 `officeaddin.auth0.com`。 記下此名稱。
2. 當提示您選擇提供者時，請選取 Facebook、Google 及 Microsoft 帳戶。 這個範例不使用任何其他選項，因此請停用依預設而啟用的任何其他選項，包括 [資料庫]**** (或 [使用者名稱密碼驗證]****) 選項。 如果想要將範例延伸到其他提供者，稍後您可以變更此設定。
3. Auth0 會在帳戶中建立 [預設應用程式]**** (也稱為 [用戶端]****)。 瀏覽到此應用程式的 [設定]****。
4. 記下戶端識別碼，以便在後續步驟中使用。
5. 對於 [用戶端類型]****，請選擇 [單一頁面應用程式]****。 
6. 在 [允許的回呼]**** 中，輸入 `https://localhost:3000/popupRedirect.html`。
7. 其他所有設定都保留預設值，然後按一下 [儲存變更]****。

## <a name="add-your-auth0-account-values-to-the-sample-code"></a>將您的 Auth0 帳戶值加入到範例程式碼中

1. 開啟 index.js 檔案，並在靠近頂端的地方尋找下列程式行︰
```
Auth0AccountData.subdomain = '{Auth0 account subdomain}';
Auth0AccountData.clientID = '{Auth0 client ID}';
```
2. 以適當字串取代在之前程序中所記錄的預留位置。

## <a name="deploy-the-add-in"></a>部署增益集

現在，您需要讓 Microsoft Word 知道哪裡可以找到此增益集。

1. 建立網路共用，或[在網路上共用資料夾](https://technet.microsoft.com/zh-tw/library/cc770880.aspx)。
2. 將一份 Office-Add-in-Auth0.xml 資訊清單檔，從專案的根目錄放入共用資料夾中。
3. 啟動 Word 並開啟一個文件。
4. 選擇 [檔案]**** 索引標籤，然後選擇 [選項]****。
5. 選擇 [信任中心]****，然後選擇 [信任中心設定]**** 按鈕。
6. 選擇 [受信任的增益集目錄]****。
7. 在 [目錄 URL]**** 欄位中，輸入包含 Office-Add-in-Auth0.xml 的資料夾共用的網路路徑，然後選擇 [新增目錄]****。
8. 選取 [顯示於功能表中]**** 核取方塊，然後選擇 [確定]****。
9. 接著會顯示訊息，通知您下次啟動 Microsoft Office 時就會套用您的設定。關閉 Word。

## <a name="run-the-project"></a>執行專案

1. 開啟專案的資料夾中節點的命令視窗，並執行 ```npm start``` 以啟動 Web 服務。保留命令視窗開啟。
2. 開啟 Internet Explorer 或 Microsoft Edge，並在網址方塊中輸入 ```https://localhost:3000```。如果您未收到與憑證相關的任何警告，請關閉瀏覽器，並繼續進行下面主題為**啟動增益集**的章節。如果您收到憑證不受信任的警告，請繼續執行下列步驟︰
3. 儘管有警告，瀏覽器還是可以給予您用以開啟頁面的連結。將其開啟。
4. 開啟網頁後，在網址列中會有紅色的憑證錯誤訊息。按兩下錯誤。
5. 選取 [檢視憑證]****。
5. 選取 [安裝憑證]****。
4. 選取 [本機電腦]****，然後選取 [下一步]**** 以繼續。 
3. 選取 [將所有憑證放入以下的存放區]****，然後選取 [瀏覽]****。
4. 選取 [信任的根憑證授權]****，然後選取 [確定]****。 
5. 選取 [下一步]****，然後選取 [完成]****。
6. 關閉瀏覽器。

## <a name="start-the-add-in"></a>啟動增益集

1. 重新啟動 Word，並開啟 Word 文件。
2. 在 Word 2016 的 [插入]**** 索引標籤上，選擇 [我的增益集]**** (按鈕可能會在 [開發人員]**** 索引標籤上，而不是 [插入]**** 索引標籤。若要顯示 [開發人員]**** 索引標籤，請參閱[下列指示](https://support.office.com/zh-tw/article/Show-the-Developer-tab-E1192344-5E56-4D45-931B-E5FD9BEA2D45))。
3. 選取 [共用資料夾]**** 索引標籤。
4. 選擇 [以 Auth0 驗證]****，然後選取 [確定]****。
5. 如果您的 Word 版本支援增益集命令，UI 會通知您已載入增益集。
6. 在 [常用] 功能區中的是稱為 **Auth0** 的新群組，具有標示為 [顯示]**** 的按鈕和圖示。按一下該按鈕以開啟增益集。

 > 附註：如果您的 Word 版本不支援增益集命令，增益集會載入工作窗格。

## <a name="test-the-add-in"></a>測試增益集

1. 增益集會開啟歡迎畫面。按一下 [登入]**** 按鈕。
2. 快顯功能表隨即開啟，系統會提示您選擇識別提供者。按一下其中一個按鈕。 
3. 如果您尚未以該提供者登入，則會開啟提供者的登入網頁。 (您第一次登入之後，系統將會提示您將 Auth0 的權限授與設定檔。)您登入之後會關閉對話方塊，而工作窗格會顯示增益集的主要工作頁面。 (如果您已使用該提供者登入，在按一下提供者的按鈕後，便會立即關閉對話方塊。)
4. 按一下 [插入使用者名稱]**** 按鈕。 會將您的使用者名稱插入 Word 文件中。

## <a name="questions-and-comments"></a>問題和建議

我們很樂於收到您對於此範例的意見反應。您可以在此存放庫的 [問題]** 區段中，將您的意見反應傳送給我們。

請在 [Stack Overflow](http://stackoverflow.com/questions/tagged/office-js+API) 提出有關 Microsoft Office 365 開發的一般問題。如果您的問題是關於 Office JavaScript API，請確定您的問題標記有 [office js] 與 [API]。

## <a name="additional-resources"></a>其他資源

* 
  [Office 增益集文件](https://msdn.microsoft.com/zh-tw/library/office/jj220060.aspx)
* [Office 開發人員中心](http://dev.office.com/)
* 在 [Github 上的 OfficeDev](https://github.com/officedev) 中有更多 Office 增益集範例

## <a name="copyright"></a>著作權
Copyright (c) 2016 Microsoft Corporation 著作權所有，並保留一切權利。



此專案已採用 [Microsoft 開放原始碼管理辦法](https://opensource.microsoft.com/codeofconduct/)。如需詳細資訊，請參閱[管理辦法常見問題集](https://opensource.microsoft.com/codeofconduct/faq/)，如果有其他問題或意見，請連絡 [opencode@microsoft.com](mailto:opencode@microsoft.com)。
