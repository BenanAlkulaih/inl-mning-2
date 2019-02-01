

$(function() {
    $("#loginForm").submit(function(event){
        event.preventDefault();
//test  
        let request = new XMLHttpRequest();
        request.onload = function () {
            if(this.readyState == 4 && this.status == 200) {
                var object = JSON.parse(this.response);

                if($("#inputEmail").val() === object.email  && $("#inputPassword").val() === object.password){
                    window.location.href = "index.html";
                }
                else {
                    alert("felaktig epostadress eller l?senord!");
                }
            }
        }
        request.open("GET", "https://fe18.azurewebsites.net/api/user", true);
        request.send();
    });

    $("#logout").on("click", function() {
        window.location.href = "login.html";
    });

    /*header*/
    let request = new XMLHttpRequest();
    request.onload = function () {
        if(this.readyState == 4 && this.status == 200) {
            var object = JSON.parse(this.response);
            // console.log(object);
            var $fullname =  object.firstname + " " + object.lastname

            $("#welcomename").text($fullname);
        }
    }    
    request.open("GET", "https://fe18.azurewebsites.net/api/user", true);
    request.send();
            
    /*total sales charts*/
    let totalsales = new XMLHttpRequest()
    totalsales.onload = function(){
        if(this.readyState == 4 && this.status == 200){
            var object1 = JSON.parse(this.response);

           // console.log(object1);
            $("#invoices1").text(object1.invoices);
            $("#queries").text(object1.queries);
            $("#returns").text(object1.returns);
            $("#revenue").text(object1.revenue);

        }
    }
    totalsales.open("GET" , "https://fe18.azurewebsites.net/api/totalsaleschart ", true);
    totalsales.send();

    /*user chart */
    let usercharts = new XMLHttpRequest()   
    usercharts.onload = function(){
        if(this.readyState == 4 && this.status == 200){
            var object2 = JSON.parse(this.response);
      
            $("#user").text(object2.users);
            $("#gro").text(object2.growth);
        }
    }
    usercharts.open("GET" , "https://fe18.azurewebsites.net/api/userschart ", true);
    usercharts.send();

    /*download*/
    let download = new XMLHttpRequest()
    download.onload = function(){
        if(this.readyState == 4 && this.status == 200){
            var object4 = JSON.parse(this.response);
        
            //console.log(object4);
            $("#online").text(object4.online);
            $("#offline").text(object4.offline);
        }
    }

    download.open("GET" , "https://fe18.azurewebsites.net/api/downloads" , true);
    download.send();

    //project//
    if($("#projectsbox").length) {
       let project = new XMLHttpRequest();
       
       project .onload = function () {
           if(this.readyState == 4 && this.status == 200) {
               var object22 = JSON.parse(this.response);     
   
              // console.log(object.users);
   
   
               $("#pro-1").text(object22.procent);
               $("#pro-2").text(object22.growth);
               
           }
       }
       project .open("GET", "https://fe18.azurewebsites.net/api/projectschart", true);
       project .send();
   }





    let totalsales1 = new XMLHttpRequest();
    totalsales1.onload =function(){
        if(this.readyState == 4 &&this.status == 200){
            var object8 = JSON.parse(this.response);
            console.log(object8);
            var  $number =  object8.amount  + "" +  object8.currency
            console.log($number)
            $("#nummer1").text($number);
            $("#month").text(object8.period);
        }
    }
    totalsales1.open("GET" , "https://fe18.azurewebsites.net/api/totalsales" , true);
    totalsales1.send();

    let totalpurchases = new XMLHttpRequest();
    totalpurchases.onload = function(){
        if(this.readyState == 4 &&this.status == 200){
            var object9 = JSON.parse(this.response);
            console.log(object9);
            var  $number1 =  object9.amount  + "" +  object9.currency
        
        $("#nummer2").text($number1);
        $("#month1").text(object9.period);
        }
    }
    totalpurchases.open("GET" , "https://fe18.azurewebsites.net/api/totalpurchases" , true);
    totalpurchases.send(); 
    
    
    let totalorder = new XMLHttpRequest();
    totalorder.onload = function(){
        if(this.readyState == 4 &&this.status == 200){
            var object10 = JSON.parse(this.response);  
            var  $number3 =  object10.amount  + "" +  object10.currency
        
        $("#nummer3").text($number3);
        $("#month2").text(object10.period);
        }
    }
    totalorder.open("GET" , "https://fe18.azurewebsites.net/api/totalorders" , true);
    totalorder.send();

    let totalgro = new XMLHttpRequest();
    totalgro.onload = function(){
        if(this.readyState == 4 &&this.status == 200){
            var object11 = JSON.parse(this.response);
            var  $number4 =  object11.amount  + "" +  object11.currency
        
            $("#nummer4").text($number4);
            $("#month3").text(object11.period);
        }
    }
    totalgro.open("GET" , "https://fe18.azurewebsites.net/api/totalgrowth" , true);
    totalgro.send();

    let update= new XMLHttpRequest();
    update.onload = function(){
        if(this.readyState == 4 && this.status == 200){
            var object12 = JSON.parse(this.response);
            console.log(object12);
            console.log(object12.updates[0].time);
            
            for(var i = 0; i < object12.updates.length; i++){

                var li = 
                `<li>
                    <h6 id="title1">${object12.updates[i].title}</h6>
                    <p class="mt-2">${object12.updates[i].description}</p>
                    <p class="text-muted mb-4">
                        <i class="mdi mdi-clock-outline"></i>
                        ${object12.updates[i].time}
                    </p>
                </li>`;

                $("#update-list").append(li);

            }        
        }
    }
    update.open("GET" , "https://fe18.azurewebsites.net/api/updates" , true);
    update.send();

    let invoice= new XMLHttpRequest();
    invoice.onload = function(){
        if(this.readyState == 4 && this.status == 200){
            var object13 = JSON.parse(this.response);

            for(var i = 0; i < object13.invoices.length; i++){
        
                var badgestatusclass;
                
                if(object13.invoices[i].status == "Pågående") {
                    badgestatusclass = "badge-success";
                } 
                else if(object13.invoices[i].status == "Öppen") {
                    badgestatusclass = "badge-warning";
                }
                else if(object13.invoices[i].status == "Tillfälligt stoppad") {
                    badgestatusclass = "badge-danger";
                }
                else {
                    badgestatusclass = "";
                }        

                var trInfo = 
                    `<tr>
                        <td>${object13.invoices[i].invoicenumber}</td>
                        <td>${object13.invoices[i].customer}</td>
                        <td>${object13.invoices[i].shipping}</td>
                        <td class="font-weight-bold">${object13.invoices[i].totalprice}</td>
                        <td>${object13.invoices[i].customerprice}</td>
                        <td>
                            <div class="badge ${badgestatusclass} badge-fw">${object13.invoices[i].status}</div>
                        </td>
                    </tr>`;

                $('#open-invoices tbody').append(trInfo);
            }
        }
    }
    invoice.open("GET" , "https://fe18.azurewebsites.net/api/openinvoices" , true);
    invoice.send();

    let tickes = new XMLHttpRequest();
    tickes.onload = function(){
       if(this.readyState == 4 && this.status == 200){
            $('.yearsDrobDown').html('');

            var object16 = JSON.parse(this.response);
            console.log(object16.years)
            for(var i = 0 ; i < object16.years.length ; i++){
                console.log(object16.years[i]);
                $('.yearsDrobDown').append('<a class="dropdown-item" href="#">'+object16.years[i]+'</a>');
            }
      
            for( var i=0; i < object16.tickets.length;i++) {
             
                let names = object16.tickets[i].fullname.split(" ");
                let initials = names[0].charAt(0) + names[1].charAt(0);
            
                var test = 
                `<tr>
                    <td class="pl-0">
                    <div class="icon-rounded-primary icon-rounded-md">
                        <h4 class="font-weight-medium">${initials}</h4>
                    </div>
                    </td>
                    <td>
                    <p class="mb-0">${object16.tickets[i].fullname}</p>
                    <p class="text-muted mb-0">${object16.tickets[i].city}</p>
                    </td>
                    <td>
                    <p class="mb-0">${object16.tickets[i].date}</p>
                    <p class="text-muted mb-0">${object16.tickets[i].time}</p>
                    </td>
                    <td>
                    <p class="mb-0">${object16.tickets[i].project}</p>
                    <p class="text-muted mb-0">${object16.tickets[i].status}</p>
                    </td>
                    <td class="pr-0">
                    <i class="mdi mdi-dots-horizontal icon-sm cursor-pointer"></i>
                    </td>
                </tr>`;       
        
                $("#tickets-table tbody").append(test);
            } 
          
        }
    }
    tickes.open("GET" , "https://fe18.azurewebsites.net/api/tickets" , true);
    tickes.send(); 

}); 