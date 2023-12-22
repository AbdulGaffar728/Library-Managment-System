AddingBook=()=>{
    bookDetail={
        bookName:document.getElementById("newBookName").value.toLowerCase(),
        authorName:document.getElementById("authorName").value.toLowerCase(),
        bookPrice:document.getElementById("bookPrice").value,
        bookCategory:document.getElementById("bookCategory").value.toLowerCase()
    }
    var allBooksDetail=JSON.parse(localStorage.getItem("BooksData"))
    if(allBooksDetail===null){
        allBooksDetail=[];
    }
    else{
      for(var a=0;a<allBooksDetail.length;a++){
          if(allBooksDetail[a].bookName===document.getElementById("newBookName").value.toLowerCase())
          {
              alert("Book name already exists.")
              return;
          }
      }
    }
    allBooksDetail.push(bookDetail)
    alert("Book added successfully.")
    localStorage.setItem("BooksData",JSON.stringify(allBooksDetail))
    window.location.href="Admin Site.html"
}