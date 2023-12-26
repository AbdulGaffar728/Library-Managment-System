var words,bookNameInCamelCase,allBooksData,indexAtBookIsInIssuedBooks,issuedBooks;
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
deletingBook=()=>{
    caseConverter=(para)=>{
        words=(para).split(' ');
          for(var j=0;j<words.length;j++){
              words[j]=words[j].charAt(0).toUpperCase() + words[j].slice(1);
          }
          return words.join(' ')
        }
        issuedBooks=JSON.parse(localStorage.getItem("acceptedRequests"))
        allBooksData=JSON.parse(localStorage.getItem("BooksData"));
    if(issuedBooks===null){
        issuedBooks=[]
    }
    if(allBooksData===null){
        DisplayingPopup()
        document.getElementById("text").innerHTML="No data match."
        addEventOnEnter()
    }
    else{
        for(var i=0;i<allBooksData.length;i++){
            for(var k=0;k<issuedBooks.length;k++){
          if(allBooksData[i].bookName===(document.getElementById("BookName").value).toLowerCase()){   
                bookNameInCamelCase=caseConverter(allBooksData[i].bookName)
                if(allBooksData[i].bookName.toLowerCase()===issuedBooks[k].bookName.toLowerCase()){
                    indexAtBookIsInIssedBooks=k;
                    DisplayingPopup()
                    document.getElementById("no").style.display="block"
                    document.getElementById("yes").innerHTML="Delete"
                    document.getElementById("no").innerHTML="Cancel"
                    document.getElementById("yes").style.backgroundColor="red"
                    document.getElementById("text").innerHTML=`${bookNameInCamelCase} book was assigned to someone. Do you want to delete this book.`
                    addEventOnEnter()
                    return;    
                }
             } 
           } 
        }
            //if not issue than delete it
        for(var c=0;c<allBooksData.length;c++){
            if(allBooksData[c].bookName===(document.getElementById("BookName").value).toLowerCase()){
                 bookInCamelCase=caseConverter(allBooksData[c].bookName)
                 allBooksData.splice(c,1)
                 localStorage.setItem("BooksData",JSON.stringify(allBooksData));
                 DisplayingPopup()
                 document.getElementById("text").innerHTML=`${bookInCamelCase}  Book data deleted successfully.`
                 addEventOnEnter()
                 return;                   
            }
            else if(c===(allBooksData.length-1))
                { 
                    DisplayingPopup()
                    document.getElementById("text").innerHTML="No data match."
                    addEventOnEnter()
                    return;
                }
            }
    }
}
no=()=>{
    document.getElementById("Popup").style.display="none"
}
yes=()=>{
    if(document.getElementById("text").innerHTML==="No data match."){
        no();
    }
    else if(document.getElementById("text").innerHTML===`${bookNameInCamelCase} book was assigned to someone. Do you want to delete this book.`){
        for(var z=0;z<allBooksData.length;z++){
            if(allBooksData[z].bookName===(document.getElementById("BookName").value).toLowerCase()){
                   allBooksData.splice(z,1)
                   localStorage.setItem("BooksData",JSON.stringify(allBooksData));
                   DisplayingPopup()
                   document.getElementById("text").innerHTML=`${bookNameInCamelCase}  Book data deleted successfully.`
                   addEventOnEnter()
                   issuedBooks.splice(indexAtBookIsInIssuedBooks,1)
                   localStorage.setItem("acceptedRequests",JSON.stringify(issuedBooks))
                   return;
            }
        }
    }
    else{
        window.location.href="Admin Site.html"
    }
}