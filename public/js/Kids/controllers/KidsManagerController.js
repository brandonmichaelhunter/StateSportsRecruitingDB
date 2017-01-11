
 
var HTMLCtrls = 
{
    TBODY:"ChildList",
    CHILDNAMETEXTBOXID: 'ChildName',
    RECORDKEYID:'RecordKey'
}
app.controller('KidsManagerController', function ($scope,$compile) {
    $scope.isDisabled = false;
    
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
    //LoadChildren - this will load all the children into the main table. Listerns has been added to update the main table when a record is created, modified or deleted.
    $scope.LoadChildren = function () {


        // Make sure we remove all previous listeners.
        ChildrenTable.off();
        // When we want to add new records to our table, then we'll add a listener to update our table when we get a new record.
        ChildrenTable.orderByKey().on('child_added', addChildElement);


        //ChildrenTable.orderByKey().on('child_changed', setMessage);
    }
    /*EditChildName - this display a child's name into the ChildName textbox field for a user to edit a child's name. */
    $scope.EditChildName = function (Key, ChildName) {
        //Get an instance of the ChildName textbox control
        var textboxCtrl = document.getElementById(HTMLCtrls.CHILDNAMETEXTBOXID);
        //Get an instance of the hidden element that will store our record primary key
        var hiddenCtrl = document.getElementById(HTMLCtrls.RECORDKEYID);

        //Populate the textbox with the child's name.
        textboxCtrl.value = ChildName;

        //Set the record key for use later.
        hiddenCtrl.value = Key;

    };
    var beetle = function (selector) {
        return document.querySelector(selector);
    };
    var addChildElement = function (data) {
        var srcEle = document.getElementById(HTMLCtrls.TBODY);
        var recordID = data.key;
        var recordRef = data.val();
        var childName = recordRef.ChildName;
        var template = "<tr><td><button type='button' class='beetles' ><i class='fa fa-pencil' aria-hidden='true'></i></button>&nbsp;|&nbsp;<i class='fa fa-trash' aria-hidden='true'></i></td><td><label class='"+recordID +"'>" + childName + "</lable></td></tr>";
        
        
        srcEle.innerHTML += template;
        beetle(".beetles").addEventListener('click',EditChildName(recordID, childName));
    }
    $scope.disableButton = function () {
        if ($scope.ChildName == null) {
            console.log(true)
            return true;
        }
        else {
            console.log(false)
            return false;

        }
    }
    $scope.AddChild = function () {

        var user = firebase.auth().currentUser;

        var ChildrenTableRef = ChildrenTable.push();
        if ($scope.ChildName != null || $scope.ChildName == '') {


            $scope.isDisabled = true;
            ChildrenTableRef.set({
                uid: user.uid,
                Author: user.displayName,
                Created: new Date().toString(),
                ModifiedBy: user.displayName,
                Modified: new Date().toString(),
                ChildName: $scope.ChildName
            }, function () {
                $scope.ChildName = null;
                document.getElementById("ChildName").value = null;
                Notify("Your changes has been saved", null, null, "success");


            });
        }
        else {
            Notify("Please provide your child's first name", null, null, "danger");
        }
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