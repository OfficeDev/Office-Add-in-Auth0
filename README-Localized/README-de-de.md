# Office-Add-In, das den Dienst Auth0 zur vereinfachten Anmeldung an sozialen Netzwerken verwendet

Der Dienst Auth0 vereinfacht die Anmeldung an sozialen Netzwerken, die von Onlinediensten wie Facebook, Google und Microsoft bereitgestellt wird. Dieses Beispiel zeigt die Verwendung von Auth0 in einem Office-Add-In. 

## Inhaltsverzeichnis
* [Änderungsverlauf](#Änderungsverlauf)
* [Voraussetzungen](#voraussetzungen)
* [Konfigurieren des Projekts](#konfigurieren-des-projekts)
* [Erstellen eines Auth0-Kontos und Konfigurieren des Kontos für die Verwendung von Google, Facebook und Microsoft-Konto](#erstellen-eines-auth0-kontos-und-konfigurieren-des-kontos-für-die-verwendung-von-google-facebook-und-microsoft-konto)
* [Hinzufügen Ihrer Auth0-Kontowerte zum Beispielcode](#hinzufügen-ihrer-auth0-kontowerte-zum-beispielcode)
* [Bereitstellen des Add-Ins](#bereitstellen-des-add-ins)
* [Ausführen des Projekts](#ausführen-des-projekts)
* [Starten des Add-Ins](#starten-des-add-ins)
* [Testen des Add-Ins](#testen-des-add-ins)
* [Fragen und Kommentare](#fragen-und-kommentare)
* [Zusätzliche Ressourcen](#zusätzliche-ressourcen)

## Änderungsverlauf

6. September 2016:

* Ursprüngliche Version

## Voraussetzungen

* Ein Konto mit [Auth0](https://auth0.com)
* Word 2016 für Windows, Build 16.0.6727.1000 oder höher
* [Node und npm](https://nodejs.org/en/) Das Projekt ist so konfiguriert, dass npm als Paket-Manager und für die Taskausführung verwendet wird. Zudem wird Lite Server als der Webserver verwendet, der das Add-In während der Entwicklung hostet, sodass das Add-In schnell betriebsbereit ist. Sie können jedoch auch eine andere Taskausführung oder einen anderen Webserver verwenden.
* [Git Bash](https://git-scm.com/downloads) (Oder ein anderer Git-Client.)

## Konfigurieren des Projekts

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

## Erstellen eines Auth0-Kontos und Konfigurieren des Kontos für die Verwendung von Google, Facebook und Microsoft-Konto

Unter Umständen kann sich die Benutzeroberfläche und Terminologie von Auth0 ändern, nachdem diese Infodatei veröffentlicht wurde. Wir haben versucht, möglichst wenige Annahmen über die Benutzeroberfläche zu machen, aber ggf. können Sie den folgenden Schritten entnehmen, was zu tun ist, und dann die Auth0-Hilfe zu Rate ziehen.

1. Erstellen Sie im Auth0-Dashboard ein Konto (Ggf. können Sie auch ein vorhandenes Konto verwenden). Sie werden aufgefordert, einen Kontonamen auszuwählen, der als die Unterdomäne in auth0.com fungieren wird, mit der das Add-In interagiert. Beispiel: `officeaddin.auth0.com`. Notieren Sie sich diesen Namen.
2. Wenn Sie zur Auswahl von Anbietern aufgefordert werden, wählen Sie Facebook, Google und Microsoft-Konto aus. In diesem Beispiel werden keine anderen verwendet. Deaktivieren Sie daher alle anderen, die standardmäßig aktiviert sind, einschließlich der Option **Datenbank** (oder **Authentifizierung mit Benutzername und Kennwort**). Sie können diese Einstellung später ändern, wenn Sie das Beispiel auf andere Anbieter erweitern möchten.
3. Auth0 erstellt eine **Standard-App** (auch als **Client** bezeichnet) in dem Konto. Navigieren Sie zu den **Einstellungen** für diese App.
4. Notieren Sie sich die Client-ID. Sie benötigen sie in einem späteren Schritt.
5. Wählen Sie für **Clienttyp** die Option **Einseitige Anwendung** aus. 
6. Geben Sie unter **Zulässige Rückrufe** den Wert `https://localhost:3000/popupRedirect.html` ein.
7. Belassen Sie alle anderen Einstellungen auf ihren Standardwerten, und klicken Sie auf **Änderungen speichern**.

## Hinzufügen Ihrer Auth0-Kontowerte zum Beispielcode

1. Öffnen Sie die Datei „index.js“, und suchen Sie die folgenden Zeilen im oberen Bereich:
```
Auth0AccountData.subdomain = '{Auth0 account subdomain}';
Auth0AccountData.clientID = '{Auth0 client ID}';
```
2. Ersetzen Sie die Platzhalter durch die entsprechenden Zeichenfolgen, die Sie im vorangehenden Verfahren notiert haben.

## Bereitstellen des Add-Ins

Jetzt müssen Sie Microsoft Word mitteilen, wo es das Add-In finden kann.

1. Erstellen Sie eine Netzwerkfreigabe, oder [Geben Sie einen Ordner im Netzwerk frei](https://technet.microsoft.com/en-us/library/cc770880.aspx).
2. Kopieren Sie die Manifestdatei „Office-Add-in-Auth0.xml“ aus dem Stammordner des Projekts in den freigegebenen Ordner.
3. Starten Sie Word, und öffnen Sie ein Dokument.
4. Klicken Sie auf die Registerkarte **Datei**, und klicken Sie dann auf **Optionen**.
5. Wählen Sie **Sicherheitscenter** aus, und klicken Sie dann auf die Schaltfläche **Einstellungen für das Sicherheitscenter**.
6. Wählen Sie **Vertrauenswürdige Add-In-Kataloge** aus.
7. Geben Sie in das Feld **Katalog-URL** den Netzwerkpfad zur Ordnerfreigabe an, die die Datei „Office-Add-in-Auth0.xml“ enthält, und wählen Sie dann **Katalog hinzufügen**.
8. Aktivieren Sie das Kontrollkästchen **Im Menü anzeigen**, und klicken Sie dann auf **OK**.
9. Eine Meldung wird angezeigt, dass Ihre Einstellungen angewendet werden, wenn Microsoft Office das nächste Mal gestartet wird. Schließen Sie Word.

## Ausführen des Projekts

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

## Starten des Add-Ins

1. Starten Sie Word neu, und öffnen Sie ein Word-Dokument.
2. Klicken Sie auf der Registerkarte **Einfügen** in Word 2016 auf **Meine-Add-Ins**.
3. Klicken Sie auf die Registerkarte **FREIGEGEBENER ORDNER**.
4. Wählen Sie **Authentifizierung mit Auth0** und dann **OK**.
5. Wenn Add-In-Befehle von Ihrer Word-Version unterstützt werden, werden Sie in der Benutzeroberfläche darüber informiert, dass das Add-In geladen wurde.
6. Das Startmenüband enthält eine neue Gruppe namens **Auth0** mit einer Schaltfläche mit der Bezeichnung **Anzeigen** und einem Symbol. Klicken Sie auf diese Schaltfläche, um das Add-In zu öffnen.

 > Hinweis: Das Add-In wird in einem Aufgabenbereich geladen, wenn Add-In-Befehle von Ihrer Version von Word nicht unterstützt werden.

## Testen des Add-Ins

1. Das Add-In wird mit einer Willkommensseite geöffnet. Klicken Sie auf die Schaltfläche **Anmelden**.
2. Ein Popup wird geöffnet, und Sie werden aufgefordert, einen Identitätsanbieter auszuwählen. Klicken Sie auf eine der Schaltflächen. 
3. Wenn Sie nicht bereits mit diesem Anbieter angemeldet sind, wird die Anmeldeseite des Anbieters geöffnet. (Nachdem Sie sich das erste Mal angemeldet haben, werden Sie aufgefordert, Auth0 die Berechtigung zu Ihrem Profil zu erteilen.) Nachdem Sie angemeldet sind, wird das Dialogfeld geschlossen, und im Aufgabenbereich wird die Hauptarbeitsseite des Add-Ins angezeigt. (Wenn Sie bereits bei dem Anbieter angemeldet sind, wird das Dialogfeld unmittelbar nach dem Anklicken der Schaltfläche des Anbieters geschlossen.)
4. Klicken Sie auf die Schaltfläche **Benutzernamen einfügen**. Ihr Benutzername wird in das Word-Dokument eingefügt.

## Fragen und Kommentare

Wir schätzen Ihr Feedback hinsichtlich dieses Beispiels. Sie können uns Ihr Feedback über den Abschnitt *Probleme* dieses Repositorys senden.

Fragen zur Microsoft Office 365-Entwicklung sollten in [Stack Overflow](http://stackoverflow.com/questions/tagged/office-js+API) gestellt werden. Wenn Ihre Frage die Office JavaScript-APIs betrifft, sollte die Frage mit [office-js] und [API] kategorisiert sein.

## Zusätzliche Ressourcen

* [Dokumentation zu Office-Add-Ins](https://msdn.microsoft.com/en-us/library/office/jj220060.aspx)
* [Office Dev Center](http://dev.office.com/)
* Weitere Office-Add-In-Beispiele unter [OfficeDev auf Github](https://github.com/officedev)

## Copyright
Copyright (c) 2016 Microsoft Corporation. Alle Rechte vorbehalten.

