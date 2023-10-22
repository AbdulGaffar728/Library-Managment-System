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
                window.location.href="user site.html"
                return;
            }
        }
        if(i===(GettingData.length-1)){
            alert("Plz enter valid email/password.")
        }
      }
    }
}