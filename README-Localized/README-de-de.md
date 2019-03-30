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
# <a name="archived-office-add-in-that-uses-the-auth0-service-to-simplify-social-login"></a>[ARCHIVIERT] Office-Add-In, das den Dienst Auth0 zur vereinfachten Anmeldung an sozialen Netzwerken verwendet

> **Hinweis:** Dieses Repository wurde archiviert und wird nicht mehr aktualisiert. Das Projekt oder seine Abhängigkeiten enthalten möglicherweise Sicherheitsrisiken. Wenn Sie beabsichtigen, dieses Repository wiederzuverwenden oder darin enthaltenen Code auszuführen, führen Sie bitte zuerst angemessene Sicherheitsprüfungen des Codes oder der Abhängigkeiten durch. Verwenden Sie dieses Projekt nicht als Ausgangspunkt zum Erstellen eines Office-Add-Ins für die Produktionsumgebung. Beginnen Sie die Erstellung von Produktionscode immer mit dem Entwicklungsworkload für Office/SharePoint in Visual Studio oder mit dem [Yeoman-Generator für Office-Add-Ins](https://github.com/OfficeDev/generator-office), und befolgen Sie bei der Entwicklung des Add-Ins die bewährten Methoden für die Sicherheit.

Der Dienst Auth0 vereinfacht die Anmeldung über soziale Netzwerke, die von Onlinediensten wie Facebook, Google und Microsoft bereitgestellt wird. Dieses Beispiel zeigt die Verwendung von Auth0 in einem Office-Add-In. 

## <a name="table-of-contents"></a>Inhalt
* [Änderungsverlauf](#change-history)
* [Voraussetzungen](#prerequisites)
* [Konfigurieren des Projekts](#configure-the-project)
* [Erstellen eines Auth0-Kontos und Konfigurieren des Kontos für die Verwendung von Google, Facebook und Microsoft-Konto](#create-an-auth0-account-and-configure-it-to-use-google,-facebook,-and-microsoft-account)
* [Hinzufügen Ihrer Auth0-Kontowerte zum Beispielcode](#add-your-auth0-account-values-to-the-sample-code)
* [Bereitstellen des Add-Ins](#deploy-the-add-in)
* [Ausführen des Projekts](#run-the-project)
* [Starten des Add-Ins](#start-the-add-in)
* [Testen des Add-Ins](#test-the-add-in)
* [Fragen und Kommentare](#questions-and-comments)
* [Zusätzliche Ressourcen](#additional-resources)

## <a name="change-history"></a>Änderungsverlauf

6. September 2016:

* Ursprüngliche Version

## <a name="prerequisites"></a>Voraussetzungen

* Ein Konto mit [Auth0](https://auth0.com)
* Word 2016 für Windows, Build 16.0.6727.1000 oder höher.
* [Node und npm](https://nodejs.org/en/) Das Projekt ist so konfiguriert, dass npm als Paket-Manager und für die Taskausführung verwendet wird. Zudem wird Lite Server als der Webserver verwendet, der das Add-In während der Entwicklung hostet, sodass das Add-In schnell betriebsbereit ist. Sie können jedoch auch eine andere Taskausführung oder einen anderen Webserver verwenden.
* [Git Bash](https://git-scm.com/downloads) (Oder ein anderer Git-Client.)

## <a name="configure-the-project"></a>Konfigurieren des Projekts

Führen Sie in dem Ordner, in dem das Projekt erstellt werden soll, die folgenden Befehle in der Git Bash-Shell aus:

1. ```git clone {URL of this repo}``` zum Klonen dieses Repositorys auf ihrem lokalen Computer.
2. ```npm install``` zum Installieren aller Abhängigkeiten in der Datei „package.json“.
3. ```bash gen-cert.sh``` zum Erstellen des für die Ausführung dieses Beispiels erforderlichen Zertifikats. 

Legen Sie das Zertifikat als vertrauenswürdige Stammzertifizierungsstelle fest. Dies sind die Schritte auf einem Windows-Computer:

1. Doppelklicken Sie im Repository-Ordner auf dem lokalen Computer auf „ca.crt“, und wählen Sie **Zertifikat installieren** aus. 
2. Wählen Sie **Lokaler Computer** aus, und wählen Sie **Weiter**, um den Vorgang fortzusetzen. 
3. Wählen Sie die Option **Alle Zertifikate in folgendem Speicher speichern**, und wählen Sie dann **Durchsuchen**.
4. Wählen Sie **Vertrauenswürdige Stammzertifizierungsstellen** und dann **OK**. 
5. Wählen Sie **Weiter** und dann **Fertig stellen**. 

## <a name="create-an-auth0-account-and-configure-it-to-use-google-facebook-and-microsoft-account"></a>Erstellen eines Auth0-Kontos und Konfigurieren des Kontos für die Verwendung von Google-, Facebook- und Microsoft-Konten

Unter Umständen kann sich die Benutzeroberfläche und Terminologie von Auth0 ändern, nachdem diese Infodatei veröffentlicht wurde. Wir haben versucht, möglichst wenige Annahmen über die Benutzeroberfläche zu machen, aber ggf. können Sie den folgenden Schritten entnehmen, was zu tun ist, und dann die Auth0-Hilfe zu Rate ziehen.

1. Erstellen Sie im Auth0-Dashboard ein Konto (Ggf. können Sie auch ein vorhandenes Konto verwenden). Sie werden aufgefordert, einen Kontonamen auszuwählen, der als die Unterdomäne in auth0.com fungieren wird, mit der das Add-In interagiert. Beispiel: `officeaddin.auth0.com`. Notieren Sie sich diesen Namen.
2. Wenn Sie zur Auswahl von Anbietern aufgefordert werden, wählen Sie Facebook, Google und Microsoft-Konto aus. In diesem Beispiel werden keine anderen verwendet. Deaktivieren Sie daher alle anderen, die standardmäßig aktiviert sind, einschließlich der Option **Datenbank** (oder **Authentifizierung mit Benutzername und Kennwort**). Sie können diese Einstellung später ändern, wenn Sie das Beispiel auf andere Anbieter erweitern möchten.
3. Auth0 erstellt eine **Standard-App** (auch als **Client** bezeichnet) in dem Konto. Navigieren Sie zu den **Einstellungen** für diese App.
4. Notieren Sie sich die Client-ID. Sie benötigen sie in einem späteren Schritt.
5. Wählen Sie für **Clienttyp** die Option **Einseitige Anwendung** aus. 
6. Geben Sie unter **Zulässige Rückrufe** den Wert `https://localhost:3000/popupRedirect.html` ein.
7. Belassen Sie alle anderen Einstellungen auf ihren Standardwerten, und klicken Sie auf **Änderungen speichern**.

## <a name="add-your-auth0-account-values-to-the-sample-code"></a>Hinzufügen Ihrer Auth0-Kontowerte zum Beispielcode

1. Öffnen Sie die Datei „index.js“, und suchen Sie die folgenden Zeilen im oberen Bereich:
```
Auth0AccountData.subdomain = '{Auth0 account subdomain}';
Auth0AccountData.clientID = '{Auth0 client ID}';
```
2. Ersetzen Sie die Platzhalter durch die entsprechenden Zeichenfolgen, die Sie im vorangehenden Verfahren notiert haben.

## <a name="deploy-the-add-in"></a>Bereitstellen des Add-Ins

Jetzt müssen Sie Microsoft Word mitteilen, wo es das Add-In finden kann.

1. Erstellen Sie eine Netzwerkfreigabe, oder [Geben Sie einen Ordner im Netzwerk frei](https://technet.microsoft.com/de-de/library/cc770880.aspx).
2. Kopieren Sie die Manifestdatei „Office-Add-in-Auth0.xml“ aus dem Stammordner des Projekts in den freigegebenen Ordner.
3. Starten Sie Word, und öffnen Sie ein Dokument.
4. Klicken Sie auf die Registerkarte **Datei**, und klicken Sie dann auf **Optionen**.
5. Wählen Sie **Sicherheitscenter** aus, und klicken Sie dann auf die Schaltfläche **Einstellungen für das Sicherheitscenter**.
6. Wählen Sie **Vertrauenswürdige Add-In-Kataloge** aus.
7. Geben Sie in das Feld **Katalog-URL** den Netzwerkpfad zur Ordnerfreigabe an, die die Datei „Office-Add-in-Auth0.xml“ enthält, und wählen Sie dann **Katalog hinzufügen**.
8. Aktivieren Sie das Kontrollkästchen **Im Menü anzeigen**, und klicken Sie dann auf **OK**.
9. Eine Meldung wird angezeigt, dass Ihre Einstellungen angewendet werden, wenn Microsoft Office das nächste Mal gestartet wird. Schließen Sie Word.

## <a name="run-the-project"></a>Ausführen des Projekts

1. Öffnen Sie ein node-Befehlsfenster im Ordner des Projekts, und führen Sie ```npm start``` aus, um den Webdienst zu starten. Lassen Sie das Befehlsfenster geöffnet.
2. Öffnen Sie Internet Explorer oder Edge, und geben Sie in das Adressfeld ```https://localhost:3000``` ein. Wenn Sie keine Warnungen über das Zertifikat erhalten, schließen Sie den Browser, und fahren Sie weiter unten mit dem Abschnitt **Starten des Add-Ins** fort. Wenn Sie eine Warnung erhalten, dass das Zertifikat nicht vertrauenswürdig ist, fahren Sie mit den folgenden Schritten fort:
3. Der Browser bietet einen Link, um die Seite trotz der angezeigten Warnung zu öffnen. Öffnen Sie sie.
4. Nach dem Öffnen der Seite wird ein roter Zertifikatfehler in der Adressleiste angezeigt. Doppelklicken Sie auf den Fehler.
5. Wählen Sie **Zertifikat anzeigen**.
5. Wählen Sie **Zertifikat installieren**.
4. Wählen Sie **Lokaler Computer** aus, und wählen Sie **Weiter**, um den Vorgang fortzusetzen. 
3. Wählen Sie die Option **Alle Zertifikate in folgendem Speicher speichern**, und wählen Sie dann **Durchsuchen**.
4. Wählen Sie **Vertrauenswürdige Stammzertifizierungsstellen** und dann **OK**. 
5. Wählen Sie **Weiter** und dann **Fertig stellen**.
6. Schließen Sie den Browser.

## <a name="start-the-add-in"></a>Starten des Add-Ins

1. Starten Sie Word neu, und öffnen Sie ein Word-Dokument.
2. Klicken Sie auf der Registerkarte **Einfügen** in Word 2016 auf **Meine-Add-Ins**. (Möglicherweise befindet sich die Schaltfläche auf der Registerkarte **Entwickler** anstatt der Registerkarte **Einfügen**. Um die Registerkarte **Entwickler** sichtbar zu machen, folgen Sie [diesen Anweisungen](https://support.office.com/de-de/article/Show-the-Developer-tab-E1192344-5E56-4D45-931B-E5FD9BEA2D45).) 
3. Klicken Sie auf die Registerkarte **FREIGEGEBENER ORDNER**.
4. Wählen Sie **Authentifizierung mit Auth0** und dann **OK**.
5. Wenn Add-In-Befehle von Ihrer Word-Version unterstützt werden, werden Sie in der Benutzeroberfläche darüber informiert, dass das Add-In geladen wurde.
6. Das Startmenüband enthält eine neue Gruppe namens **Auth0** mit der Schaltfläche **Show** und einem Symbol. Klicken Sie auf diese Schaltfläche, um das Add-In zu öffnen.

 > Hinweis: Das Add-In wird in einem Aufgabenbereich geladen, wenn Add-In-Befehle von Ihrer Version von Word nicht unterstützt werden.

## <a name="test-the-add-in"></a>Testen des Add-Ins

1. Das Add-In wird mit einer Willkommensseite geöffnet. Klicken Sie auf die Schaltfläche **Anmelden**.
2. Ein Popup wird geöffnet, und Sie werden aufgefordert, einen Identitätsanbieter auszuwählen. Klicken Sie auf eine der Schaltflächen. 
3. Wenn Sie nicht bereits mit diesem Anbieter angemeldet sind, wird die Anmeldeseite des Anbieters geöffnet. (Nachdem Sie sich das erste Mal angemeldet haben, werden Sie aufgefordert, Auth0 die Berechtigung zu Ihrem Profil zu erteilen.) Nachdem Sie angemeldet sind, wird das Dialogfeld geschlossen, und im Aufgabenbereich wird die Hauptarbeitsseite des Add-Ins angezeigt. (Wenn Sie bereits bei dem Anbieter angemeldet sind, wird das Dialogfeld unmittelbar nach dem Anklicken der Schaltfläche des Anbieters geschlossen.)
4. Klicken Sie auf die Schaltfläche **Benutzernamen einfügen**. Ihr Benutzername wird in das Word-Dokument eingefügt.

## <a name="questions-and-comments"></a>Fragen und Kommentare

Wir schätzen Ihr Feedback hinsichtlich dieses Beispiels. Sie können uns Ihr Feedback über den Abschnitt *Probleme* dieses Repositorys senden.

Fragen zur Microsoft Office 365-Entwicklung sollten in [Stack Overflow](http://stackoverflow.com/questions/tagged/office-js+API) gestellt werden. Wenn Ihre Frage die Office JavaScript-APIs betrifft, sollte die Frage mit [office-js] und [API] kategorisiert sein.

## <a name="additional-resources"></a>Zusätzliche Ressourcen

* 
  [Dokumentation zu Office-Add-Ins](https://msdn.microsoft.com/de-de/library/office/jj220060.aspx)
* [Office Dev Center](http://dev.office.com/)
* Weitere Office-Add-In-Beispiele unter [OfficeDev auf Github](https://github.com/officedev)

## <a name="copyright"></a>Copyright
Copyright (c) 2016 Microsoft Corporation. Alle Rechte vorbehalten.



In diesem Projekt wurden die [Microsoft Open Source-Verhaltensregeln](https://opensource.microsoft.com/codeofconduct/) übernommen. Weitere Informationen finden Sie unter [Häufig gestellte Fragen zu Verhaltensregeln](https://opensource.microsoft.com/codeofconduct/faq/), oder richten Sie Ihre Fragen oder Kommentare an [opencode@microsoft.com](mailto:opencode@microsoft.com).
