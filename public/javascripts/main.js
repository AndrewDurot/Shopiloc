$(document).ready(function(){
    if(!window.location.href.includes("create") && !window.location.href.includes("about")){
        if(localStorage.getItem("language") != "fr"){
            debugger;
            $('#basic').flagStrap({
                countries: {
                    
                    "GB": "English",
                    "FR": "French",
                }
            });
        }
        else{
           
            $('#basic').flagStrap({
                countries: {
                    
                    "FR": "French",
                    "GB": "English",
                }
            });
        }
       
    }
    
    $("#countries_list").on("change", function(){
        var value = this.value.toLocaleLowerCase();
        if(value = "canada" || value == "united states"){
            $("#postal_label_us").show();
            $("#postal_help_us").show();
            $("#postal_label").hide();
            $("#postal_help").hide();

            // $("#postal_label").html("What is the postal code of your store's address?");
            // $("#postal_help").html("Your store will show up for all searches made with in a 10km radius");
            
        }
        else{
            $("#postal_label_us").hide();
            $("#postal_help_us").hide();
            $("#postal_label").show();
            $("#postal_help").show();
        }
        
    })
    $('.custom-control-input').change(function(e) {
        e.preventDefault();
        $('.custom-control-input').not(this).prop('checked', false);
        $(this).prop('checked', true);
    });
    $("button.btn.btn-default.btn-md.dropdown-toggle").on("click", function(){
        //debugger;
        $(".dropdown-menu").toggle();
    })
    if(localStorage.getItem("language") == null ){
        $.getJSON('https://ipapi.co/json/', function(data) {
        
            if(data.region.toLocaleLowerCase() == "quebec")
            {
                
                localStorage.setItem("ip",data.ip);
                $.ajax({
                    url: '/lang',
                    data: {lang:"fr",ip: localStorage.getItem("ip")},
                    type: "post",
                    success : function(data)
                    {
                        //localStorage.setItem("ip",)
                        localStorage.clear();
                        localStorage.setItem("language","fr");
                        location.reload();
                        
                    },
                    error : function(jqXHR, textStatus, errorThrown)
                    {
                        console.log(textStatus);
                    }
                });
                // if(localStorage.getItem("language") == undefined && localStorage.getItem("language") == "" || localStorage.getItem("language") == "en" )
                // {
                
                    
                    
                // }
                
                
            }
            
            
        });
    }
    let isActive = false;
    $(document).on("click","#menu, .fa,.icon",function(e){
        
        //$("myLinks").toggle();
        var x = document.getElementById("myLinks");
        if (x.style.display === "block") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
    });
    $(document).on("click"," #myLinks a",function(e){
        
        window.location.href = $(this).attr("href");
    });
    $(document).on("click",".topnav, #myLinks",function(e){
        //debugger;
        e.preventDefault()
        e.stopPropagation()
        
        //$("myLinks").toggle();
        // var x = document.getElementById("myLinks");
        // if (x.style.display === "block") {
        //   x.style.display = "none";
        // } else {
        //   x.style.display = "block";
        // }
    });
    $(document).on("click", function(e){
       
        $("#myLinks").hide();
    })
    
    function myFunction() {
        var x = document.getElementById("myLinks");
        if (x.style.display === "block") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
      }
    
    $.get("/country_List", function(data, status){
        var country_List = data.country;
        if(country_List.length > 0){
            country_List.forEach(element => {
                $("#countries").append($('<option>', {
                    value: element,
                    text: element
                }));
            });
        }
    });
    //debugger;
    if(localStorage.getItem("language") != undefined && localStorage.getItem("language") != "")
    {
        
        $("#language").val(localStorage.getItem("language"));
    } 
    else
    {
        $("#language").val("en"); 
    }  
    $(".dropdown-menu li a").on("click", function(){
       
        var value = $(this).attr("data-val");
        value = value.toLowerCase();
        if(value == "gb"){
            value = "en";
        }
        
        $.ajax({
            url: '/lang',
            data: {lang:value,ip: localStorage.getItem("ip")},
            type: "post",
            success : function(data)
            {
                //localStorage.setItem("ip",)
                localStorage.clear();
                localStorage.setItem("language",data.language);
                location.reload();
                
            },
            error : function(jqXHR, textStatus, errorThrown)
            {
                console.log(textStatus);
            }
        });
        
    })
    $("#language, #language_mobile").on("change", function(){
       var value = $(this).val();
       
        $.ajax({
            url: '/lang',
            data: {lang:value,ip: localStorage.getItem("ip")},
            type: "post",
            success : function(data)
            {
                localStorage.clear();
                localStorage.setItem("language",data.language);
                location.reload();
                
            },
            error : function(jqXHR, textStatus, errorThrown)
            {
                console.log(textStatus);
            }
        })
    })
    if(window.location.href.includes("create")){
        $.get("/country", function(data, status){
            var country_List = data.country;
            if(country_List.length > 0){
                country_List.forEach(element => {
                    $("#countries_list").append($('<option>', {
                        value: element.name,
                        text: element.name
                    }));
                });
            }
        });
        // $.get("/state", function(data, status){
           
        //     var country_List = data.country;
        //     if(country_List.length > 0){
        //         country_List.forEach(element => {
        //             $("#states_list").append($('<option>', {
        //                 value: element.name,
        //                 text: element.name
        //             }));
        //         });
        //     }
        // });
    }
    $(document).on("click", ".row.border", function(e){
        
        var url = $(this.children[0]).attr("href");
        window.open("https://"+url, 'name'); 
        
    });
    function goToByScroll(id){
        // Reove "link" from the ID
        id = id.replace("link", "");
        // Scroll
        $('html,body').animate({
        scrollTop: $("#"+id).offset().top},
        'slow');
    }
    if($("#results").length > 0)
    {
        goToByScroll("results");
    }
    function isUrlValid(url) {
        return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
    }
    $('#store_url').on('focusout', function() {
       
        if(this.value.includes("https:") || this.value.includes("http:"))
        {
            var valid = isUrlValid(this.value);
            if(valid){
                $.get("/Check_Url?url="+this.value, function(data, status){
                    debugger;
                    if(data.isExist){
                        $("#url-error").text("This Url already Exist");
                        $("#url-error").css("display", "block");
                        $(".submit").attr("disabled","disabled");
                    }
                    else{
                        $(".submit").removeAttr("disabled");
                        $("#url-error").css("display", "none");
                    }
                    
                });
            }
            else{
                $("#url-error").text("Invalid Url");
                $("#url-error").css("display", "block");
            }
        }
        else{
            var valid = isUrlValid("https://"+this.value);
            if(valid){
                $.get("/Check_Url?url="+this.value, function(data, status){
                    if(data.isExist){
                        $("#url-error").text("This Url already Exist");
                        $("#url-error").css("display", "block");
                        $(".submit").attr("disabled","disabled");
                    }
                    else{
                        $(".submit").removeAttr("disabled");
                        $("#url-error").css("display", "none");
                    }
                    
                });
            }
            else{
                $("#url-error").text("Invalid Url");
                $("#url-error").css("display", "block");
            }
        }
        
    });
    $("#inputZip").on('click', function(){
        if(this.value.includes(","))
        {
            if(this.value.split(",").length == 11)
            {
                $(this).removeAttr("readonly")
                
            }

        }
    })
    $('#inputZip').on('keyup', function() {
       
        if(this.value.includes(","))
        {
            if(this.value.split(",").length == 11)
            {
                $(this).attr("readonly", "readonly")

            }

        }
    });
    
    if(window.location.href.includes("?success=true")){
        sweetAlert({
            title: "Success!",
            text: "Your store is submitted and will be online once passed review.",
            type: "success",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000
        })
    }
    
    
});