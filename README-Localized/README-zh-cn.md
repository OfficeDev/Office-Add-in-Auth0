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
# <a name="archived-office-add-in-that-uses-the-auth0-service-to-simplify-social-login"></a>[已存档] 使用 Auth0 服务简化社交登录的 Office 外接程序

> **注意：** 此存储库已存档，不再主动维护。 项目或其依赖项中可能存在安全漏洞。 如果计划从此存储库重用或运行任何代码，请务必首先对代码或依赖项执行适当的安全检查。 请勿将此项目用作生产 Office 外接程序的起点。 始终使用 Visual Studio 中的 Office/SharePoint 开发工作负载或 [Office 外接程序的 Yeoman 生成器](https://github.com/OfficeDev/generator-office)启动生产代码，并在开发外接程序时遵循安全最佳做法。

Auth0 服务可简化使用在线服务（例如 Facebook、Google 和 Microsoft）提供的社交登录名过程。 本示例介绍如何在 Office 外接程序中使用 Auth0。 

## <a name="table-of-contents"></a>目录
* [修订记录](#change-history)
* [先决条件](#prerequisites)
* [配置项目](#configure-the-project)
* [创建 Auth0 帐户，并将它配置为使用 Google、Facebook 和 Microsoft 帐户](#create-an-auth0-account-and-configure-it-to-use-google,-facebook,-and-microsoft-account)
* [将 Auth0 帐户值添加到示例代码](#add-your-auth0-account-values-to-the-sample-code)
* [部署加载项](#deploy-the-add-in)
* [运行项目](#run-the-project)
* [启动外接程序](#start-the-add-in)
* [测试外接程序](#test-the-add-in)
* [问题和意见](#questions-and-comments)
* [其他资源](#additional-resources)

## <a name="change-history"></a>修订记录

2016 年 9 月 6 日：

* 初始版本。

## <a name="prerequisites"></a>先决条件

* 可使用 [Auth0](https://auth0.com) 服务的帐户
* Word 2016 for Windows（内部版本 16.0.6727.1000 或更高版本）。
* [节点和 npm](https://nodejs.org/en/) 将项目配置为使用 npm 作为程序包管理器和任务运行程序。还可以配置为将 Lite Server 用作开发期间可托管外接程序的 Web 服务器，以便快速启动并运行外接程序。你完全可以使用其他任务运行程序或 Web 服务器。
* [Git Bash](https://git-scm.com/downloads)（或其他 git 客户端）。

## <a name="configure-the-project"></a>配置项目

在要放置项目的文件夹中，于 git bash shell 中运行以下命令：

1. ```git clone {URL of this repo}```（将此存储库克隆到本地计算机。）
2. ```npm install```（安装 package.json 文件中列出明细的所有依赖项。）
3. ```bash gen-cert.sh```（创建要运行此示例所需的证书。） 

将此证书设置为受信任的根证书颁发机构。Windows 计算机上的设置步骤：

1. 在本地计算机的存储库文件夹中，双击 ca.crt，然后选择“**安装证书**”。 
2. 选择“**本地计算机**”，然后选择“**下一步**”以继续。 
3. 选择“**将所有证书放入下列存储**”，然后选择“**浏览**”。
4. 选择“**受信任的根证书颁发机构**”，然后选择“**确定**”。 
5. 依次选择“**下一步**”、“**完成**”。 

## <a name="create-an-auth0-account-and-configure-it-to-use-google-facebook-and-microsoft-account"></a>创建 Auth0 帐户并将其配置为使用 Google、Facebook 和 Microsoft 帐户

本自述文件发布之后，Auth0 可能会更改其 UI 和术语。我们一直努力减少对 UI 界面的假设，但你可以在需要时使用以下步骤，获取所需完成工作的要点，然后使用 Auth0 帮助获取说明。

1. 在 Auth0 仪表板中创建帐户（或使用现有帐户）。 系统将提示你进行选择，帐户名称将在外接程序进行交互所依赖的 auth0.com 中用作子域；例如 `officeaddin.auth0.com`。 为此名称添加备注。
2. 当系统提示选择提供程序时，请选择 Facebook、Google 和 Microsoft 帐户。 本示例不使用任何其他项，因此，请禁用默认启用的任何其他项，包括“**数据库**”（或“**用户名密码身份验证**”）选项。 如需将此示例扩展到其他提供程序，稍后可更改此设置。
3. Auth0 在帐户中创建“**默认应用**”（也称为“**客户端**”）。 导航到“**设置**”，获取此应用。
4. 为后续步骤中要使用的客户端 ID 添加备注。
5. 对于“**客户端类型**”，选择“**单页应用程序**”。 
6. 在“**允许回调**”中，输入 `https://localhost:3000/popupRedirect.html`。
7. 将所有其他设置都保留为默认值，然后单击“**保存更改**”。

## <a name="add-your-auth0-account-values-to-the-sample-code"></a>将 Auth0 帐户值添加到示例代码中

1. 打开 index.js 文件，然后查找靠近顶部的以下行：
```
Auth0AccountData.subdomain = '{Auth0 account subdomain}';
Auth0AccountData.clientID = '{Auth0 client ID}';
```
2. 使用之前过程中记录的相应字符串替换占位符。

## <a name="deploy-the-add-in"></a>部署外接程序

现在需要让 Microsoft Word 知道在哪里可以找到外接程序。

1. 创建网络共享，或[将文件夹共享到网络](https://technet.microsoft.com/zh-cn/library/cc770880.aspx)。
2. 将 Office-Add-in-Auth0.xml 清单文件从项目根目录复制到共享文件夹。
3. 启动 Word，然后打开一个文档。
4. 选择**文件**选项卡，然后选择**选项**。
5. 选择**信任中心**，然后选择**信任中心设置**按钮。
6. 选择“**受信任的外接程序目录**”。
7. 在“**目录 URL**”字段中，输入包含 Office-Add-in-Auth0.xml 的文件夹共享的网络路径，然后选择“**添加目录**”。
8. 选中“**显示在菜单中**”复选框，然后选择“**确定**”。
9. 随后会出现一条消息，告知你下次启动 Microsoft Office 时将应用你的设置。关闭 Word。

## <a name="run-the-project"></a>运行项目

1. 打开项目文件夹中的节点命令窗口，然后运行 ```npm start``` 来启动 Web 服务。使命令窗口保持打开状态。
2. 打开 Internet Explorer 或 Edge，然后在地址框中输入 ```https://localhost:3000```。如果未收到有关证书的任何警告，则关闭浏览器，然后继续执行下面的“**启动外接程序**”部分。如果看到提示证书不受信任的警告，请继续按以下步骤操作：
3. 除警告外，浏览器还会提供一个可以打开该页面的链接。打开该页面。
4. 打开页面后，地址栏中会有一条显示为红色的证书错误消息。双击此错误。
5. 选择“**查看证书**”。
5. 选择“**安装证书**”。
4. 选择“**本地计算机**”，然后选择“**下一步**”以继续。 
3. 选择“**将所有证书放入下列存储**”，然后选择“**浏览**”。
4. 选择“**受信任的根证书颁发机构**”，然后选择“**确定**”。 
5. 依次选择“**下一步**”、“**完成**”。
6. 关闭浏览器。

## <a name="start-the-add-in"></a>启动外接程序

1. 重新启动 Word 并打开一个 Word 文档。
2. 在 Word 2016 的“**插入**”选项卡中，选择“**我的外接程序**”。（按钮可能位于“**开发人员**”选项卡而不是“**插入**”选项卡上。若要使“**开发人员**”选项卡可见，请参阅[以下说明](https://support.office.com/zh-cn/article/Show-the-Developer-tab-E1192344-5E56-4D45-931B-E5FD9BEA2D45)。）
3. 选择“**共享文件夹**”选项卡。
4. 选择“** Auth0 进行身份验证**”，然后选择“**确定**”。
5. 如果 Word 版本支持外接程序命令，UI 将通知你已加载外接程序。
6. 主页功能区上有一个名为“**Auth0**”的新组，包含标记为“**显示**”的按钮和一个图标。单击该按钮，打开此外接程序。

 > 注意：如果你的 Word 版本不支持外接程序命令，则外接程序将在任务窗格中加载。

## <a name="test-the-add-in"></a>测试外接程序

1. 外接程序打开时显示欢迎页面。单击“**登录**”按钮。
2. 弹出窗口将打开，系统会提示选择标识提供程序。单击其中一个按钮。 
3. 如果尚未使用相应提供程序进行登录，将会看到提供程序的登录页面打开。 （首次登录后，系统会提示向配置文件授予 Auth0 权限。）登录后，此对话框会关闭，任务窗格将显示外接程序的工作主页面。 （如果已使用提供程序进行登录，对话框会在提供程序按钮获得单击后立即关闭。）
4. 单击“**插入用户名**”按钮。 用户名将插入 Word 文档中。

## <a name="questions-and-comments"></a>问题和意见

我们乐意倾听你对此示例的反馈。你可以在此存储库中的“*问题*”部分向我们发送反馈。

与 Microsoft Office 365 开发相关的一般问题应发布到 [Stack Overflow](http://stackoverflow.com/questions/tagged/office-js+API)。如果你的问题是关于 Office JavaScript API，请务必为问题添加 [office-js] 和 [API].标记。

## <a name="additional-resources"></a>其他资源

* 
  [Office 外接程序文档](https://msdn.microsoft.com/zh-cn/library/office/jj220060.aspx)
* [Office 开发人员中心](http://dev.office.com/)
* 有关更多 Office 外接程序示例，请访问 [Github 上的 OfficeDev](https://github.com/officedev)。

## <a name="copyright"></a>版权
版权所有 © 2016 Microsoft Corporation。保留所有权利。



此项目已采用 [Microsoft 开放源代码行为准则](https://opensource.microsoft.com/codeofconduct/)。有关详细信息，请参阅[行为准则 FAQ](https://opensource.microsoft.com/codeofconduct/faq/)。如有其他任何问题或意见，也可联系 [opencode@microsoft.com](mailto:opencode@microsoft.com)。
