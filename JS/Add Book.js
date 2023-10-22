var allBooksDetail;
AddingBook=()=>{
    bookDetail={
        bookName:document.getElementById("newBookName").value,
        bookId:document.getElementById("bookId").value,
        authorName:document.getElementById("authorName").value,
        bookPrice:document.getElementById("bookPrice").value,
        bookCategory:document.getElementById("bookCategory").value
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