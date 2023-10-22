openSideBar=()=>{
    document.getElementById("SideBar").style.display="block"
    document.getElementById("SideBar").style.transition="1.5s";
}
closeSideBar=()=>{
    document.getElementById("SideBar").style.display="none"
}
// WATCH
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
        if(HoursNow<12 || HoursNow>23 ){
            
            document.getElementById("AM").innerHTML=" AM";
            document.getElementById("Hour").innerHTML=("0"+ HoursNow).slice(-2)
        }
        else if(HoursNow>=12){
            document.getElementById("AM").innerHTML=" PM";
            var timeManager=HoursNow-12
            document.getElementById("Hour").innerHTML=("0"+timeManager).slice(-2)
        }
        document.getElementById("Mins").innerHTML=("0"+MinsNow).slice(-2)
        document.getElementById("Secs").innerHTML=("0"+SecsNow).slice(-2)
        document.getElementById("day").innerHTML=DaysArray[DayNow]+"day";
        document.getElementById("Date").innerHTML=`${MonthsArray[MonthNow]}  ${DateNow},${YearNow}  `
    }