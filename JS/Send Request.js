var loggedInUser=JSON.parse(localStorage.getItem("loggedInUser"))
document.getElementById("userName").value=loggedInUser.Name;
document.getElementById("userEmail").value=loggedInUser.Email;
if(localStorage.getItem("bookName")!==null){
    document.getElementById("bookName").value=localStorage.getItem("bookName");
    localStorage.removeItem("bookName")
}

sendingRequest=()=>{
var issuedBooksData=JSON.parse(localStorage.getItem("acceptedRequests"))
var Requests=JSON.parse(localStorage.getItem("Requests"))
if(Requests===null){
    Requests=[];
}
if(issuedBooksData===null){
    issuedBooksData=[]
}
//checking is available or not
        for(var j=0;j<issuedBooksData.length;j++){
           if(issuedBooksData[j].bookName.toLowerCase()===document.getElementById("bookName").value.toLowerCase())
            {
                alert("This book is not available at that time.")
                return;
            }
        }

 if(document.getElementById("numberOfDays").value<=7){
var Request={
    userName:document.getElementById("userName").value.toLowerCase(),
    userEmail:document.getElementById("userEmail").value,
    bookName:document.getElementById("bookName").value.toLowerCase(),
    numberOfDays:document.getElementById("numberOfDays").value
}
Requests.push(Request);
localStorage.setItem("Requests",JSON.stringify(Requests))
alert("Your request is submitted.");
window.location.href="User Site.html";
    }
    else{
        alert("You can get book for maximum 7 days.")
    }
}