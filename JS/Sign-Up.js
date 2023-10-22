var usersDetail=[];
function SigningUp(){
    let userName=document.getElementById("userName").value;
    let userEmail=document.getElementById("userEmail").value;
    let password=document.getElementById("password").value;
    let confirmPassword=document.getElementById("confirmPassword").value;
    if(password===confirmPassword){
    var userData={
        Name:userName,
        Email:userEmail,
        Password:password
    }
    let localData=JSON.parse(localStorage.getItem("usersDetail"));
    if(localData!==null){
      usersDetail=localData;
    }
    else{
        usersDetail=[];
    }
    usersDetail.push(userData);
    localStorage.setItem("usersDetail",JSON.stringify(usersDetail))
    window.location.href="index.html";
    }
    else{
        alert("Both passwords are not same.")
    }
}