var usersDetail=[];
var loggedInUser=JSON.parse(localStorage.getItem("loggedInUser"))
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
               alert("Account with this email exists.")
               return;
            }
          }
        }
       localData.push(userData);
       localStorage.setItem("usersDetail",JSON.stringify(localData))
       if(role==="admin"){
           alert("Admin added successfully.")
           window.history.back()
       }
       else{
           alert("Signed-Up successfully")
           window.location.href="index.html";
        }
      }
     else{
         alert("Both passwords are not same.")
     }
    }
    else{
      alert("Password must contain at least 6 characters and maximum 15 characters.")
    }
  }