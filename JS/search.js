var noDataFoundCloser;
// hide the msg "no data found" 
closingNoDataFound=()=>{
    document.getElementById("noDataFound").style.display="none"
    clearTimeout(noDataFoundCloser)    
}
storeAndReset=()=>{
    localStorage.setItem("searchedTerm",document.getElementById("search").value)
    document.getElementById("search").value=""
    window.location.href="All Books.html"
}
//works on submit form
var allBooksData=JSON.parse(localStorage.getItem("BooksData"))

searched=()=>{
    if(allBooksData===null){
        document.getElementById("noDataFound").style.display="block"
        noDataFoundCloser=setInterval(closingNoDataFound,10000)
    }
    else if(allBooksData.length===0){
        document.getElementById("noDataFound").style.display="block"
        noDataFoundCloser=setInterval(closingNoDataFound,10000)  
    }
    else{
     for(var i=0;i<allBooksData.length;i++){
       if(allBooksData[i].bookName===document.getElementById("search").value.toLowerCase()){  
        storeAndReset()
        return;
       }
       else if(allBooksData[i].authorName===document.getElementById("search").value.toLowerCase()){
        storeAndReset();
        return;  
       }
       else if(allBooksData[i].bookCategory===document.getElementById("search").value.toLowerCase()){
        storeAndReset();
        return;  
       }
       else if(i===allBooksData.length-1){
        document.getElementById("noDataFound").style.display="block"
        noDataFoundCloser=setInterval(closingNoDataFound,10000)  // hide the msg "no data found" after 10s     
       }
      }
    }
}
searching=()=>{
    // hidding no data found box
    document.getElementById("noDataFound").style.display="none"
    //clear inner html of data list
    document.getElementById("searchBooks").innerHTML=""
     allBooksData=JSON.parse(localStorage.getItem("BooksData"))
    if(allBooksData===null || allBooksData.length===0){
        return;
    }
    else{
        //convert text into camelcase
        intoCamelCaseConverter=(para)=>{
         var words=(para).split(' ');
            for(var j=0;j<words.length;j++){
                words[j]=words[j].charAt(0).toUpperCase() + words[j].slice(1);
            }
            return words.join(' ')
          }
          optionCreator=(valueForOption)=>{
            var creatingOption=document.createElement("option")
                creatingOption.value=intoCamelCaseConverter(valueForOption);
                document.getElementById("searchBooks").appendChild(creatingOption)
          }
          for(var i=0;i<allBooksData.length;i++){
              optionCreator(allBooksData[i].bookName)
              optionCreator(allBooksData[i].authorName)
              optionCreator(allBooksData[i].bookCategory)
          }
    }
}


