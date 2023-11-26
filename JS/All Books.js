var gettingDetail=JSON.parse(localStorage.getItem("BooksData"));
        var bookName,id,author,category,price,creatingRow,words,bookNameInCamelCase,authorNameInCamelCase,bookCategoryInCamelCase;
        if(gettingDetail===null){
            var noData=document.createElement=("h3").innerHTML="No Data Found."
            document.getElementById("table").appendChild(noData) 
        }
        else{
            for(var i=0;i<gettingDetail.length;i++){
             creatingRow=document.createElement("tr");
             document.getElementById("table").appendChild(creatingRow)
            id=document.createElement("td")
            author=document.createElement("td")
            category=document.createElement("td")
            price=document.createElement("td")
            bookName=document.createElement("td")
            // Converting into CamelCase
            words=(gettingDetail[i].bookName).split(' ');
            for(var j=0;j<words.length;j++){
                words[j]=words[j].charAt(0).toUpperCase() + words[j].slice(1);
            }
            bookNameInCamelCase=words.join(' ')
            
            words=(gettingDetail[i].authorName).split(' ')
            for(var k=0 ;k<words.length;k++){
                words[k]=words[k].charAt(0).toUpperCase() + words[k].slice(1);
            }
            authorNameInCamelCase=words.join(' ');

            words=(gettingDetail[i].bookCategory).split(' ')
            for(var a=0 ;a<words.length;a++){
                words[a]=words[a].charAt(0).toUpperCase() + words[a].slice(1);
            }
            bookCategoryInCamelCase=words.join(' ')

            //Assigning value 
             bookName.innerHTML=bookNameInCamelCase
             id.innerHTML=gettingDetail[i].bookId
             author.innerHTML=authorNameInCamelCase;
             category.innerHTML=bookCategoryInCamelCase
             price.innerHTML=gettingDetail[i].bookPrice
             creatingRow.appendChild(bookName)
             creatingRow.appendChild(id)
             creatingRow.appendChild(author)
             creatingRow.appendChild(category)
             creatingRow.appendChild(price)
            }
        }