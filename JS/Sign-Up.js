var usersDetail=[];
var loggedInUser=JSON.parse(localStorage.getItem("loggedInUser"))
addEventOnEnter=()=>{
  if(document.getElementById("Popup").style.display==="block"){
    document.addEventListener("keydown",function(event){
      if(event.key==="Enter"){
        yes()
      }
    })
  }
}
checkingRole=()=>{
if(loggedInUser===null){
    document.getElementById("Role").value="user"
  }
  else{
     document.getElementById("Role").value="admin"
     document.getElementById("Account").style.display="none"
  }
}
function SigningUp(){
      var role=document.getElementById("Role").value
      let userName=document.getElementById("userName").value;
      let userEmail=document.getElementById("userEmail").value;
      let password=document.getElementById("password").value;
      let confirmPassword=document.getElementById("confirmPassword").value;
      var localData=JSON.parse(localStorage.getItem("usersDetail"))
      if(role==="admin"){
        role="admin"
      }
      else{
        role="user"
      }
      DisplayingPopup=()=>{
        document.getElementById("Popup").style.display="block"
        document.getElementById("no").style.display="none"
        document.getElementById("yes").innerHTML="OK"
        document.getElementById("buttons").style.marginTop="10px"
        document.getElementById("yes").style.backgroundColor="black"
        addEventOnEnter()
      }
      if(password.length>5 && password.length<15){
        if(password===confirmPassword){
              var userData={
                Name:userName,
                Email:userEmail,
                Password:password,
                Role:role
              }
             if(localData===null){ 
                localData=[];
              }
             else{
                for(var a=0;a<localData.length;a++){
                   if(localData[a].Email===userEmail){
                       DisplayingPopup()
                       document.getElementById("text").innerHTML="Account with this email exists."
                       return;
                   }
                }
              }
              localData.push(userData);
              localStorage.setItem("usersDetail",JSON.stringify(localData))
              if(role==="admin"){
                 DisplayingPopup()
                 document.getElementById("text").innerHTML="Admin added successfully."
              }
              else{
                 DisplayingPopup()
                 document.getElementById("text").innerHTML="Signed-Up successfully."
                }
        }
        else{
            DisplayingPopup()
            document.getElementById("text").innerHTML="Both passwords are not same."
        }
     }
     else{
        DisplayingPopup()
        document.getElementById("text").innerHTML="Password must contain at least 6 characters and maximum 15 characters."
     }
  }
  // Popup functions
  yes=()=>{
    if(document.getElementById("text").innerHTML==="Admin added successfully."){
      window.history.back()
    }
    else if(document.getElementById("text").innerHTML==="Signed-Up successfully."){
      window.location.href="index.html";
    }
    else{
      document.getElementById("Popup").style.display="none"
    }
  }