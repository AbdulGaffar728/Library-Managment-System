Back=()=>{
    window.history.back()
}
 //sending request
 performingOperation=()=>{
    var allBooksData=JSON.parse(localStorage.getItem("BooksData"))
    var idOfClickedButton=event.target.parentNode.parentNode.id;
                var parentElement=document.getElementById(idOfClickedButton)
                for(var g=0;g<allBooksData.length;g++){
                    if((parentElement.childNodes[0].innerHTML).toLowerCase()===allBooksData[g].bookName
                    && (parentElement.childNodes[1].innerHTML).toLowerCase()===allBooksData[g].authorName
                    && (parentElement.childNodes[2].innerHTML).toLowerCase()===allBooksData[g].bookCategory)
                    { 
                            localStorage.setItem("bookName",parentElement.childNodes[0].innerHTML)
                            window.location.href="Send Request.html"
                    }
                }
            }
loadingData=()=>{
    var availableBooks=[]
    var allBooksData=JSON.parse(localStorage.getItem("BooksData"));
    var issuedBooksData=JSON.parse(localStorage.getItem("acceptedRequests"))
    if(allBooksData===null || allBooksData.length===0){
        var creatingRow=document.createElement("tr") 
        var noData=document.createElement("th")
            noData.innerHTML="No Data Found"
            noData.colSpan="5";
            noData.style.textAlign="center"
            noData.style.color="red"
            noData.style.padding="2%"
            creatingRow.appendChild(noData)
            document.getElementById("table").appendChild(creatingRow)
    }
    else{
        if(issuedBooksData===null){
            issuedBooksData=[];
        }
        //checking which books are issued
        var isIssued,availableBook;
        for(var i=0;i<allBooksData.length;i++){
            isIssued=false;
               for(var j=0;j<issuedBooksData.length;j++){
                   if(allBooksData[i].bookName.toLowerCase()===issuedBooksData[j].bookName.toLowerCase())
                    {
                        isIssued=true;
                        break;
                    }
                }
                if(isIssued!==true){
                    availableBook={
                        bookName:allBooksData[i].bookName,
                        author:allBooksData[i].authorName,
                        category:allBooksData[i].bookCategory
                    }
                    availableBooks.push(availableBook)
                }
            }
            //function for convert text into camel case
            var words;
            intoCamelCaseConverter=(para)=>{
                words=(para).split(' ');
                  for(var j=0;j<words.length;j++){
                      words[j]=words[j].charAt(0).toUpperCase() + words[j].slice(1);
                  }
                  return words.join(' ')
                }
            for(var z=0;z<availableBooks.length;z++){
                //Converting into camel case
                var bookNameInCamelCase=intoCamelCaseConverter(availableBooks[z].bookName)
                var authorNameInCamelCase=intoCamelCaseConverter(availableBooks[z].author)
                var bookCategoryInCamelCase=intoCamelCaseConverter(availableBooks[z].category)
               var creatingRow=document.createElement("tr")
               var bookName=document.createElement("td")
               var authorName=document.createElement("td")
               var category=document.createElement("td")
               var select=document.createElement("td")
               var selectButton=document.createElement("button")
               bookName.innerHTML=bookNameInCamelCase;
               authorName.innerHTML=authorNameInCamelCase;
               category.innerHTML=bookCategoryInCamelCase;
               selectButton.innerHTML="Request"
               select.appendChild(selectButton)
               creatingRow.appendChild(bookName)
               creatingRow.appendChild(authorName)
               creatingRow.appendChild(category)
               creatingRow.appendChild(select)
               document.getElementById("table").appendChild(creatingRow)
               selectButton.className="request"
               selectButton.addEventListener("click",performingOperation)
               creatingRow.id="rowNo"+z
        }
    }
 
 }