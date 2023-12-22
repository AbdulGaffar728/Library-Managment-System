checkingRequests=()=>{
var localStorageData=JSON.parse(localStorage.getItem("returnRequests"))
if(localStorageData===null || localStorageData.length===0){
    var creatingRow=document.createElement("tr") 
    var noData=document.createElement("th")
        noData.innerHTML="No Data Found"
        noData.colSpan="4";
        noData.style.textAlign="center"
        noData.style.color="red"
        noData.style.padding="2%"
        creatingRow.appendChild(noData)
        document.getElementById("table").appendChild(creatingRow)
}
else{
for(var i=0;i<localStorageData.length;i++){
    var creatingRow=document.createElement("tr")
        document.getElementById("table").appendChild(creatingRow);
    var bookName=document.createElement("td")
    var userName=document.createElement("td")
    var userEmail=document.createElement("td")
    var confirmation=document.createElement("td")
    var confirmationButton=document.createElement("button")
        confirmationButton.className="accept"
        confirmationButton.id="acceptButton"+i
        confirmationButton.addEventListener("click",ReturningBook)
        confirmationButton.innerHTML="Return"
        bookName.innerHTML=localStorageData[i].bookName;
        userName.innerHTML=localStorageData[i].userName;
        userEmail.innerHTML=localStorageData[i].userEmail;
        creatingRow.appendChild(bookName)
        creatingRow.appendChild(userName)
        creatingRow.appendChild(userEmail)
        creatingRow.appendChild(confirmation)
        confirmation.appendChild(confirmationButton)
        confirmationButton.style.margin="auto"
        creatingRow.id="rowNo"+i;
}
}
}
var returnBookRequests,bookReturnAcceptedRequests,responseOnReturn,idOfClickedButton,parentElement
ReturningBook=()=>{
    bookReturnAcceptedRequests=JSON.parse(localStorage.getItem("bookReturnAcceptedRequests"))
    returnBookRequests=JSON.parse(localStorage.getItem("returnRequests"))
   if(bookReturnAcceptedRequests===null){
       bookReturnAcceptedRequests=[]
   }
   if(returnBookRequests===null){
    returnBookRequests=[];
   }
   idOfClickedButton=event.target.parentNode.parentNode.id;
   parentElement=document.getElementById(idOfClickedButton)
   for(var a=0;a<returnBookRequests.length;a++){
       if(returnBookRequests[a].bookName.toLowerCase()===parentElement.childNodes[0].innerHTML.toLowerCase()
        && returnBookRequests[a].userName.toLowerCase()===parentElement.childNodes[1].innerHTML.toLowerCase()
        && returnBookRequests[a].userEmail===parentElement.childNodes[2].innerHTML){
            var timeNow=new Date();
            var returnDate=`${timeNow.getDate()}-${Number(timeNow.getMonth())+1}-${timeNow.getFullYear()}`
            responseOnReturn={
          userEmail:parentElement.childNodes[2].innerHTML,
          returnDate:returnDate,
          bookName:parentElement.childNodes[0].innerHTML
        }
        bookReturnAcceptedRequests.push(responseOnReturn)
        returnBookRequests.splice(a,1)
        localStorage.setItem("returnRequests",JSON.stringify(returnBookRequests))
        localStorage.setItem("bookReturnAcceptedRequests",JSON.stringify(bookReturnAcceptedRequests))
        alert("Book returned successfully.")
        location.reload();
        return;
       }
       if(a===returnBookRequests.length-1){
           alert("No data match.")
       }
   }
}
