DisplayingPopup=()=>{
        document.getElementById("Popup").style.display="block"
        document.getElementById("no").style.display="none"
        document.getElementById("yes").innerHTML="OK"
        document.getElementById("buttons").style.marginTop="10px"
        document.getElementById("yes").style.backgroundColor="black"
      }
   var loggedInUser=JSON.parse(localStorage.getItem("loggedInUser"))
       document.getElementById("userName").value=loggedInUser.Name;
       document.getElementById("userEmail").value=loggedInUser.Email;
  if(localStorage.getItem("bookName")!==null){
       document.getElementById("bookName").value=localStorage.getItem("bookName");
       localStorage.removeItem("bookName")
    }

sendingRequest=()=>{
    var allBooks=JSON.parse(localStorage.getItem("BooksData"));
    var issuedBooksData=JSON.parse(localStorage.getItem("acceptedRequests"))
    var Requests=JSON.parse(localStorage.getItem("Requests"))
    if(Requests===null){
        Requests=[];
    }
    if(issuedBooksData===null){
        issuedBooksData=[]
    }
    if(allBooks===null){
        allBooks=[]
    }
// checking book exists or not
var isExist=false;
for(var z=0;z<allBooks.length;z++){
     if(allBooks[z].bookName===document.getElementById("bookName").value.toLowerCase()){
         isExist=true;
     }
    }
    if(isExist===false){
       DisplayingPopup()
        document.getElementById("text").innerHTML=`Book with this name not exists`
        return;
    }

//checking is available or not
        for(var j=0;j<issuedBooksData.length;j++){
           if(issuedBooksData[j].bookName.toLowerCase()===document.getElementById("bookName").value.toLowerCase())
            {     
                DisplayingPopup()
                document.getElementById("text").innerHTML="This book is not available at that time. Please request later."
                return;
            }
        }
//checking that requests is already sended by this user for any specific book
      for(var a=0;a<Requests.length;a++){
          if(loggedInUser.Email===Requests[a].userEmail
           && document.getElementById("bookName").value.toLowerCase()===Requests[a].bookName.toLowerCase()){
            DisplayingPopup()
            document.getElementById("text").innerHTML="Your request for this book already exists."
            return;
           }
      }
//Store in array if days are less than 8
      if(document.getElementById("numberOfDays").value<=7){
          var Request={
                userName:document.getElementById("userName").value.toLowerCase(),
                userEmail:document.getElementById("userEmail").value,
                bookName:document.getElementById("bookName").value.toLowerCase(),
                numberOfDays:document.getElementById("numberOfDays").value
            }  
          Requests.push(Request);
          localStorage.setItem("Requests",JSON.stringify(Requests))
          DisplayingPopup()
          document.getElementById("text").innerHTML="Your request is submitted."
    }
    else{                       
        DisplayingPopup()
        document.getElementById("text").innerHTML="You can get book for maximum 7 days."
    }
}
yes=()=>{
    if(document.getElementById("text").innerHTML==="Your request is submitted."){
        window.location.href="User Site.html";
    }
    else{
        document.getElementById("Popup").style.display="none"       
    }
}