var defaultColor = '#fff';
var clickedColor = '#f0f0f0';

// change input field background color on click
document.getElementById('one').addEventListener('click', function(){
    document.getElementById('two').style.backgroundColor=defaultColor;
    document.getElementById('category').style.backgroundColor=defaultColor;

    document.getElementById('three').style.backgroundColor=defaultColor;
    document.getElementById('due-date').style.backgroundColor=defaultColor;

    document.getElementById('one').style.backgroundColor=clickedColor;
    document.getElementById('description').style.backgroundColor=clickedColor;
});

document.getElementById('two').addEventListener('click', function(){
    document.getElementById('one').style.backgroundColor=defaultColor;
    document.getElementById('description').style.backgroundColor=defaultColor;

    document.getElementById('three').style.backgroundColor=defaultColor;
    document.getElementById('due-date').style.backgroundColor=defaultColor;

    document.getElementById('two').style.backgroundColor=clickedColor;
    document.getElementById('category').style.backgroundColor=clickedColor;
});

document.getElementById('three').addEventListener('click', function(){
    document.getElementById('one').style.backgroundColor=defaultColor;
    document.getElementById('description').style.backgroundColor=defaultColor;

    document.getElementById('two').style.backgroundColor=defaultColor;
    document.getElementById('category').style.backgroundColor=defaultColor;

    document.getElementById('three').style.backgroundColor=clickedColor;
    document.getElementById('due-date').style.backgroundColor=clickedColor;
});

// update checkbox and strike off text on selecting a card
$('.card-selector').click(function( event ) {
    var parent = $(this).parent();
    $(this).children().toggleClass("hide");
    $(parent[0].children[1]).toggleClass("strike");
    parent.toggleClass("delete");
});

//function to fetch all the selected contacts and call the server along with the ids of selected cards to be deleted
function deleteContacts(){
    console.log("deleting selected contacts")
    var ids = [];
    $("li").each(function() {
        // console.log($( this )[0].children[0].classList.length);
        let card = $(this)[0].children[0];
        // console.log(card);
        if(card.classList.length == 2){
            console.log("id : ", card.id);
            ids.push(card.id);
        }
    });
    console.log(ids);

    $.post("/delete", { 'ids': ids } ).done(function(data){
        console.log(data);
        location.reload();
    });
}

// restrict date picker to not allow user to pick a previous date
$(document).ready(function(){
    $('#due-date').attr('min', todayDate());
});

function todayDate() {
    var today = new Date(); // get the current date
    var dd = today.getDate(); //get the day from today.
    var mm = today.getMonth()+1; //get the month from today +1 because january is 0!
    var yyyy = today.getFullYear(); //get the year from today

    //if day is below 10, add a zero before (ex: 9 -> 09)
    if(dd<10) {
        dd='0'+dd
    }

    //like the day, do the same to month (3->03)
    if(mm<10) {
        mm='0'+mm
    }

    //finally join yyyy mm and dd with a "-" between then
    return yyyy+'-'+mm+'-'+dd;
}