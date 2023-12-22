var loggedInUser=JSON.parse(localStorage.getItem("loggedInUser"))
document.getElementById("userName").value=loggedInUser.Name;
document.getElementById("userEmail").value=loggedInUser.Email
ReturnBook=()=>{
  var givenBooksData=JSON.parse(localStorage.getItem("acceptedRequests"))
  var returnBookRequests=JSON.parse(localStorage.getItem("returnRequests"))
  if(givenBooksData===null){
      givenBooksData=[]
  }
  if(returnBookRequests===null){
      returnBookRequests=[]
  }
  var assignedOrNot=false;
  for(var a=0;a<givenBooksData.length;a++){
      if(givenBooksData[a].userEmail===document.getElementById("userEmail").value
      && givenBooksData[a].bookName===document.getElementById("bookName").value.toLowerCase())
      {
          assignedOrNot=true;
      }
  }
  if(assignedOrNot===false){
    alert("This book was not assigned to you.Confirm that spells and other inputs are correct.")
    return;
  }
  var returningRequests={
      userName:document.getElementById("userName").value.toLowerCase(),
      userEmail:document.getElementById("userEmail").value,
      bookName:document.getElementById("bookName").value.toLowerCase()
  }
  returnBookRequests.push(returningRequests);
  localStorage.setItem("returnRequests",JSON.stringify(returnBookRequests))
  alert("Your request for return book sended to admin.");
  window.location.href="User Site.html";
}