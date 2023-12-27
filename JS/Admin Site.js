openSideBar=()=>{
    document.getElementById("SideBar").style.display="block"
}
closeSideBar=()=>{
    document.getElementById("SideBar").style.display="none"
}
// date and time updater
setInterval(TimeUpdater,1000);
        function TimeUpdater(){
        var timeNow=new Date();
        var HoursNow=timeNow.getHours();
        var MinsNow=timeNow.getMinutes();
        var SecsNow=timeNow.getSeconds();
        var DayNow=timeNow.getDay();
        var MonthNow=timeNow.getMonth();
        var YearNow=timeNow.getFullYear();
        var DateNow=timeNow.getDate();
        var MonthsArray=["January","February","March","April","May","June","July","August","September","October","November","December"]
        var DaysArray=["Sun","Mon","Tues","Wednes","Thurs","Fri","Satur"]
        if(HoursNow<=12 || HoursNow>23 ){       
            document.getElementById("AM").innerHTML=" AM";
            document.getElementById("Hour").innerHTML=("0"+ HoursNow).slice(-2)
        }
        else if(HoursNow>12){
            document.getElementById("AM").innerHTML=" PM";
            var timeManager=HoursNow-12
            document.getElementById("Hour").innerHTML=("0"+timeManager).slice(-2)
        }
        document.getElementById("Mins").innerHTML=("0"+MinsNow).slice(-2)
        document.getElementById("Secs").innerHTML=("0"+SecsNow).slice(-2)
        document.getElementById("day").innerHTML=DaysArray[DayNow]+"day";
        document.getElementById("Date").innerHTML=`${MonthsArray[MonthNow]}  ${DateNow},${YearNow}  `
    }
    var loggedInUser=JSON.parse(localStorage.getItem("loggedInUser"))
    var checkingRequests=JSON.parse(localStorage.getItem("Requests"));
    //checking name of user and weather user is allow to this page or not.  
    checkingName=()=>{
        var dataOfUser=JSON.parse(localStorage.getItem("loggedInUser"))
        if(dataOfUser===null || dataOfUser.length===0){
            window.location.href="index.html"
        }
        else{
         if(dataOfUser.Role==="admin"){
             document.getElementById("adminName").innerHTML=dataOfUser.Name;
         }
         else{
             document.getElementById("userName").innerHTML=dataOfUser.Name
             loadingData();//loading no of resposes by admin 
         }
        }
    }
    //checking requests sended by users
    if(loggedInUser.Role==="admin"){
    if(checkingRequests===null){
        document.getElementById("Requests").innerText+="0"
    }
    else{
        document.getElementById("Requests").innerText+=checkingRequests.length;
    }
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
    //Popup functions
    //executes when user click on cancel button
    no=()=>{
        document.getElementById("Popup").style.display="none"
    }
    logout=()=>{
        document.getElementById("Popup").style.display="block"
        document.getElementById("text").innerHTML="Do you want to logout?"
        document.getElementById("yes").innerHTML="Yes"
        document.getElementById("no").innerHTML="No"
        document.getElementById("buttons").style.marginTop="10px"
        addEventOnEnter()
    }
    deletingAccount=()=>{
        document.getElementById("Popup").style.display="block"
        document.getElementById("text").innerHTML="Do you want to delete your account?"
        document.getElementById("yes").innerHTML="Delete"
        document.getElementById("no").innerHTML="Cancel"
        addEventOnEnter()
    }
    yes=()=>{
        //executes when user wants to delete account
        if(document.getElementById("text").innerHTML==="Do you want to delete your account?"){
          var allUsersData=JSON.parse(localStorage.getItem("usersDetail"))
          var loggedInUser=JSON.parse(localStorage.getItem("loggedInUser"))
            if(allUsersData===null){
                 document.getElementById("no").style.display="none"
                 document.getElementById("yes").innerHTML="OK"
                 document.getElementById("text").innerHTML="Something wents wrong.Please try again."
                 addEventOnEnter()
            }
            else{
              for(var i=0;i<allUsersData.length;i++){
                if(allUsersData[i].Email===loggedInUser.Email
                  && allUsersData[i].Password===loggedInUser.Password
                  && allUsersData[i].Name===loggedInUser.Name)
                {
                 allUsersData.splice(i,1)
                 localStorage.removeItem("loggedInUser")
                 localStorage.setItem("usersDetail",JSON.stringify(allUsersData))
                 //Showing Popup
                 document.getElementById("no").style.display="none"
                 document.getElementById("yes").innerHTML="OK"
                 document.getElementById("text").innerHTML="Your account deleted successfully.Now you cannot recover your account."
                 addEventOnEnter()
                 return;
                } 
                if(i===allUsersData.length-1){
                    document.getElementById("no").style.display="none"
                 document.getElementById("yes").innerHTML="OK"
                 document.getElementById("text").innerHTML="Something wents wrong.Please try again."
                 addEventOnEnter()
                }
              }
            }
          }
          //executes when account deleted and it show popupto inform that account deleted succesfully
        else if(document.getElementById("text").innerHTML==="Your account deleted successfully.Now you cannot recover your account."){
            document.getElementById("Popup").style.display="none"
            window.location.href="Sign-Up.html"
          }
        else if(document.getElementById("text").innerHTML==="Do you want to logout?"){
            localStorage.removeItem("loggedInUser")
            window.location.href="index.html"
        }
        else{
            no();//Close popup on ok
        } 
        
    }
    //display form for delete data
    deleteAllDataForm=()=>{
        document.getElementById("deleteAllData").style.display="flex"
    }
    closeDeleteAllDataPopup=()=>{
        document.getElementById("deleteAllData").style.display="none"
    }
    //delete all data
    deletingAllData=()=>{
        if(localStorage.getItem("secretPassword")===document.getElementById("deletePassword").value){
           localStorage.removeItem("BooksData")
           localStorage.removeItem("returnRequests")
           localStorage.removeItem("bookReturnAcceptedRequests")
           localStorage.removeItem("Requests")
           localStorage.removeItem("acceptedRequests")
           localStorage.removeItem("declinedRequests")
           var usersData=JSON.parse(localStorage.getItem("usersDetail"))
           if(usersData===null){
               usersData=[]
           }
           else{
               for(var d=0;d<usersData.length;d++){
                   if(usersData[d].Role==="user"){
                       usersData[d].splice(d,1)
                   }
                   if(usersData.length===(d+1)){
                       localStorage.setItem("usersDetail",JSON.stringify(usersData))
                       document.getElementById("deleteAllData").style.display="none"
                       location.reload()
                   }
               }
           }
        }
        else{
            document.getElementById("Popup").style.display="block"
            document.getElementById("text").innerHTML="Password is incorrect. Please try again."
            document.getElementById("yes").innerHTML="OK"
            document.getElementById("no").style.display="none"
            addEventOnEnter()
           
        }
    }