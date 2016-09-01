// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.

/* 
   This file provides the functionality for the page that opens in the popup. 
*/

(function () {
    "use strict";

    try {
        var provider = localStorage.getItem("provider");

        // Redirect to Auth0 and tell it which provider to use.
        var auth0AuthorizeEndPoint = 'https://' + localStorage.getItem('Auth0Subdomain') + '.auth0.com/authorize/';

        window.location.replace(auth0AuthorizeEndPoint
         + '?'
         + 'response_type=token'
         + '&client_id=' + localStorage.getItem('Auth0ClientID')
         + '&redirect_uri=https://localhost:3000/popupRedirect.html'
         + '&scope=openid'
         + '&connection=' + provider);
    }
    catch(err) {
        console.log(err.message);
    }
}());   

