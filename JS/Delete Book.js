deletingBook=()=>{
    var gettingBooksDetail=localStorage.getItem("BooksData");
    if(gettingBooksDetail===null){
        alert("No data found.")
    }
    else{
        for(var i=0;i<gettingBooksDetail.length;i++){
          if(gettingBooksDetail[i].bookName===document.getElementById("BookName").value 
            && gettingBooksDetail[i].authorName===document.getElementById("authorName").value
            && gettingBooksDetail[i].bookCategory===document.getElementById("bookCategory"))
            {
                gettingBooksDetail.slice(i,1)
                localStorage.setItem("BooksData",JSON.stringify(gettingBooksDetail));
                alert("Book deleted successfully.")
                return;             
            } 
            else{
                alert("No data found.")
            }
        } 
    }
}