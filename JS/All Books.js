var loggedInUser=JSON.parse(localStorage.getItem("loggedInUser"))
var gettingDetail=JSON.parse(localStorage.getItem("BooksData"));
        var bookName,editButton,selectButton,selection,author,category,price,creatingRow,words,bookNameInCamelCase,authorNameInCamelCase,bookCategoryInCamelCase;
        if(gettingDetail===null || gettingDetail.length===0){  
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
          //if user clicked than send request otherwise delte specific book data
            deletingOrRequesting=()=>{
                findingParentElement()
                for(var g=0;g<gettingDetail.length;g++){
                    if((parentElement.childNodes[0].innerHTML).toLowerCase()===gettingDetail[g].bookName)
                    { 
                         if(loggedInUser.Role==="admin"){
                            gettingDetail.splice(g,1);
                            localStorage.setItem("BooksData",JSON.stringify(gettingDetail))
                            location.reload();
                        }
                        else{
                            localStorage.setItem("bookName",parentElement.childNodes[0].innerHTML)
                            window.location.href="Send Request.html"
                        }
                    }
                }
            }
             //check which book admin want to edit
            var bookToEdit;
            editingData=()=>{
                findingParentElement()
                for(var c=0;c<gettingDetail.length;c++){
                  if((parentElement.childNodes[0].innerHTML).toLowerCase()===gettingDetail[c].bookName.toLowerCase())
                  { 
                    bookToEdit=gettingDetail[c].bookName;
                    document.getElementById("editing").style.display="block"
                    document.getElementById("book").value=caseConverter(gettingDetail[c].bookName)
                    document.getElementById("author").value=caseConverter(gettingDetail[c].authorName)
                    document.getElementById("price").value=gettingDetail[c].bookPrice
                    document.getElementById("category").value=caseConverter(gettingDetail[c].bookCategory)
                  }
                  
                }
            }
            //saving data after edit
            edited=()=>{
                for(var z=0;z<gettingDetail.length;z++){
                    if(gettingDetail[z].bookName===document.getElementById("book").value
                    && bookToEdit!==document.getElementById("book").value){
                        alert("Name of book already exists.")
                        return;
                    }
                    else{
                      if(gettingDetail[z].bookName===bookToEdit){
                          var dataAfterEdit={
                              bookName:document.getElementById("book").value.toLowerCase(),
                              authorName:document.getElementById("author").value.toLowerCase(),
                              bookPrice:document.getElementById("price").value,
                              bookCategory:document.getElementById("category").value.toLowerCase()
                          }
                          gettingDetail.splice(z,1,dataAfterEdit)
                          localStorage.setItem("BooksData",JSON.stringify(gettingDetail))
                          document.getElementById("editing").style.display="none"
                          location.reload();
                      }
                    }
                }
            }
            //loading data for page
        loadingData=()=>{
            for(var i=0;i<gettingDetail.length;i++){
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
              selection.className="selectionBox"
              // Converting into CamelCase
              bookNameInCamelCase=caseConverter(gettingDetail[i].bookName);
              authorNameInCamelCase=caseConverter(gettingDetail[i].authorName)
              bookCategoryInCamelCase=caseConverter(gettingDetail[i].bookCategory)
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
               price.innerHTML=gettingDetail[i].bookPrice
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
               searchedTerm=" ";
           }
           var parent=document.getElementById("rowNo"+i)
           if(gettingDetail[i].bookName===searchedTerm.toLowerCase()){
                 parent.childNodes[0].className="searchedTerm"
           }
           else if(gettingDetail[i].authorName===searchedTerm.toLowerCase()){
                 parent.childNodes[1].className="searchedTerm"
           }
           else if(gettingDetail[i].bookCategory===searchedTerm.toLowerCase()){
                 parent.childNodes[2].className="searchedTerm"
           }
           if((gettingDetail.length-1)===i){
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
