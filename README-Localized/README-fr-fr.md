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
# <a name="archived-office-add-in-that-uses-the-auth0-service-to-simplify-social-login"></a>[ARCHIVÉ] Un complément Office utilise le service Auth0 pour simplifier la connexion aux réseaux sociaux

> **Remarque :** ce référentiel est archivé et n’est plus activement conservé. Des failles de sécurité peuvent exister dans le projet ou ses dépendances. Si vous envisagez de réutiliser ou d’exécuter du code issu de ce référentiel, veillez à effectuer les vérifications de sécurité appropriées sur le code ou les dépendances en premier. N’utilisez pas ce projet comme point de départ d’un complément Office de production. Commencez toujours votre code de production à l’aide de la charge de travail de développement Office/SharePoint dans Visual Studio, ou le [générateur Yeoman de compléments Office](https://github.com/OfficeDev/generator-office), puis suivez les meilleures pratiques de sécurité lorsque vous développez le complément.

Le service Auth0 simplifie le processus d’utilisation de la connexion par le biais des réseaux sociaux fournie par les services en ligne tels que Facebook, Google et Microsoft. Cet exemple montre comment utiliser Auth0 dans un complément Office. 

## <a name="table-of-contents"></a>Sommaire
* [Historique des modifications](#change-history)
* [Conditions préalables](#prerequisites)
* [Configuration du projet](#configure-the-project)
* [Créer un compte Auth0 et le configurer pour utiliser un compte Google, Facebook et Microsoft](#create-an-auth0-account-and-configure-it-to-use-google,-facebook,-and-microsoft-account)
* [Ajouter vos valeurs de compte Auth0 à l’exemple de code](#add-your-auth0-account-values-to-the-sample-code)
* [Déploiement du complément](#deploy-the-add-in)
* [Exécution du projet](#run-the-project)
* [Démarrage du complément](#start-the-add-in)
* [Test du complément](#test-the-add-in)
* [Questions et commentaires](#questions-and-comments)
* [Ressources supplémentaires](#additional-resources)

## <a name="change-history"></a>Historique des modifications

6 septembre 2016 :

* Version d’origine.

## <a name="prerequisites"></a>Conditions préalables

* Un compte avec [Auth0](https://auth0.com)
* Word 2016 pour Windows, version 16.0.6727.1000 ou ultérieure.
* [Nœud et npm](https://nodejs.org/en/) Le projet est configuré pour utiliser npm à la fois comme gestionnaire de package et exécuteur de tâches. Il est également configuré pour utiliser Lite Server comme serveur web hébergeant le complément lors du développement, afin que le complément soit rapidement opérationnel. N’hésitez pas à utiliser un autre exécuteur de tâches ou serveur web.
* [GIT Bash](https://git-scm.com/downloads) (ou un autre client Git)

## <a name="configure-the-project"></a>Configurer le projet

Dans le dossier où vous souhaitez placer le projet, exécutez les commandes suivantes dans l’interpréteur de commande Git Bash :

1. ```git clone {URL of this repo}``` pour cloner ce référentiel sur votre ordinateur local.
2. ```npm install``` pour installer toutes les dépendances détaillées dans le fichier package.json.
3. ```bash gen-cert.sh``` pour créer le certificat nécessaire à l’exécution de cet exemple. 

Définissez le certificat comme appartenant à une autorité racine approuvée. Sur un ordinateur Windows, procédez comme suit :

1. Dans le dossier de référentiel de votre ordinateur local, double-cliquez sur ca.crt et sélectionnez **Installer le certificat**. 
2. Sélectionnez **Ordinateur local** et choisissez **Suivant** pour continuer. 
3. Sélectionnez **Placer tous les certificats dans le magasin suivant**, puis **Parcourir**.
4. Sélectionnez **Autorités de certification racines de confiance** et **OK**. 
5. Sélectionnez **Suivant**, puis **Terminer**. 

## <a name="create-an-auth0-account-and-configure-it-to-use-google-facebook-and-microsoft-account"></a>Créer un compte Auth0 et le configurer pour utiliser un compte Google, Facebook et Microsoft

Il se peut qu’Auth0 change son interface utilisateur et sa terminologie après la publication de ce fichier Lisez-moi. Nous nous sommes efforcés de limiter le nombre d’hypothèses sur l’interface utilisateur, mais s i nécessaire, vous pouvez utiliser ces étapes pour avoir une idée générale de ce qu’il faut faire, puis utiliser l’aide d’Auth0 pour obtenir des instructions.

1. Dans votre tableau de bord Auth0, créez un compte (ou utilisez un compte existant). Vous serez invité à choisir un nom de compte qui servira de sous-domaine dans auth0.com, avec lequel votre complément pourra interagir ; par exemple, `officeaddin.auth0.com`. Notez ce nom.
2. Quand vous êtes invité à choisir des fournisseurs, sélectionnez Facebook, Google et Microsoft. Cet exemple n’en utilise pas d’autres, vous pouvez donc désactiver les autres fournisseurs activés par défaut, y compris l’option **Base de données** (ou **Authentification nom d’utilisateur-mot de passe**). Vous pourrez modifier ce paramètre ultérieurement, si vous souhaitez étendre l’exemple à d’autres fournisseurs.
3. Auth0 crée une **Application par défaut** (également appelée un **Client**) dans le compte. Accédez aux **Paramètres** de cette application.
4. Notez l’ID de client pour l’utiliser dans une étape ultérieure.
5. Pour **Type de client**, choisissez **Application à une page**. 
6. Dans **Rappels autorisés**, entrez `https://localhost:3000/popupRedirect.html`.
7. Laissez tous les autres paramètres sur leurs valeurs par défaut et cliquez sur **Enregistrer les modifications**.

## <a name="add-your-auth0-account-values-to-the-sample-code"></a>Ajouter vos valeurs de compte Auth0 à l’exemple de code

1. Ouvrez le fichier index.js et recherchez les lignes suivantes dans la partie supérieure :
```
Auth0AccountData.subdomain = '{Auth0 account subdomain}';
Auth0AccountData.clientID = '{Auth0 client ID}';
```
2. Remplacez les espaces réservés avec les chaînes que vous avez enregistrées dans la procédure précédente.

## <a name="deploy-the-add-in"></a>Déployer le complément

Vous devez maintenant indiquer à Microsoft Word où trouver le complément.

1. Créez un partage réseau, ou [partagez un dossier sur le réseau](https://technet.microsoft.com/fr-fr/library/cc770880.aspx).
2. Placez une copie du fichier manifeste Office-Add-in-Auth0.xml, depuis la racine du projet, dans le dossier partagé.
3. Lancez Word et ouvrez un document.
4. Choisissez l’onglet **Fichier**, puis choisissez **Options**.
5. Choisissez l’onglet **Fichier**, puis choisissez **Options**.
6. Choisissez **Catalogues de compléments approuvés**.
7. Dans le champ **URL du catalogue**, saisissez le chemin réseau pour accéder au partage de dossier qui contient le fichier Office-Add-in-Auth0.xml, puis choisissez **Ajouter un catalogue**.
8. Activez la case à cocher **Afficher dans le menu**, puis cliquez sur **OK**.
9. Un message vous informe que vos paramètres seront appliqués lors du prochain démarrage de Microsoft Office. Fermez Word.

## <a name="run-the-project"></a>Exécution du projet

1. Ouvrez une fenêtre de commande de nœud dans le dossier du projet et exécutez ```npm start``` pour démarrer le service web. Laissez la fenêtre de commande ouverte.
2. Ouvrez Internet Explorer ou Edge, et saisissez ```https://localhost:3000``` dans la zone d’adresse. Si vous ne recevez aucun avertissement concernant le certificat, fermez le navigateur et passez à la section suivante intitulée **Démarrer le complément**. Si vous recevez un message d’avertissement indiquant que le certificat n’est pas approuvé, passez aux étapes suivantes :
3. Le navigateur vous fournit un lien vous permettant d’ouvrir la page malgré l’avertissement. Ouvrez-la.
4. Une fois la page ouverte, une erreur de certificat affichée en rouge apparaît dans la barre d’adresses. Double-cliquez sur l’erreur.
5. Sélectionnez **Afficher le certificat**.
5. Sélectionnez **Installer le certificat**.
4. Sélectionnez **Ordinateur local** et choisissez **Suivant** pour continuer. 
3. Sélectionnez **Placer tous les certificats dans le magasin suivant**, puis **Parcourir**.
4. Sélectionnez **Autorités de certification racines de confiance** et **OK**. 
5. Sélectionnez **Suivant**, puis **Terminer**.
6. Fermez le navigateur.

## <a name="start-the-add-in"></a>Démarrer le complément

1. Redémarrez Word et ouvrez un document Word.
2. Dans l’onglet **Insertion** de Word 2016, choisissez **Mes compléments**. (Le bouton peut apparaître dans l’onglet **Développeur** au lieu de l’onglet **Insertion**. Pour afficher l’onglet **Développeur**, suivez [ces instructions](https://support.office.com/fr-fr/article/Show-the-Developer-tab-E1192344-5E56-4D45-931B-E5FD9BEA2D45).)
3. Sélectionnez l’onglet **DOSSIER PARTAGÉ**.
4. Choisissez **Authentifier avec Auth0**, puis sélectionnez **OK**.
5. Si les commandes du complément sont prises en charge par votre version de Word, l’interface utilisateur vous informe que le complément a été chargé.
6. Dans le ruban Accueil, un nouveau groupe **Auth0** apparaît avec un bouton **Afficher** et une icône. Cliquez sur ce bouton pour ouvrir le complément.

 > Remarque : Le complément se charge dans un volet Office si les commandes de complément ne sont pas prises en charge par votre version de Word.

## <a name="test-the-add-in"></a>Test du complément

1. Le complément s’ouvre avec une page d’accueil. Cliquez sur le bouton **Se connecter**.
2. Une fenêtre contextuelle s’ouvre et vous invite à choisir un fournisseur d’identité. Cliquez sur l’un des boutons. 
3. Si vous n’êtes pas déjà connecté avec ce fournisseur, la page de connexion du fournisseur s’ouvre. (Après la première connexion, vous serez invité à octroyer l’autorisation Auth0 à votre profil.) Une fois que vous êtes connecté, la boîte de dialogue se ferme et le volet des tâches affiche la page de travail principale du complément. (Si vous êtes déjà connecté avec le fournisseur, la boîte de dialogue se ferme dès que vous cliquez sur le bouton du fournisseur.)
4. Cliquez sur le bouton **Insérer le nom d’utilisateur**. Votre nom d’utilisateur est inséré dans le document Word.

## <a name="questions-and-comments"></a>Questions et commentaires

Nous serions ravis de connaître votre opinion sur cet exemple. Vous pouvez nous envoyer vos commentaires via la section *Problèmes* de ce référentiel.

Les questions générales sur le développement de Microsoft Office 365 doivent être publiées sur [Stack Overflow](http://stackoverflow.com/questions/tagged/office-js+API). Si votre question concerne les API Office JavaScript, assurez-vous qu’elle comporte les balises [office-js] et [API].

## <a name="additional-resources"></a>Ressources supplémentaires

* 
  [Documentation de complément Office](https://msdn.microsoft.com/fr-fr/library/office/jj220060.aspx)
* [Centre de développement Office](http://dev.office.com/)
* Plus d’exemples de complément Office sur [OfficeDev sur Github](https://github.com/officedev)

## <a name="copyright"></a>Copyright
Copyright (c) 2016 Microsoft Corporation. Tous droits réservés.



Ce projet a adopté le [code de conduite Open Source de Microsoft](https://opensource.microsoft.com/codeofconduct/). Pour plus d’informations, reportez-vous à la [FAQ relative au code de conduite](https://opensource.microsoft.com/codeofconduct/faq/) ou contactez [opencode@microsoft.com](mailto:opencode@microsoft.com) pour toute question ou tout commentaire.
