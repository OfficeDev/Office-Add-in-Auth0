// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license in the root of the repo.

/* 
    This file provides the functionality for the main task pane page. 
*/

/// <reference path="./App.js" />

(function () {
    "use strict";

    var Auth0AccountData = Auth0AccountData || {};

    // Replace the placeholders in the next two lines.
    Auth0AccountData.subdomain = '{Auth0 account subdomain}';
    Auth0AccountData.clientID = '{Auth0 client ID}';

    // The Auth0 subdomain and client ID need to be shared with the popup dialog
    localStorage.setItem('Auth0Subdomain', Auth0AccountData.subdomain);
    localStorage.setItem('Auth0ClientID', Auth0AccountData.clientID);

    var dialog;

    // The Office initialize function must be run each time a new page is loaded.
    Office.initialize = function () {
        $(document).ready(function () {

            // Initialize error message banner.
            app.initialize();

            // Enable the buttons
            $(".popupButton").prop("disabled", false);

            $("#facebookButton").click(function () {
                showLoginPopup('facebook');
            });

            $("#googleButton").click(function () {
                showLoginPopup('google-oauth2');
            });

            $("#msAccountButton").click(function () {
                showLoginPopup('windowslive');
            });
        });       
    };

    // This handler responds to the success or failure message that the pop-up dialog receives from the identity provider.
    function processMessage(arg) {
        var messageFromPopupDialog = JSON.parse(arg.message);

        if (messageFromPopupDialog.outcome === "success") {

            // The provider's ticket has been stored.
            dialog.close();
            getUserData(messageFromPopupDialog.provider, messageFromPopupDialog.auth0Token);
        } else {
            
            // Something went wrong with authentication or the authorization of the web application,
            // either with Auth0 or with the provider.
            dialog.close();
            app.showNotification("User authentication and application authorization", "Unable to successfully authenticate user or authorize application: " + messageFromPopupDialog.error);
        }
    }

    // Use the Office dialog API to open a pop-up and display the sign-in page for the identity provider.
    function showLoginPopup(provider) {
        
        // Provider name needs to be shared between task pane and popup window.
        localStorage.removeItem("provider");
        localStorage.setItem("provider", provider);

        // Create the popup URL and open it.        
        var fullUrl = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/popup.html';

        // height and width are percentages of the size of the screen.
        Office.context.ui.displayDialogAsync(fullUrl,
                {height: 65, width: 40, requireHTTPS: true}, 
                function (result) {
                    dialog = result.value;
                    dialog.addEventHandler(Microsoft.Office.WebExtension.EventType.DialogMessageReceived, processMessage);
                });
    }

    function getUserData(provider, auth0AccessToken) {
            try {

                // Use the token to get Auth0's standard userinfo object.
                var userInfoEndPoint = 'https://' + Auth0AccountData.subdomain + '.auth0.com/userinfo';
                var accessTokenParameter = '?access_token=' + auth0AccessToken;

                $.get(userInfoEndPoint + accessTokenParameter,
                    function (data) { insertDataInDocument(data); }
                );
            }
            catch(err) {
                app.showNotification(err.message);
            }
    }

    function insertDataInDocument(data) {

        var parsedData = getParsedData(data);
        
        Word.run(function (context) {

            // Create a proxy object for the document body.
            var body = context.document.body;

            // Queue commands to insert text into the end of the Word document body.
            body.insertText(parsedData, "End");

            // Synchronize the document state by executing the queued commands, and 
            // return a promise to indicate task completion.
            return context.sync();
        })
        .catch(this.errorHandler);
    }

    function getParsedData(data) {

            // Auth0 repackages the JSON data from different providers into
            // a common JSON userinfo structure with consistent property names. 
            // For example, Google's "displayName" becomes just "name".             
            return data.name;
    }
}());