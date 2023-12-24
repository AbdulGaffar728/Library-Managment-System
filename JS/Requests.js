var RequestsInStorage,Requests,gettingTable,userName,userEmail,bookName,noOfDays,creatingRow,confirmationBox,acceptButton,declineButton;
checkingRequests=()=>{
     RequestsInStorage=JSON.parse(localStorage.getItem("Requests"))
      if(RequestsInStorage===null || RequestsInStorage.length===0){
         Requests=[];
         creatingRow=document.createElement("tr") 
         var noData=document.createElement("th")
             noData.innerHTML="No Data Found"
             noData.colSpan="7";
             noData.style.textAlign="center"
             noData.style.color="red"
             noData.style.padding="2%"
             creatingRow.appendChild(noData)
             document.getElementById("table").appendChild(creatingRow)
      }
     else{
        Requests=RequestsInStorage;
      }
      caseConverter=(para)=>{
        words=(para).split(' ');
          for(var j=0;j<words.length;j++){
              words[j]=words[j].charAt(0).toUpperCase() + words[j].slice(1);
          }
          return words.join(' ')
        }
      for(var i=0;i<Requests.length;i++){
          creatingRow=document.createElement("tr");
          userName=document.createElement("td");
          userEmail=document.createElement("td");
          bookName=document.createElement("td");
          noOfDays=document.createElement("td");
          confirmationBox=document.createElement("td");
          acceptButton=document.createElement("button");
          declineButton=document.createElement("button");
          acceptButton.innerHTML="Accept";
          declineButton.innerHTML="Decline";
          acceptButton.className="accept";
          declineButton.className="decline";
          confirmationBox.className="confirmationBox"
          acceptButton.id="acceptButton"+i
          declineButton.id="declineButton"+i
          acceptButton.addEventListener("click",accepting)
          declineButton.addEventListener("click",decling)
          creatingRow.id="rowNo"+i;
          userName.innerHTML=caseConverter(Requests[i].userName);
          userEmail.innerHTML=Requests[i].userEmail;
          bookName.innerHTML=caseConverter(Requests[i].bookName);
          noOfDays.innerHTML=Requests[i].numberOfDays;
          document.getElementById("table").appendChild(creatingRow)
          confirmationBox.appendChild(acceptButton);
          confirmationBox.appendChild(declineButton)
          creatingRow.appendChild(userName);
          creatingRow.appendChild(userEmail);
          creatingRow.appendChild(bookName);
          creatingRow.appendChild(noOfDays);
          creatingRow.appendChild(confirmationBox);
      }

}

// Accepting Request
var idOfClickedButton,parentElement,acceptedRequestDetails;
var acceptedRequests,acceptedRequestsFromStorage;
  
accepting=()=>{
  acceptedRequestsFromStorage=JSON.parse(localStorage.getItem("acceptedRequests"))
   if(acceptedRequestsFromStorage===null){
     acceptedRequests=[];
   }
   else{
     acceptedRequests=acceptedRequestsFromStorage
   }
   idOfClickedButton=event.target.parentNode.parentNode.id;
   parentElement=document.getElementById(idOfClickedButton)
   var timeNow=new Date();
   var dateOfBookReturn=new Date();
   dateOfBookReturn.setDate(timeNow.getDate()+Number(parentElement.childNodes[3].innerHTML))
   acceptedRequestDetails={
    userName:(parentElement.childNodes[0].innerHTML).toLowerCase(),
    userEmail:parentElement.childNodes[1].innerHTML,
    bookName:(parentElement.childNodes[2].innerHTML).toLowerCase(),
    noOfDays:parentElement.childNodes[3].innerHTML,
    givenDate:timeNow.getDate(),
    givenMonth:timeNow.getMonth(),
    givenYear:timeNow.getFullYear(),
    returnDate:dateOfBookReturn,
    userSeen:"no"
   }
   acceptedRequests.push(acceptedRequestDetails);
   localStorage.setItem("acceptedRequests",JSON.stringify(acceptedRequests))

   //Deleting data of request which is accepted
   DeletingData();   
}

//Decling Request
var declinedRequestsFromStorage,declinedRequests,declinedRequestDetails
decling=()=>{
     declinedRequestsFromStorage=JSON.parse(localStorage.getItem("declinedRequests"))
     if(declinedRequestsFromStorage===null){
      declinedRequests=[];
     }
     else{
       declinedRequests=declinedRequestsFromStorage;
     }
     idOfClickedButton=event.target.parentNode.parentNode.id;
     parentElement=document.getElementById(idOfClickedButton)
     var timeNow=new Date();
     var declinedDate=`${timeNow.getDate()}-${Number(timeNow.getMonth())+1}-${timeNow.getFullYear()}`
   declinedRequestDetails={
    userName:(parentElement.childNodes[0].innerHTML).toLowerCase(),
    userEmail:parentElement.childNodes[1].innerHTML,
    bookName:(parentElement.childNodes[2].innerHTML).toLowerCase(),
    noOfDays:parentElement.childNodes[3].innerHTML,
    declinedDate:declinedDate
   }
   declinedRequests.push(declinedRequestDetails);
   localStorage.setItem("declinedRequests",JSON.stringify(declinedRequests))
  //  Deleting Data of requests which is declined
  DeletingData();
      
}
DeletingData=()=>{
  RequestsInStorage=JSON.parse(localStorage.getItem("Requests"))
   for(var j=0;j<RequestsInStorage.length;j++){
     if(RequestsInStorage[j].userName===(parentElement.childNodes[0].innerHTML).toLowerCase()
      && RequestsInStorage[j].userEmail===parentElement.childNodes[1].innerHTML
      && RequestsInStorage[j].bookName===(parentElement.childNodes[2].innerHTML).toLowerCase()
      && RequestsInStorage[j].numberOfDays===parentElement.childNodes[3].innerHTML
      ){
       RequestsInStorage.splice(j,1);
       localStorage.setItem("Requests",JSON.stringify(RequestsInStorage))
       location.reload(); 
      }
   }    
}