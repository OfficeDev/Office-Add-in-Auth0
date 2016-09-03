// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.

/* This file provides the functionality for the page that opens in the popup 
   after the user has logged in with a provider 
*/

(function () {
    "use strict";

    // Office.initialize must be called on every page where Office JavaScript is 
    // called. Other initialization code should go inside it.
    Office.initialize = function() {        
        $(document).ready(function () {  

            try {
                // Auth0 adds its access token as a hash (#) value on the URL
                var accessTokenForAuth0 = getHashStringParameter('access_token');            

                // Create the outcome message and send it to the task pane.
                var messageObject = {outcome: "success", auth0Token: accessTokenForAuth0};            
                var jsonMessage = JSON.stringify(messageObject);

                // Tell the task pane about the outcome.
                Office.context.ui.messageParent(jsonMessage);
            }
            catch(err) {
                
                // Create the outcome message and send it to the task pane.
                var messageObject = {outcome: "failure", error: err.message};            
                var jsonMessage = JSON.stringify(messageObject);

                // Tell the task pane about the outcome.
                Office.context.ui.messageParent("message to parent " + jsonMessage); 
            }
        });
    }

    // Function to retrieve a hash string value when the hash
    // value is structured like query parameters.
    function getHashStringParameter(paramToRetrieve) {
        var hash = location.hash.replace('#', '');
        var params = hash.split("&");
        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split("=");
            if (singleParam[0] == paramToRetrieve)
                return singleParam[1];
        }
    }
}());    
 