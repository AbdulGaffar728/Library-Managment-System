var Requests;
sendingRequest=()=>{
var RequestsInStorage=JSON.parse(localStorage.getItem("Requests"))
if(RequestsInStorage===null){
    Requests=[];
}
else{
    Requests=RequestsInStorage;
}
 if(document.getElementById("numberOfDays").value<=7){
var Request={
    userName:document.getElementById("userName").value,
    userEmai:document.getElementById("userEmail").value,
    bookName:document.getElementById("bookName").value,
    numberOfDays:document.getElementById("numberOfDays").value
}
Requests.push(Request);
localStorage.setItem("Requests",JSON.stringify(Requests))
alert("Your request is submitted.");
// window.location.href="User Site.html";
    }
    else{
        alert("Plz enter maximum 7 days.")
    }
}