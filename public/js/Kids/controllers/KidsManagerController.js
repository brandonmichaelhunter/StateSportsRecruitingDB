
var db = null;
var tableRef = null;
var HTMLCtrls = {
    TBODY:"ChildList",
    CHILDNAMETEXTBOXID: 'ChildName',
    RECORDKEYID: 'RecordKey',
    ADDCHILDBUTTON: 'btnAddChild'
    
}
var config = {
    apiKey: "AIzaSyD4I-ZbYU-RsinBKZA8gPdEjcWP1oVaG6c",
    authDomain: "statesportsrecruitingdb.firebaseapp.com",
    databaseURL: "https://statesportsrecruitingdb.firebaseio.com",
    storageBucket: "statesportsrecruitingdb.appspot.com",
    messagingSenderId: "1098944814860"
};


var Notify = function (text, callback, close_callback, style) {

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

var initApp = function () {
    console.log('initApp');
    firebase.initializeApp(config);
    db = firebase.database();
    tableRef = firebase.database().ref(appVars.KIDS_TABLE_NAME);
    // Make sure we remove all previous listeners.
    tableRef.off();
    // When we want to add new records to our table, then we'll add a listener to update our table when we get a new record.
    tableRef.orderByKey().on('child_added', addChildElement);
};
var addChildElement = function (data) {
    console.log('addChildElement');
    var srcEle = document.getElementById(HTMLCtrls.TBODY);
    var recordID = data.key;
    var recordRef = data.val();
    var childName = recordRef.ChildName;
    var template = "<tr><td><button type='button' class='editChildButton' onclick='EditChild('" + recordID + "','" + childName + "');'  ><i class='fa fa-pencil' aria-hidden='true'></i></button>&nbsp;|&nbsp;<i class='fa fa-trash' aria-hidden='true'></i></td><td><label class='" + recordID + "'>" + childName + "</lable></td></tr>";

    srcEle.innerHTML += template;
    
    //beetle(".beetles").addEventListener('click',EditChildName(recordID, childName));
};
var AddChild = function () {
    console.log('AddChild');
    var user = firebase.auth().currentUser;
    var ChildrenTable = tableRef.push();
    var childName = document.getElementById('ChildName').value;
    
    if (childName.length != 0) {

        ChildrenTable.set({
            uid: user.uid,
            Author: user.displayName,
            Created: new Date().toString(),
            ModifiedBy: user.displayName,
            Modified: new Date().toString(),
            ChildName: childName
        }, function () {
            document.getElementById("ChildName").value = null;
            Notify("Your changes has been saved", null, null, "success");
        });
    }
    else {
        Notify("Please provide your child's first name", null, null, "danger");
    }
};
var EditChild = function (Key, ChildName) {
    console.log('EditChild');
    //Get an instance of the ChildName textbox control
    var textboxCtrl = document.getElementById(HTMLCtrls.CHILDNAMETEXTBOXID);
    //Get an instance of the hidden element that will store our record primary key
    var hiddenCtrl = document.getElementById(HTMLCtrls.RECORDKEYID);

    //Populate the textbox with the child's name.
    textboxCtrl.value = ChildName;

    //Set the record key for use later.
    hiddenCtrl.value = Key;

};
window.addEventListener('load', function () {
    initApp();
    document.getElementById(HTMLCtrls.ADDCHILDBUTTON).addEventListener('click', AddChild);
    
});