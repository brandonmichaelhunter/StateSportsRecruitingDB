app.controller('recruitController', function ($scope) {
    $scope.message = 'Add new recruit';
    var config = {
        apiKey: "AIzaSyD4I-ZbYU-RsinBKZA8gPdEjcWP1oVaG6c",
        authDomain: "statesportsrecruitingdb.firebaseapp.com",
        databaseURL: "https://statesportsrecruitingdb.firebaseio.com",
        storageBucket: "statesportsrecruitingdb.appspot.com",
        messagingSenderId: "1098944814860"
    };
    firebase.initializeApp(config);
    
});