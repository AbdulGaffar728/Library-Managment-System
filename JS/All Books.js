var loggedInUser=JSON.parse(localStorage.getItem("loggedInUser"))
var allBooksData=JSON.parse(localStorage.getItem("BooksData"));
var issuedBooks=JSON.parse(localStorage.getItem("acceptedRequests"));
    if(issuedBooks===null){
        issuedBooks=[]
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
    DisplayingPopup=()=>{
        document.getElementById("Popup").style.display="block"
        document.getElementById("no").style.display="none"
        document.getElementById("yes").innerHTML="OK"
        document.getElementById("buttons").style.marginTop="10px"
        document.getElementById("yes").style.backgroundColor="blue"
        addEventOnEnter()  
    }
var bookName,indexAtBookIs,indexAtBookIsInIssedBooks,editButton,selectButton,selection,author,category,price,creatingRow,words,bookNameInCamelCase,authorNameInCamelCase,bookCategoryInCamelCase;
        if(allBooksData===null || allBooksData.length===0){  
            creatingRow=document.createElement("tr") 
        var noData=document.createElement("th")
            noData.innerHTML="No Data Found"
            noData.colSpan="5";
            noData.style.textAlign="center"
            noData.style.color="red"
            noData.style.padding="2%"
            creatingRow.appendChild(noData)
        var table=document.getElementById("table")
            table.appendChild(creatingRow)
     
        }
        else{
            caseConverter=(para)=>{
            words=(para).split(' ');
              for(var j=0;j<words.length;j++){
                  words[j]=words[j].charAt(0).toUpperCase() + words[j].slice(1);
              }
              return words.join(' ')
            }
            
            var parentElement;
            findingParentElement=()=>{
                var idOfClickedButton=event.target.parentNode.parentNode.id;
                 parentElement=document.getElementById(idOfClickedButton)
            }
          //if user clicked than send request otherwise delete specific book data
            deletingOrRequesting=()=>{
                findingParentElement();
                for(var g=0;g<allBooksData.length;g++){
                    for(var k=0;k<issuedBooks.length;k++){
                      if((parentElement.childNodes[0].innerHTML).toLowerCase()===allBooksData[g].bookName)
                      { 
                         if(loggedInUser.Role==="admin"){
                            if((parentElement.childNodes[0].innerHTML).toLowerCase()===issuedBooks[k].bookName){
                                DisplayingPopup();
                                indexAtBookIs=g;
                                indexAtBookIsInIssedBooks=k;
                                bookNameInCamelCase=caseConverter(allBooksData[g].bookName)
                                document.getElementById("no").style.display="block"
                                document.getElementById("yes").innerHTML="Delete"
                                document.getElementById("no").innerHTML="Cancel"
                                document.getElementById("yes").style.backgroundColor="red"
                                document.getElementById("text").innerHTML=`${bookNameInCamelCase} book was assigned to someone. Do you want to delete this book.`
                                return;    
                            }
                          }
                         else{
                            localStorage.setItem("bookName",parentElement.childNodes[0].innerHTML)
                            window.location.href="Send Request.html"
                            return;
                          }
                       }
                    }
                    if(loggedInUser.Role==="admin"){
                        findingParentElement();
                        for(var b=0;b<allBooksData.length;b++){
                            if(allBooksData[b].bookName===(parentElement.childNodes[0].innerHTML).toLowerCase()){
                                allBooksData.splice(b,1);
                                localStorage.setItem("BooksData",JSON.stringify(allBooksData))
                                location.reload();
                                return;
                            }
                        }
                    }
                    
                }
            }
             //Executes when user click on edit button
            var bookToEdit,bookInCamelCase;
            editingData=()=>{
                findingParentElement()
                // checking that this book issued or not
                for(var d=0;d<issuedBooks.length;d++){
                   if((parentElement.childNodes[0].innerHTML).toLowerCase()===issuedBooks[d].bookName.toLowerCase()){
                    DisplayingPopup();
                    bookInCamelCase=caseConverter(issuedBooks[d].bookName)
                    document.getElementById("yes").innerHTML="OK"
                    document.getElementById("text").innerHTML=`${bookInCamelCase} book was assigned to someone therefore you cannot edit this book. Please try later.`
                    return;
                    }
                }
                //checking which book admin want to edit
                for(var c=0;c<allBooksData.length;c++){
                  if((parentElement.childNodes[0].innerHTML).toLowerCase()===allBooksData[c].bookName.toLowerCase())
                  { 
                    bookToEdit=(allBooksData[c].bookName);
                    document.getElementById("editing").style.display="flex"
                    document.getElementById("book").value=caseConverter(allBooksData[c].bookName)
                    document.getElementById("author").value=caseConverter(allBooksData[c].authorName)
                    document.getElementById("price").value=allBooksData[c].bookPrice
                    document.getElementById("category").value=caseConverter(allBooksData[c].bookCategory)
                  }
                  
                }
            }
            //saving data after edit
            edited=()=>{
                //Use two loops becaz the book admin want to edit may exist after this book name
                for(var z=0;z<allBooksData.length;z++){
                    //check if book name already exist or not.If book name is not changed than following condition not executes
                    if(allBooksData[z].bookName===(document.getElementById("book").value).toLowerCase()
                    && bookToEdit.toLowerCase()!==(document.getElementById("book").value).toLowerCase()){
                          document.getElementById("Popup").style.display="block"
                          document.getElementById("no").style.display="none"
                          document.getElementById("buttons").style.marginTop="10px"
                          document.getElementById("yes").style.backgroundColor="black"
                          document.getElementById("text").innerHTML="Book with this name already exists."
                          return;
                    }
                }
                for(var y=0;y<allBooksData.length;y++){
                    if(allBooksData[y].bookName===bookToEdit){//check index at book is
                          var dataAfterEdit={
                              bookName:document.getElementById("book").value.toLowerCase(),
                              authorName:document.getElementById("author").value.toLowerCase(),
                              bookPrice:document.getElementById("price").value,
                              bookCategory:document.getElementById("category").value.toLowerCase()
                          }
                          allBooksData.splice(y,1,dataAfterEdit)
                          localStorage.setItem("BooksData",JSON.stringify(allBooksData))
                          document.getElementById("editing").style.display="none"
                          location.reload();
                          return;
                      }
                }
                
            }
            //loading data for page
        loadingData=()=>{
            for(var i=0;i<allBooksData.length;i++){
              creatingRow=document.createElement("tr");
              document.getElementById("table").appendChild(creatingRow)
              author=document.createElement("td")
              category=document.createElement("td")
              price=document.createElement("td")
              bookName=document.createElement("td")
              selection=document.createElement("td")
              editButton=document.createElement("button")
              selectButton=document.createElement("button")
              editButton.className="editing"
              editButton.innerHTML="Edit"
              creatingRow.id="rowNo"+i;
              selection.className="confirmationBox"
              // Converting into CamelCase
              bookNameInCamelCase=caseConverter(allBooksData[i].bookName);
              authorNameInCamelCase=caseConverter(allBooksData[i].authorName)
              bookCategoryInCamelCase=caseConverter(allBooksData[i].bookCategory)
              //Assigning value
              if(loggedInUser.Role==="admin"){
                selectButton.className="delete" 
                selectButton.innerHTML="Delete"
              }
              else{
                editButton.style.display="none"
                selectButton.innerHTML="Request"
                selectButton.className="request"
                
              }
               price.innerHTML=allBooksData[i].bookPrice
               bookName.innerHTML=bookNameInCamelCase
               author.innerHTML=authorNameInCamelCase;
               category.innerHTML=bookCategoryInCamelCase
               creatingRow.appendChild(bookName)
               creatingRow.appendChild(author)
               creatingRow.appendChild(category)
               creatingRow.appendChild(price)
               creatingRow.appendChild(selection)
               selection.appendChild(editButton)
               selection.appendChild(selectButton)
               selectButton.addEventListener("click",deletingOrRequesting)
               editButton.addEventListener("click",editingData)
           //checking for search
               var searchedTerm=localStorage.getItem("searchedTerm")
           if(searchedTerm===null){
               searchedTerm="";
           }
           var parent=document.getElementById("rowNo"+i)
           if(allBooksData[i].bookName===searchedTerm.toLowerCase()){
                 parent.childNodes[0].className="searchedTerm"
           }
           else if(allBooksData[i].authorName===searchedTerm.toLowerCase()){
                 parent.childNodes[1].className="searchedTerm"
           }
           else if(allBooksData[i].bookCategory===searchedTerm.toLowerCase()){
                 parent.childNodes[2].className="searchedTerm"
           }
           if((allBooksData.length-1)===i){
               localStorage.removeItem("searchedTerm")
             // remove the searched term when all data is loaded
           }
        }
            }
            loadingData();
        }
Back=()=>{
    window.history.back()
}
//Popup functions
no=()=>{
    document.getElementById("Popup").style.display="none"
}
yes=()=>{
    if(document.getElementById("text").innerHTML===`${bookNameInCamelCase} book was assigned to someone. Do you want to delete this book.`){
        allBooksData.splice(indexAtBookIs,1);
        localStorage.setItem("BooksData",JSON.stringify(allBooksData))
        location.reload();
        issuedBooks.splice(indexAtBookIsInIssedBooks,1)
        localStorage.setItem("acceptedRequests",JSON.stringify(issuedBooks))
        return;
    }
    else{
        no()
    }
}