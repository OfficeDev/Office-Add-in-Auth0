// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.

/* 
   This file provides the functionality for the page that opens in the popup. 
*/

(function () {
    "use strict";

    try {

        // Redirect to Auth0 and tell it which provider to use.
        var auth0AuthorizeEndPoint = 'https://' + localStorage.getItem('Auth0Subdomain') + '.auth0.com/authorize/';

        $(document).ready(function () {
            $("#facebookButton").click(function () {
                console.log("facebook clicked" + auth0AuthorizeEndPoint);
                redirectToIdentityProvider('facebook');
            });

            $("#googleButton").click(function () {
                redirectToIdentityProvider('google-oauth2');
            });

            $("#msAccountButton").click(function () {
                redirectToIdentityProvider('windowslive');
            });
        })

        function redirectToIdentityProvider(provider) {

            window.location.replace(auth0AuthorizeEndPoint
                + '?'
                + 'response_type=token'
                + '&client_id=' + localStorage.getItem('Auth0ClientID')
                + '&redirect_uri=https://localhost:3000/popupRedirect.html'
                + '&scope=openid'
                + '&connection=' + provider);
        }

    }
    catch(err) {
        console.log(err.message);
    }
}());  

