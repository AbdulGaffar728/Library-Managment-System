var allBooksDetail;
AddingBook=()=>{
    bookDetail={
        bookName:document.getElementById("newBookName").value.toLowerCase(),
        bookId:document.getElementById("bookId").value.toLowerCase(),
        authorName:document.getElementById("authorName").value.toLowerCase(),
        bookPrice:document.getElementById("bookPrice").value.toLowerCase(),
        bookCategory:document.getElementById("bookCategory").value.toLowerCase()
    }
    detailFromStorage=JSON.parse(localStorage.getItem("BooksData"))
    if(detailFromStorage===null){
        allBooksDetail=[];
    }
    else{
        allBooksDetail=detailFromStorage;
    }
    allBooksDetail.push(bookDetail)
    alert("Book added successfully.")
    localStorage.setItem("BooksData",JSON.stringify(allBooksDetail))
    window.location.href="Admin Site.html"
}