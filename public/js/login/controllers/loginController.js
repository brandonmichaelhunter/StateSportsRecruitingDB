app.controller('loginController', function ($scope) {
    $scope.message = 'Firebase Demo App';
    var config = {
        apiKey: "AIzaSyD4I-ZbYU-RsinBKZA8gPdEjcWP1oVaG6c",
        authDomain: "statesportsrecruitingdb.firebaseapp.com",
        databaseURL: "https://statesportsrecruitingdb.firebaseio.com",
        storageBucket: "statesportsrecruitingdb.appspot.com",
        messagingSenderId: "1098944814860"
    };
    firebase.initializeApp(config);
    // FirebaseUI config.
    var uiConfig = {
        signInSuccessUrl: 'pages/home.html',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>'
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
});