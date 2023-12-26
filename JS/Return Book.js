var loggedInUser=JSON.parse(localStorage.getItem("loggedInUser"))
document.getElementById("userName").value=loggedInUser.Name;
document.getElementById("userEmail").value=loggedInUser.Email
DisplayingPopup=()=>{
    document.getElementById("Popup").style.display="block"
    document.getElementById("no").style.display="none"
    document.getElementById("yes").innerHTML="OK"
    document.getElementById("buttons").style.marginTop="10px"
    document.getElementById("yes").style.backgroundColor="black"
  }
addEventOnEnter=()=>{
    if(document.getElementById("Popup").style.display==="block"){
      document.addEventListener("keydown",function(event){
        if(event.key==="Enter"){
          yes()
        }
      })
    }
  }
ReturnBook=()=>{
    var allBooks=JSON.parse(localStorage.getItem("BooksData"));
  var givenBooksData=JSON.parse(localStorage.getItem("acceptedRequests"))
  var returnBookRequests=JSON.parse(localStorage.getItem("returnRequests"))
  if(givenBooksData===null){
      givenBooksData=[]
  }
  if(returnBookRequests===null){
      returnBookRequests=[]
  }
  if(allBooks===null){
        allBooks=[]
    }
  
// checking book exists or not
var isExist=false;
for(var z=0;z<allBooks.length;z++){
     if(allBooks[z].bookName===document.getElementById("bookName").value.toLowerCase()){
         isExist=true;
     }
    }
    if(isExist===false){
       DisplayingPopup()
        document.getElementById("text").innerHTML=`Book with this name not exists`
        addEventOnEnter()
        return;
    }
  //checking this book was assigned or not
  var assignedOrNot=false;
  for(var a=0;a<givenBooksData.length;a++){
      if(givenBooksData[a].userEmail===document.getElementById("userEmail").value
      && givenBooksData[a].bookName===document.getElementById("bookName").value.toLowerCase())
      {
          assignedOrNot=true;
      }
  }
  if(assignedOrNot===false){
    DisplayingPopup()
    document.getElementById("text").innerHTML="This book was not assigned to you. Confirm that all input values are correct."
    addEventOnEnter()
    return;
  }
  var returningRequests={
      userName:document.getElementById("userName").value.toLowerCase(),
      userEmail:document.getElementById("userEmail").value,
      bookName:document.getElementById("bookName").value.toLowerCase()
  }
       returnBookRequests.push(returningRequests);
       localStorage.setItem("returnRequests",JSON.stringify(returnBookRequests))
       DisplayingPopup()
       document.getElementById("text").innerHTML="Your request for return book sended to admin.";
       addEventOnEnter()
}
yes=()=>{
    if(document.getElementById("text").innerHTML==="Your request for return book sended to admin."){
        window.location.href="User Site.html";
    }
    else{
      document.getElementById("Popup").style.display="none"
    }
}