// firebasedemoapp module
var app = angular.module('firebasedemoapp', ['ngRoute']);

//configure routes

app.config(function ($routeProvider, $locationProvider) {
    
    $routeProvider.when('', {
        templateurl: 'pages/login.html',
        controller: 'logincontroller'
    })
    .when('/home', {
        templateurl: 'pages/home.html',
        controller: 'homecontroller'
    })
    $locationProvider.html5Mode(true);
});
app.controller('mainController', function ($scope) {
    $scope.message = 'firebase demo app';
});
app.controller('logincontroller', function ($scope, $location) {
    var config = {
        apikey: "aizasyd4i-zbyu-rsinbkza8gpdejcwp1ovag6c",
        authdomain: "statesportsrecruitingdb.firebaseapp.com",
        databaseurl: "https://statesportsrecruitingdb.firebaseio.com",
        storagebucket: "statesportsrecruitingdb.appspot.com",
        messagingsenderid: "1098944814860"
    };
    firebase.initializeapp(config);
    // firebaseui config.
    var uiconfig = {
        'callbacks': {
            // called when the user has been successfully signed in.
            'signinsuccess': function (user, credential, redirecturl) {
                $location.path('#!/home')
                // do not redirect.
                //return false;
            }
        },

        signinoptions: [
          // leave the lines as is for the providers you want to offer your users.
          firebase.auth.googleauthprovider.provider_id,
          firebase.auth.facebookauthprovider.provider_id,
          firebase.auth.emailauthprovider.provider_id
        ],
        // terms of service url.
        tosurl: '<your-tos-url>'
    };

    // initialize the firebaseui widget using firebase.
    var ui = new firebaseui.auth.authui(firebase.auth());
    // the start method will wait until the dom is loaded.
    ui.start('#firebaseui-auth-container', uiconfig);
})

app.controller('homecontroller', function ($scope) {
    $scope.message = 'welcome to firebase demo app home page';
});