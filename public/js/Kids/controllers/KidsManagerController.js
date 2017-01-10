app.controller('KidsManagerController', function ($scope) {
    
    $scope.message = 'Add or Edit Kids Name';
    var config = {
        apiKey: "AIzaSyD4I-ZbYU-RsinBKZA8gPdEjcWP1oVaG6c",
        authDomain: "statesportsrecruitingdb.firebaseapp.com",
        databaseURL: "https://statesportsrecruitingdb.firebaseio.com",
        storageBucket: "statesportsrecruitingdb.appspot.com",
        messagingSenderId: "1098944814860"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    var ChildrenTable = firebase.database().ref("Children");
    $scope.ChildList = [];
    $scope.LoadChildren = function () {
        
        
        // Make sure we remove all previous listeners.
        ChildrenTable.off();
        
        var ele = "";
        var setMessage = function (data) {
            var val = data.val();
            
            
                $scope.ChildList.push({ ID: data.key, ChildName: val.ChildName })
                
            
        }.bind(function () {
            for (var a = 0; a <= $scope.ChildList.length; a++) {
                var Child = $scope.ChildList[a];
                ele += "<tr><td><i class='fa fa-pencil' aria-hidden='true'></i>&nbsp;|&nbsp;<i class='fa fa-trash' aria-hidden='true'></i></td><td>" + Child.ChildName + "</td></tr>";
                angular.element(document.getElementById("ChildList")).append(ele);
            }
        });
        ChildrenTable.orderByKey().on('child_added', setMessage);
        ChildrenTable.orderByKey().on('child_changed', setMessage);
       
        
       
    }
    $scope.AddChild = function () {
        
        var user = firebase.auth().currentUser;
        
        var ChildrenTableRef = ChildrenTable.push();

        ChildrenTableRef.set({
            uid: user.uid,
            Author: user.displayName,
            Created: new Date().toString(),
            ModifiedBy: user.displayName,
            Modified: new Date().toString(),
            ChildName: $scope.ChildName
        }, function ()
        {
            $scope.ChildName = "";
            Notify("Your changes has been saved",null,null, "success");
            
        });
    }

    $scope.LoadChildren();
});

Notify = function (text, callback, close_callback, style) {

    var time = '3000';
    var $container = $('#notifications');
    var icon = '<i class="fa fa-info-circle "></i>';

    if (typeof style == 'undefined') style = 'warning'

    var html = $('<div class="alert alert-' + style + '  hide">' + icon + " " + text + '</div>');

    $('<a>', {
        text: '×',
        class: 'button close',
        style: 'padding-left: 10px;',
        href: '#',
        click: function (e) {
            e.preventDefault()
            close_callback && close_callback()
            remove_notice()
        }
    }).prependTo(html)

    $container.prepend(html)
    html.removeClass('hide').hide().fadeIn('slow')

    function remove_notice() {
        html.stop().fadeOut('slow').remove()
    }

    var timer = setInterval(remove_notice, time);

    $(html).hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(remove_notice, time);
    });

    html.on('click', function () {
        clearInterval(timer)
        callback && callback()
        remove_notice()
    });


}