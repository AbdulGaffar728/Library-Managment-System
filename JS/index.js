isLoggedIn=()=>{
    var checkingData=JSON.parse(localStorage.getItem("loggedInUser"))
    if(checkingData!==null){
        if(checkingData.Role==="admin"){
            window.location.href="Admin Site.html"
        }
        else{
            window.location.href="User Site.html"
        }
    }
}
loggingIn=()=>{
    var userEmail=document.getElementById("userEmail").value
    var password=document.getElementById("password").value
    var GettingData=JSON.parse(localStorage.getItem("usersDetail"))
    if(GettingData===null){
        alert("Plz sign-up first.")
    }
    else{
    for(var i=0; i<GettingData.length;i++){
        if(userEmail === GettingData[i].Email){
            if(password === GettingData[i].Password){
                if(GettingData[i].Role==="admin"){
                window.location.href="Admin Site.html"
                }
                else{
                    window.location.href="User Site.html"
                }
                var loggedInUser={
                    Name:GettingData[i].Name,
                    Email:GettingData[i].Email,
                    Password:GettingData[i].Password,
                    Role:GettingData[i].Role
                }
                localStorage.setItem("loggedInUser",JSON.stringify(loggedInUser))
                return;
            }
        }
        if(i===(GettingData.length-1)){
            alert("Plz enter valid email/password.")
        }
      }
    }
}