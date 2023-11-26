var returnBookRequests=[]
ReturnBook=()=>{
  var localStorageData=JSON.parse(localStorage.getItem("returnRequests"))
  if(localStorage===null){
      returnBookRequests=[]
  }
  else{
      returnBookRequests=localStorageData;
  }
  var returningRequests={
      userName:document.getElementById("userName").value,
      userEmail:document.getElementById("userEmail").value,
      bookName:document.getElementsById("bookName").value
  }
  returnBookRequests.push(returningRequests);
  localStorage.setItem("returnRequests",returnBookRequests)
  alert("Your request for return book sended to admin.");
  window.location.href="User Site.html";
}