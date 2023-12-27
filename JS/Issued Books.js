loadingData=()=>{
var allBooksData=JSON.parse(localStorage.getItem("BooksData"));
var givenBooksData=JSON.parse(localStorage.getItem("acceptedRequests"))
var timeNow,daysDifference,DateOfReturn,returnYear,returnMonth,bookReturnDate,FineBox;
var bookName,userName,userEmail,issuedDate,returnDate,fine,bookPrice,creatingRow,words,bookNameInCamelCase,userNameInCamelCase;
if(givenBooksData===null || allBooksData===null || givenBooksData.length===0 || allBooksData.length===0){
        creatingRow=document.createElement("tr") 
    var noData=document.createElement("th")
        noData.innerHTML="No Data Found"
        noData.colSpan="7";
        noData.style.textAlign="center"
        noData.style.color="red"
        noData.style.padding="2%"
        creatingRow.appendChild(noData)
        document.getElementById("table").appendChild(creatingRow)
}
        else{
            caseConverter=(para)=>{
                words=(para).split(' ');
                  for(var j=0;j<words.length;j++){
                      words[j]=words[j].charAt(0).toUpperCase() + words[j].slice(1);
                  }
                  return words.join(' ')
                }
        for(var z=0; z<givenBooksData.length;z++){
            
            for(var i=0;i<allBooksData.length;i++){
                if((allBooksData[i].bookName).toLowerCase()===(givenBooksData[z].bookName).toLowerCase()){
                     creatingRow=document.createElement("tr");
                     document.getElementById("table").appendChild(creatingRow)
                     bookName=document.createElement("td")
                     userName=document.createElement("td")
                     userEmail=document.createElement("td")
                     issuedDate=document.createElement("td")
                     bookReturnDate=document.createElement("td")
                     FineBox=document.createElement("td")
                     bookPrice=document.createElement("td")
            // Converting into CamelCase
            bookNameInCamelCase=caseConverter(givenBooksData[z].bookName);
            userNameInCamelCase=caseConverter(givenBooksData[z].userName)
            
            // Date & fine calculating
             timeNow=new Date();
             DateOfReturn=new Date(givenBooksData[z].returnDate);
             returnDate=DateOfReturn.getDate()
             returnMonth=DateOfReturn.getMonth();
             returnYear=DateOfReturn.getFullYear();
     
             if(givenBooksData[z].noOfDays<=3){
                 fine=0;
             }
             else{
                 fine=20*(givenBooksData[z].noOfDays-3);
             }
             if(timeNow>DateOfReturn){
                 daysDifference=Math.floor((timeNow - DateOfReturn)/(24*60*60*1000))
                 fine+=(daysDifference*50);
             }
             
            //Assigning value 
             bookName.innerHTML=bookNameInCamelCase;
             userName.innerHTML=userNameInCamelCase;
             userEmail.innerHTML=givenBooksData[z].userEmail;
             issuedDate.innerHTML=`${givenBooksData[z].givenDate}-${givenBooksData[z].givenMonth}-${givenBooksData[z].givenYear}`
             bookReturnDate.innerHTML=`${returnDate}-${returnMonth+1}-${returnYear}`;
             FineBox.innerHTML=fine
             bookPrice.innerHTML=allBooksData[i].bookPrice;
             creatingRow.appendChild(bookName)
             creatingRow.appendChild(userName)
             creatingRow.appendChild(userEmail)
             creatingRow.appendChild(issuedDate)
             creatingRow.appendChild(bookReturnDate)
             creatingRow.appendChild(FineBox)
             creatingRow.appendChild(bookPrice)
          }
         }
        }
       }
    }
Back=()=>{
    window.history.back();
}