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
    var userEmail=document.getElementById("userEmail").value
    var password=document.getElementById("password").value
    var GettingData=JSON.parse(localStorage.getItem("usersDetail"))
    if(GettingData===null){
        DisplayingPopup()
        document.getElementById("text").innerHTML="Plz sign-up first."
        addEventOnEnter()
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
            DisplayingPopup()
            document.getElementById("text").innerHTML="Plz enter valid email or password."
            addEventOnEnter()
        }
      }
    }
}
yes=()=>{
    document.getElementById("Popup").style.display="none"
}