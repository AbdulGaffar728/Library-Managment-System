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
            DisplayingPopup()
            document.getElementById("text").innerHTML="Book name already exists."
            addEventOnEnter()
              return;
          }
      }
    }
    allBooksDetail.push(bookDetail)
    DisplayingPopup()
    document.getElementById("text").innerHTML="Book added successfully."
    addEventOnEnter()
    localStorage.setItem("BooksData",JSON.stringify(allBooksDetail))
}
// when user click on OK button of popup
yes=()=>{
    if(document.getElementById("text").innerHTML==="Book added successfully."){
        window.location.href="Admin Site.html"
    }
    else{
        document.getElementById("Popup").style.display="none"
    }
}