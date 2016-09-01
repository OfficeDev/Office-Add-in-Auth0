# Office Add-in that uses the Auth0 Service to Simplify Social Login

The Auth0 service simplifies the process of using social login provided by online services such as Facebook, Google, and Microsoft. This sample shows how to use Auth0 in an Office add-in. 

## Table of Contents
* [Change History](#change-history)
* [Prerequisites](#prerequisites)
* [Configure the project](#configure-the-project)
* [Create an Auth0 account and configure it to use Google, Facebook, and Microsoft Account](#create-an-auth0-account-and-configure-it-to-use-google,-facebook,-and-microsoft-account)
* [Add your Auth0 account values to the sample code](#add-your-auth0-account-values-to-the-sample-code)
* [Deploy the add-in](#deploy-the-add-in)
* [Run the project](#run-the-project)
* [Start the add-in](#start-the-add-in)
* [Test the add-in](#test-the-add-in)
* [Questions and comments](#questions-and-comments)
* [Additional resources](#additional-resources)

## Change History

August 30, 2016:

* Initial version.

## Prerequisites

* An account with [Auth0](https://auth0.com)
* Word 2016 for Windows, build 16.0.6727.1000 or later.
* [Node and npm](https://nodejs.org/en/) The project is configured to use npm as both a package manager and a task runner. It is also configured to use Lite Server as the web server that will host the add-in during development, so you can have the add-in up and running quickly. You are welcome to use another task runner or web server.
* [Git Bash](https://git-scm.com/downloads) (Or another git client.)

## Configure the project

In the folder where you want to put the project, run the following commands in the git bash shell:

1. ```git clone {URL of this repo}``` to clone this repo to your local machine.
2. ```npm install``` to install all of the dependencies itemized in the package.json file.
3. ```bash gen-cert.sh``` to create the certificate needed to run this sample. 

Set the certificate to be a trusted root authority. On a Windows machine, these are the steps:

1. In the repo folder on your local computer, double-click ca.crt, and select **Install Certificate**. 
2. Select **Local Machine** and select **Next** to continue. 
3. Select **Place all certificates in the following store** and then select **Browse**.
4. Select **Trusted Root Certification Authorities** and then select **OK**. 
5. Select **Next** and then **Finish**. 

## Create an Auth0 account and configure it to use Google, Facebook, and Microsoft Account

Auth0 may change their UI, and terminology, after this readme is published. We have tried to make as few assumptions as possible about the UI, but if you need to you can use these steps to get the gist of what needs to be done and then use Auth0's help for instructions.

1. In your Auth0 dashboard create an account (or you can use an existing account). You will be prompted to choose and account name which will serve as the subdomain in auth0.com with which your add-in will interact; for example, `officeaddin.auth0.com`. Make a note of this name.
2. When you are prompted to choose providers, select Facebook, Google, and Microsoft Account. This sample doesn't use any others, so disable any others that are enabled by default, including the **Database** (or **Username-Password-Authentication**) option. You can change this setting later, if you want to extend the sample to other providers.
3. Auth0 creates a **Default App** (also called a **Client**) in the account. Navigate to the **Settings** for this app.
4. Make a note of the client ID for use in a later step.
5. For **Client Type**, choose **Single Page Application**. 
6. In **Allowed Callbacks**, enter `https://localhost:3000/popupRedirect.html`.
7. Leave all other settings at their defaults and click **Save Changes**.

## Add your Auth0 account values to the sample code

1. Open the index.js file and find the following lines near the top:
```
Auth0AccountData.subdomain = '{Auth0 account subdomain}';
Auth0AccountData.clientID = '{Auth0 client ID}';
```
2. Replace the placeholders with the appropriate strings that you recorded in the preceding procedure.

## Deploy the add-in

Now you need to let Microsoft Word know where to find the add-in.

1. Create a network share, or [share a folder to the network](https://technet.microsoft.com/en-us/library/cc770880.aspx).
2. Place a copy of the Office-Add-in-Auth0.xml manifest file, from the root of the project, into the shared folder.
3. Launch Word and open a document.
4. Choose the **File** tab, and then choose **Options**.
5. Choose **Trust Center**, and then choose the **Trust Center Settings** button.
6. Choose **Trusted Add-ins Catalogs**.
7. In the **Catalog Url** field, enter the network path to the folder share that contains Office-Add-in-Auth0.xml, and then choose **Add Catalog**.
8. Select the **Show in Menu** check box, and then choose **OK**.
9. A message is displayed to inform you that your settings will be applied the next time you start Microsoft Office. Close Word.

## Run the project

1. Open a node command window in the folder of the project and run ```npm start``` to start the web service. Leave the command window open.
2. Open Internet Explorer or Edge and enter ```https://localhost:3000``` in the address box. If you do not receive any warnings about the certificate, close the browser and continue with the section below titled **Start the add-in**. If you do receive a warning that the certificate is not trusted, continue with the following steps:
3. The browser gives you a link to open the page despite the warning. Open it.
4. After the page opens, there will be a red certificate error in the address bar. Double click the error.
5. Select **View Certificate**.
5. Select **Install Certificate**.
4. Select **Local Machine** and select **Next** to continue. 
3. Select **Place all certificates in the following store** and then select **Browse**.
4. Select **Trusted Root Certification Authorities** and then select **OK**. 
5. Select **Next** and then **Finish**.
6. Close the browser.

## Start the add-in

1. Restart Word and open a Word document.
2. On the **Insert** tab in Word 2016, choose **My Add-ins**.
3. Select the **SHARED FOLDER** tab.
4. Choose **Authenticate with Auth0**, and then select **OK**.
5. If add-in commands are supported by your version of Word, the UI will inform you that the add-in was loaded.
6. On the Home ribbon is a new group called **Auth0** with a button labeled **Show** and an icon. Click that button to open the add-in.

 > Note: The add-in will load in a task pane if add-in commands are not supported by your version of Word.

## Test the add-in

1. Click the **Get Facebook Name** button.
2. A popup will open and you will be prompted to sign in with with the provider (unless you already are).
3. After you sign in the first time, you will be prompted to grant Auth0 permission to your profile.
4. When the dialog closes, your user name is inserted into the Word document.
4. Repeat the above steps with the **Get Google Name** button and then the **Get Microsoft Name**.

## Questions and comments

We'd love to get your feedback about this sample. You can send your feedback to us in the *Issues* section of this repository.

Questions about Microsoft Office 365 development in general should be posted to [Stack Overflow](http://stackoverflow.com/questions/tagged/office-js+API). If your question is about the Office JavaScript APIs, make sure that your questions are tagged with [office-js] and [API].

## Additional resources

* [Office add-in documentation](https://msdn.microsoft.com/en-us/library/office/jj220060.aspx)
* [Office Dev Center](http://dev.office.com/)
* More Office Add-in samples at [OfficeDev on Github](https://github.com/officedev)

## Copyright
Copyright (c) 2016 Microsoft Corporation. All rights reserved.

