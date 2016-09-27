# Complément Office qui utilise le service Auth0 pour simplifier la connexion sociale

Le service Auth0 simplifie le processus d’utilisation de la connexion sociale fournie par les services en ligne tel que Facebook, Google et Microsoft. Cet exemple montre comment utiliser Auth0 dans un complément Office. 

## Table des matières
* [Historique des modifications](#historique-des-modifications)
* [Conditions préalables](#conditions-préalables)
* [Configurer le projet](#configurer-le-projet)
* [Créer un compte Auth0 et le configurer pour utiliser un compte Google, Facebook et Microsoft](#créer-un-compte-auth0-et-le-configurer-pour-utiliser-un-compte-google-facebook-et-microsoft)
* [Ajouter vos valeurs de compte Auth0 à l’exemple de code](#ajouter-vos-valeurs-de-compte-auth0-à-lexemple-de-code)
* [Déployer le complément](#déployer-le-complément)
* [Exécuter le projet](#exécuter-le-projet)
* [Démarrer le complément](#démarrer-le-complément)
* [Test du complément](#test-du-complément)
* [Questions et commentaires](#questions-et-commentaires)
* [Ressources supplémentaires](#ressources-supplémentaires)

## Historique des modifications

6 septembre 2016 :

* Version d’origine.

## Conditions préalables

* Un compte avec [Auth0](https://auth0.com)
* Word 2016 pour Windows, build 16.0.6727.1000 ou ultérieur.
* [Nœud et npm](https://nodejs.org/en/) Le projet est configuré pour utiliser npm à la fois comme gestionnaire de package et exécuteur de tâches. Il est également configuré pour utiliser Lite Server comme serveur web hébergeant le complément lors du développement, afin que le complément soit rapidement opérationnel. N’hésitez pas à utiliser un autre exécuteur de tâches ou serveur web.
* [GIT Bash](https://git-scm.com/downloads) (ou un autre client Git)

## Configurer le projet

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

## Créer un compte Auth0 et le configurer pour utiliser un compte Google, Facebook et Microsoft

Il se peut que l’interface utilisateur et la terminologie d’Auth0 changent après la publication de ce fichier Lisez-moi. Nous nous sommes efforcés de limiter le nombre d’hypothèses sur l’interface utilisateur, mais si nécessaire, vous pouvez utiliser ces étapes pour avoir une idée générale de ce qu’il faut faire, puis utiliser l’aide d’Auth0 pour obtenir des instructions.

1. Dans votre tableau de bord Auth0, créez un compte (ou utilisez un compte existant). Vous serez invité à choisir un nom de compte qui servira de sous-domaine dans auth0.com, avec lequel votre complément pourra interagir ; par exemple, `officeaddin.auth0.com`. Notez ce nom.
2. Quand vous êtes invité à choisir des fournisseurs, sélectionnez Facebook, Google et Microsoft. Cet exemple n’en utilise pas d’autres, vous pouvez donc désactiver les autres fournisseurs activés par défaut, y compris l’option **Base de données** (ou **Authentification nom d’utilisateur-mot de passe**). Vous pourrez modifier ce paramètre ultérieurement, si vous souhaitez étendre l’exemple à d’autres fournisseurs.
3. Auth0 crée une **Application par défaut** (également appelée un **Client**) dans le compte. Accédez aux **Paramètres** de cette application.
4. Notez l’ID de client pour l’utiliser dans une étape ultérieure.
5. Pour **Type de client**, choisissez **Application à une page**. 
6. Dans **Rappels autorisés**, entrez `https://localhost:3000/popupRedirect.html`.
7. Laissez tous les autres paramètres sur leurs valeurs par défaut et cliquez sur **Enregistrer les modifications**.

## Ajouter vos valeurs de compte Auth0 à l’exemple de code

1. Ouvrez le fichier index.js et recherchez les lignes suivantes dans la partie supérieure :
```
Auth0AccountData.subdomain = '{Auth0 account subdomain}';
Auth0AccountData.clientID = '{Auth0 client ID}';
```
2. Remplacez les espaces réservés avec les chaînes que vous avez enregistrées dans la procédure précédente.

## Déployer le complément

Vous devez maintenant indiquer à Microsoft Word où trouver le complément.

1. Créez un partage réseau, ou [partagez un dossier sur le réseau](https://technet.microsoft.com/en-us/library/cc770880.aspx).
2. Placez une copie du fichier manifeste Office-Add-in-Auth0.xml, depuis la racine du projet, dans le dossier partagé.
3. Lancez Word et ouvrez un document.
4. Choisissez l’onglet **Fichier**, puis choisissez **Options**.
5. Choisissez l’onglet **Fichier**, puis choisissez **Options**.
6. Choisissez **Catalogues de compléments approuvés**.
7. Dans le champ **URL du catalogue**, saisissez le chemin réseau pour accéder au partage de dossier qui contient le fichier Office-Add-in-Auth0.xml, puis choisissez **Ajouter un catalogue**.
8. Activez la case à cocher **Afficher dans le menu**, puis cliquez sur **OK**.
9. Un message vous informe que vos paramètres seront appliqués lors du prochain démarrage de Microsoft Office. Fermez Word.

## Exécuter le projet

1. Ouvrez une fenêtre de commande de nœud dans le dossier du projet et exécutez ```npm start``` pour démarrer le service web. Laissez la fenêtre de commande ouverte.
2. Ouvrez Internet Explorer ou Edge et tapez ```https://localhost:3000``` dans la zone d’adresse. Si vous ne recevez aucun avertissement concernant le certificat, fermez le navigateur et passez à la section suivante intitulée **Démarrer le complément**. Si vous recevez un message d’avertissement indiquant que le certificat n’est pas approuvé, passez aux étapes suivantes :
3. Le navigateur vous fournit un lien vous permettant d’ouvrir la page malgré l’avertissement. Ouvrez-la.
4. Une fois la page ouverte, une erreur de certificat rouge sera indiquée dans la barre d’adresses. Double-cliquez sur l’erreur.
5. Sélectionnez **Afficher le certificat**.
5. Sélectionnez **Installer le certificat**.
4. Sélectionnez **Ordinateur local** et choisissez **Suivant** pour continuer. 
3. Sélectionnez **Placer tous les certificats dans le magasin suivant**, puis **Parcourir**.
4. Sélectionnez **Autorités de certification racines de confiance** et **OK**. 
5. Sélectionnez **Suivant**, puis **Terminer**.
6. Fermez le navigateur.

## Démarrer le complément

1. Redémarrez Word et ouvrez un document Word.
2. Dans l’onglet **Insertion** de Word 2016, choisissez **Mes compléments**.
3. Sélectionnez l’onglet **DOSSIER PARTAGÉ**.
4. Choisissez **Authentifier avec Auth0**, puis sélectionnez **OK**.
5. Si les commandes de complément sont prises en charge par votre version de Word, l’interface utilisateur vous informe que le complément a été chargé.
6. Dans le ruban Accueil, un nouveau groupe appelé **Auth0** apparaît avec un bouton intitulé **Afficher** et une icône. Cliquez sur ce bouton pour ouvrir le complément.

 > Remarque : le complément se charge dans un volet Office si les commandes de complément ne sont pas prises en charge par votre version de Word.

## Test du complément

1. Le complément s’ouvre avec une page d’accueil. Cliquez sur le bouton **Se connecter**.
2. Une fenêtre contextuelle s’ouvre et vous invite à choisir un fournisseur d’identité. Cliquez sur l’un des boutons. 
3. Si vous n’êtes pas déjà connecté avec ce fournisseur, la page de connexion du fournisseur s’ouvre. (Après la première connexion, vous serez invité à octroyer l’autorisation Auth0 à votre profil.) Une fois que vous êtes connecté, la boîte de dialogue se ferme et le volet des tâches affiche la page de travail principale du complément. (Si vous êtes déjà connecté avec le fournisseur, la boîte de dialogue se ferme dès que vous cliquez sur le bouton du fournisseur.)
4. Cliquez sur le bouton **Insérer le nom d’utilisateur**. Votre nom d’utilisateur est inséré dans le document Word.

## Questions et commentaires

Nous serions ravis de connaître votre opinion sur cet exemple. Vous pouvez nous envoyer vos commentaires via la section *Problèmes* de ce référentiel.

Les questions générales sur le développement de Microsoft Office 365 doivent être publiées sur [Stack Overflow](http://stackoverflow.com/questions/tagged/office-js+API). Si votre question concerne les API Office JavaScript, assurez-vous qu’elle est marquée avec les balises [office js] et [API].

## Ressources supplémentaires

* [Documentation de complément Office](https://msdn.microsoft.com/en-us/library/office/jj220060.aspx)
* [Centre de développement Office](http://dev.office.com/)
* Plus d’exemples de complément Office sur [OfficeDev sur Github](https://github.com/officedev)

## Copyright
Copyright (c) 2016 Microsoft Corporation. Tous droits réservés.

