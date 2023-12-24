DisplayingPopup=()=>{
    document.getElementById("Popup").style.display="block"
    document.getElementById("no").style.display="none"
    document.getElementById("yes").innerHTML="OK"
    document.getElementById("buttons").style.marginTop="10px"
    document.getElementById("yes").style.backgroundColor="black"
  }
  caseConverter=(para)=>{
    words=(para).split(' ');
      for(var j=0;j<words.length;j++){
          words[j]=words[j].charAt(0).toUpperCase() + words[j].slice(1);
      }
      return words.join(' ')
    }  
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
        confirmationButton.className="request"
        confirmationButton.id="acceptButton"+i
        confirmationButton.addEventListener("click",ReturningBook)
        confirmationButton.innerHTML="Return"
        bookName.innerHTML=caseConverter(localStorageData[i].bookName);
        userName.innerHTML=caseConverter(localStorageData[i].userName);
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
        DisplayingPopup()
        document.getElementById("text").innerHTML="Book returned successfully."
        return;
       }
       if(a===returnBookRequests.length-1){
        DisplayingPopup()
        document.getElementById("text").innerHTML="No data match.";
       }
   }
}
yes=()=>{
        document.getElementById("Popup").style.display="none"
        location.reload()   
}
Back=()=>{
    window.history.back()
}