var loggedInUser=JSON.parse(localStorage.getItem("loggedInUser"))
caseConverter=(para)=>{
   var words=(para).split(' ');
      for(var j=0;j<words.length;j++){
          words[j]=words[j].charAt(0).toUpperCase() + words[j].slice(1);
      }
      return words.join(' ')
    }
//Deleting response which is seen by user.
responseSeen=()=>{
    var idOfClickedButton=event.target.parentNode.id;
    var parentElement=document.getElementById(idOfClickedButton)
    var bookSeen=parentElement.childNodes[0].childNodes[0].innerHTML
    var returnAcceptedRequests=JSON.parse(localStorage.getItem("bookReturnAcceptedRequests"))
    var acceptedRequests=JSON.parse(localStorage.getItem("acceptedRequests"))
    var declinedRequests=JSON.parse(localStorage.getItem("declinedRequests"))
    if(returnAcceptedRequests===null){
        returnAcceptedRequests=[]
    }
    else{
      for(var c=0;c<returnAcceptedRequests.length;c++){
          if(bookSeen.toLowerCase()===returnAcceptedRequests[c].bookName
          && loggedInUser.Email===returnAcceptedRequests[c].userEmail){
              returnAcceptedRequests.splice(c,1)
              localStorage.setItem("bookReturnAcceptedRequests",JSON.stringify(returnAcceptedRequests))
              loadingData()
              return;
          }
      }
    }
    if(acceptedRequests===null){
        acceptedRequests=[]
    }
    else{
      for(var d=0;d<acceptedRequests.length;d++){
          if(bookSeen.toLowerCase()===acceptedRequests[d].bookName
          && loggedInUser.Email===acceptedRequests[d].userEmail){
              acceptedRequests.splice(d,1)
              localStorage.setItem("acceptedRequests",JSON.stringify(acceptedRequests))
              loadingData()
              return;
          }
       }
    }
    if(declinedRequests===null){
        declinedRequests=[]
    }
    else{ 
      for(var e=0;e<declinedRequests.length;e++){
          if(bookSeen.toLowerCase()===declinedRequests[e].bookName
          && loggedInUser.Email===declinedRequests[e].userEmail){
              declinedRequests.splice(e,1)
              localStorage.setItem("declinedRequests",JSON.stringify(declinedRequests))
              loadingData()
              return;
          }
      }
    }
}
//Showing responses
createView=(book,msg,idNumber,date)=>{
   var creatingParent=document.createElement("div")
   var creatingPara=document.createElement("p")
   var dateAndMsg=document.createElement("span")
   var spanForBookName=document.createElement("span")
   var creatingButton=document.createElement("button")
   spanForBookName.innerHTML=caseConverter(book);
   creatingParent.id="Parent"+idNumber
   dateAndMsg.innerHTML=` ${msg} ${date}`
   document.getElementById("responseData").appendChild(creatingParent)
   creatingParent.appendChild(creatingPara)
   creatingParent.appendChild(creatingButton)
   creatingButton.innerHTML="OK"
   creatingButton.className="OK"
   creatingParent.className="responsingBox"
   creatingButton.addEventListener('click',responseSeen)
   creatingPara.appendChild(spanForBookName)
   creatingPara.appendChild(dateAndMsg)
}
    //checking no of responses by admin
loadingData=()=>{
    document.getElementById("responseData").innerHTML=""
   var noOfResponse=0
   var returnAcceptedRequests=JSON.parse(localStorage.getItem("bookReturnAcceptedRequests"))
   var acceptedRequests=JSON.parse(localStorage.getItem("acceptedRequests"))
   var declinedRequests=JSON.parse(localStorage.getItem("declinedRequests"))
     if(acceptedRequests===null){
        acceptedRequests=[];
     }
     else{
         for(var a=0;a<acceptedRequests.length;a++){
          if(loggedInUser.Email===acceptedRequests[a].userEmail){
             noOfResponse+=1;
             var acceptedDate=`${acceptedRequests[a].givenDate}-${Number(acceptedRequests[a].givenMonth)+1}-${acceptedRequests[a].givenYear}`
             createView(acceptedRequests[a].bookName,"book assign request was accepted at",noOfResponse,acceptedDate)
          }
         }
       
     }
     if(declinedRequests===null){
          declinedRequests=[];
      }
     else{
         for(var a=0;a<declinedRequests.length;a++){
           if(loggedInUser.Email===declinedRequests[a].userEmail){
              noOfResponse+=1;
              createView(declinedRequests[a].bookName,"book assign request was declined at ",noOfResponse,declinedRequests[a].declinedDate)
           }
         }    
      }
      if(returnAcceptedRequests===null){
          returnAcceptedRequests=[]
      }
      else{
          for(var b=0;b<returnAcceptedRequests.length;b++){
              if(loggedInUser.Email===returnAcceptedRequests[b].userEmail){
                  noOfResponse+=1;
                  createView(returnAcceptedRequests[b].bookName,"book return request was accepted at",noOfResponse,returnAcceptedRequests[b].returnDate)
              }
          }
        }
     if(noOfResponse===0){
        createView("No","Response Data",noOfResponse,"Found")
        var okButtons=document.getElementsByClassName("OK")
        for(var f=0;f<okButtons.length;f++){
            okButtons[f].style.display="none"
        }
     }    
    
    document.getElementById("noOfResponses").innerHTML=noOfResponse;
    }
