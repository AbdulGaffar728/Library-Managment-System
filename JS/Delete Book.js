var words,bookNameInCamelCase;
deletingBook=()=>{
    var gettingBooksDetail=JSON.parse(localStorage.getItem("BooksData"));
    if(gettingBooksDetail===null){
        alert("No data found.")
    }
    else{
        for(var i=0;i<gettingBooksDetail.length;i++){
          if((gettingBooksDetail[i].bookName===(document.getElementById("BookName").value).toLowerCase()
            && gettingBooksDetail[i].bookCategory===(document.getElementById("bookCategory").value).toLowerCase()) 
            || gettingBooksDetail[i].authorName===(document.getElementById("authorName").value).toLowerCase()
            )
            {   
                words=(gettingBooksDetail[i].bookName).split(' ');
            for(var j=0;j<words.length;j++){
                words[j]=words[j].charAt(0).toUpperCase() + words[j].slice(1);
            }
                bookNameInCamelCase=words.join(' ')
                gettingBooksDetail.splice(i,1)
                localStorage.setItem("BooksData",JSON.stringify(gettingBooksDetail));
                alert(bookNameInCamelCase + " Book data deleted successfully.")
                window.location.href="Admin Site.html"
                return;             
            } 
            if(i===(gettingBooksDetail.length-1))
            {
                alert("No data found.")
            }
        } 
    }
}