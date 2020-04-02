$(document).ready(function(){
    if(!window.location.href.includes("create") && !window.location.href.includes("about")){
        
        if(localStorage.getItem("language") == "fr"){
            $('#basic').flagStrap({
                countries: {
                    "FR": "French",
                    "NL": "Dutch",
                    "GB": "English",
                    
                }
            });
            $('#basic').flagStrap({
                countries: {
                    "FR": "French",
                    "NL": "Dutch",
                    "GB": "English",
                    
                }
            });
        }
        else
        if(localStorage.getItem("language") == "nl"){
            $('#basic').flagStrap({
                countries: {
                    "NL": "Dutch",
                    "GB": "English",
                    "FR": "French",
                   
                }
            });
        }
        else{
            $('#basic').flagStrap({
                countries: {
                    
                    "GB": "English",
                    "NL": "Dutch",
                    "FR": "French",
                }
            });
        }
        $('#basic_popup').flagStrap({
            countries: {
                "FR": "French",
                "NL": "Dutch",
            }
            
           
        });
        
       
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
        //
        $(".dropdown-menu").toggle();
    });
    
    if(localStorage.getItem("language") == null ){
        
        $.getJSON('https://ipapi.co/json/', function(data) {
            
            if(data.region.toLocaleLowerCase() == "quebec")
            {
                
                localStorage.setItem("ip",data.ip);
                
                $.ajax({
                    url: '/lang',
                    data: {lang:"fr",ip: localStorage.getItem("ip"), region: data.region},
                    type: "post",
                    success : function(data)
                    {
                        //localStorage.setItem("ip",)
                        //localStorage.clear();
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
            else 
                if(data.country.toLocaleLowerCase() == "be")
                {
                    localStorage.setItem("ip",data.ip);
                    $.ajax({
                        url: '/lang',
                        data: {lang:"nl",ip: localStorage.getItem("ip"), region: data.region},
                        type: "post",
                        success : function(data)
                        {
                            //localStorage.setItem("ip",)
                            //localStorage.clear();
                            localStorage.setItem("language","nl");
                            //location.reload();
                            
                        },
                        error : function(jqXHR, textStatus, errorThrown)
                        {
                            console.log(textStatus);
                        }
                    });
                    $("#language_modal").modal({
                        //fadeDuration: 1000,
                        //fadeDelay: 1.75 // Will fade in 750ms after the overlay finishes.
                    });
                   
                }
                else 
                {
                    
                    localStorage.setItem("ip",data.ip);
                    $.ajax({
                        url: '/lang',
                        data: {lang:"en",ip: localStorage.getItem("ip"), region: data.region},
                        type: "post",
                        success : function(data)
                        {
                            //localStorage.setItem("ip",)
                            //localStorage.clear();
                            localStorage.setItem("language","nl");
                            //location.reload();
                            
                        },
                        error : function(jqXHR, textStatus, errorThrown)
                        {
                            console.log(textStatus);
                        }
                    });
                   
                }
            
            
        });
    }
    if(window.location.pathname == ("/create"))
    {
    
        $.getJSON('https://ipapi.co/json/', function(data) {
            localStorage.setItem("region",data.region);
            $.ajax({
                url: '/region',
                data: {ip: localStorage.getItem("ip"), region: data.region},
                type: "post",
                success : function(data)
                {
                   
                    
                },
                error : function(jqXHR, textStatus, errorThrown)
                {
                    console.log(textStatus);
                }
            });
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
        //
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
    
    
    //
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
                
                //localStorage.clear();
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
                //localStorage.clear();
                localStorage.setItem("language",data.language);
                location.reload();
                
            },
            error : function(jqXHR, textStatus, errorThrown)
            {
                console.log(textStatus);
            }
        })
    })
    if(window.location.href.includes("create") || window.location.href.includes("admin/store")){
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
        });
    }
    $(".delete_button").on("click", function(e){
       
        var form = $(this).parents('form');
        sweetAlert({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        },
        function(isConfirm){
            
            if (isConfirm) {
                $(form[0].children[1]).click();
                //form.submit();
                } else {
              swal("Cancelled", "Store Record is safe :)", "error");
              
            }
        });
    });
    // $('#language_modal').on('hidden.modal', function () {
    //     // do something…
    //     debugger;
    // });
    //Close modal triggers;
    if(!window.location.href.includes("create") && !window.location.href.includes("about") && !window.location.href.includes("admin") )
    {   
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutationRecord) {
                if(mutationRecord.target.style.display == "none"){
                   
                    location.reload();
                    console.log('style changed!');
                }
                
            });    
        });
        
        var target = document.getElementById('language_modal');
        observer.observe(target, { attributes : true, attributeFilter : ['style'] });

    }
    $(".checkbox").on("click", function(){
        debugger;
        if($(this).attr("checked") == "checked"){
            $(this).removeAttr("checked");
            $("#status").val("false");
        }
        else{
            $(this).attr("checked", "checked");
            $("#status").val("true");
        }
    })
    //$('form input[type=checkbox]').change(function() { console.log('hello') });

    
    if(window.location.href.includes("user/create")){
        
        $.ajax({
            url: '/admin/states',
            type: "get",
            success : function(data)
            {
                var state_List = data.states;
                if(state_List.length > 0){
                    state_List.forEach(element => {
                        $("#states").append($('<option>', {
                            value: element,
                            text: element
                        }));
                    });
                }
                
            },
            error : function(jqXHR, textStatus, errorThrown)
            {
                console.log(textStatus);
            }
        });
    }
    
    if(window.location.pathname == ("/")){
        
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
    }
    //Custom Filter code on Dropdown
    $(".options").on("change", function(){
        var radio_button = $('input[name="store_type"]:checked').val();
        var radio_button1;
        var radio_button2 = $('input[name="checkbox2"]:checked').val();
        var radio_button3 = $('input[name="checkbox3"]:checked').val();
        if($('#checkbox1').attr("checked") != undefined){
            radio_button1 = $('#checkbox1').val();
        }
        if($('#checkbox2').attr("checked") != undefined){
            radio_button2 = $('#checkbox2').val();
        }
        if($('#checkbox3').attr("checked") != undefined){
            radio_button3 = $('#checkbox3').val();
        }
        var value = $(this).val();
        var length = $(".col-lg-6").length;
        var element =  $(".col-lg-6");
        if($(".col-lg-6").length > 0)
        {
            
           
            for(var i =0; i < element.length; i++){
                if(radio_button1 == undefined && radio_button2 == undefined && radio_button3 == undefined)
                {
                    if(value.toLocaleLowerCase() == "all"){
                        $(element[i]).show();
                    }
                    else
                        if($(element[i]).attr("data-src-industry").toLowerCase() == value.toLocaleLowerCase())
                        {
                            $(element[i]).show();
                        }
                        else{
                            $(element[i]).hide();
                        }
                }
                else{
                   
                    if(value.toLocaleLowerCase() == "all"){
                        if(radio_button1 != undefined && radio_button2 == undefined && radio_button3 == undefined)
                        {
                            if(radio_button1.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase())
                            {
                                $(element[i]).show();
                            }
                            else{
                                $(element[i]).hide();
                            }

                        }
                        else
                            if(radio_button1 != undefined && radio_button2 != undefined  && radio_button3 == undefined)
                            {
                                if(radio_button1.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase() || radio_button2.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase())
                                {
                                    $(element[i]).show();
                                }
                                else{
                                    $(element[i]).hide();
                                }

                            }
                            else
                                if(radio_button1 == undefined && radio_button2  != undefined  && radio_button3 == undefined)
                                {
                                    if(radio_button2.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase())
                                    {
                                        $(element[i]).show();
                                    }
                                    else{
                                        $(element[i]).hide();
                                    }
                                }
                                else
                                    if(radio_button1 == undefined && radio_button2 != undefined  && radio_button3 != undefined)
                                    {
                                        if(radio_button2.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase() || radio_button3.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase())
                                        {
                                            $(element[i]).show();
                                        }
                                        else{
                                            $(element[i]).hide();
                                        }
                                    }
                                    else
                                        if(radio_button1 == undefined && radio_button2 == undefined  && radio_button3 != undefined){
                                            if(radio_button3.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase())
                                            {
                                                $(element[i]).show();
                                            }
                                            else{
                                                $(element[i]).hide();
                                            }
                                        }
                                        else 
                                        if(radio_button1 != undefined && radio_button2 != undefined  && radio_button3 != undefined){
                                            if(radio_button3.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase() || radio_button2.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase() || radio_button1.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase())
                                            {
                                                $(element[i]).show();
                                            }
                                            else{
                                                $(element[i]).hide();
                                            }
                                        }
                                        else 
                                        if(radio_button1 == undefined && radio_button2 == undefined  && radio_button3 == undefined){
                                            $(element[i]).hide();
                                        }
                
                    }
                    else{
                        if(radio_button1 != undefined && radio_button2 == undefined && radio_button3 == undefined)
                        {
                            if($(element[i]).attr("data-src-industry").toLowerCase() == value.toLocaleLowerCase() && radio_button1.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase())
                            {
                                $(element[i]).show();
                            }
                            else{
                                $(element[i]).hide();
                            }

                        }
                        else
                            if(radio_button1 != undefined && radio_button2 != undefined  && radio_button3 == undefined)
                            {
                                if($(element[i]).attr("data-src-industry").toLowerCase() == value.toLocaleLowerCase() && radio_button1.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase() || radio_button2.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase())
                                {
                                    $(element[i]).show();
                                }
                                else{
                                    $(element[i]).hide();
                                }

                            }
                            else
                            {
                                if(radio_button1 == undefined && radio_button2  != undefined  && radio_button3 == undefined)
                                {
                                    if($(element[i]).attr("data-src-industry").toLowerCase() == value.toLocaleLowerCase() && radio_button2.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase())
                                    {
                                        $(element[i]).show();
                                    }
                                    else{
                                        $(element[i]).hide();
                                    }
                                }
                                else
                                    if(radio_button1 == undefined && radio_button2 != undefined  && radio_button3 != undefined)
                                    {
                                        if( $(element[i]).attr("data-src-industry").toLowerCase() == value.toLocaleLowerCase() && radio_button2.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase() || radio_button3.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase())
                                        {
                                            $(element[i]).show();
                                        }
                                        else{
                                            $(element[i]).hide();
                                        }
                                    }
                                    else
                                        if(radio_button1 == undefined && radio_button2 == undefined  && radio_button3 != undefined){
                                            if($(element[i]).attr("data-src-industry").toLowerCase() == value.toLocaleLowerCase() && radio_button3.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase())
                                            {
                                                $(element[i]).show();
                                            }
                                            else{
                                                $(element[i]).hide();
                                            }
                                        }
                                        else 
                                        if(radio_button1 != undefined && radio_button2 != undefined  && radio_button3 != undefined){
                                            if($(element[i]).attr("data-src-industry").toLowerCase() == value.toLocaleLowerCase() && radio_button3.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase() || radio_button2.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase() || radio_button1.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase())
                                            {
                                                $(element[i]).show();
                                            }
                                            else{
                                                $(element[i]).hide();
                                            }
                                        }
                                        else 
                                        if(radio_button1 == undefined && radio_button2 == undefined  && radio_button3 == undefined){
                                            $(element[i]).hide();
                                        }
                            }
                                
                    

                    }

                    


                }
                
            }
            
        }
        //debugger;
    });
    //Custom Filter code on Checkbox
    $(".checkboxs").on("click",function() {

        //alert("clicked");
        var radio_button1;
        var radio_button2 = $('input[name="checkbox2"]:checked').val();
        var radio_button3 = $('input[name="checkbox3"]:checked').val();
        if($('#checkbox1').attr("checked") != undefined){
            radio_button1 = $('#checkbox1').val();
        }
        if($('#checkbox2').attr("checked") != undefined){
            radio_button2 = $('#checkbox2').val();
        }
        if($('#checkbox3').attr("checked") != undefined){
            radio_button3 = $('#checkbox3').val();
        }
       
        var value = $("#industry_list").val();
        //var length = $(".col-lg-6").length;
        var element =  $(".col-lg-6");
        if($(".col-lg-6").length > 0)
        {
            
           
            for(var i =0; i < element.length; i++){
                console.log($(element[i]).attr("data-src-type").toLowerCase());
                if(value == "all"){
                    if(radio_button1 != undefined && radio_button2 == undefined && radio_button3 == undefined)
                    {
                        if(radio_button1.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase())
                        {
                            $(element[i]).show();
                        }
                        else{
                            $(element[i]).hide();
                        }

                    }
                else
                    if(radio_button1 != undefined && radio_button2 != undefined  && radio_button3 == undefined)
                    {
                        if(radio_button1.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase() || radio_button2.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase())
                        {
                            $(element[i]).show();
                        }
                        else{
                            $(element[i]).hide();
                        }

                    }
                    else
                        if(radio_button1 == undefined && radio_button2  != undefined  && radio_button3 == undefined)
                        {
                            if(radio_button2.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase())
                            {
                                $(element[i]).show();
                            }
                            else{
                                $(element[i]).hide();
                            }
                        }
                        else
                            if(radio_button1 == undefined && radio_button2 != undefined  && radio_button3 != undefined)
                            {
                                if(radio_button2.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase() || radio_button3.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase())
                                {
                                    $(element[i]).show();
                                }
                                else{
                                    $(element[i]).hide();
                                }
                            }
                            else
                                if(radio_button1 == undefined && radio_button2 == undefined  && radio_button3 != undefined){
                                    if(radio_button3.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase())
                                    {
                                        $(element[i]).show();
                                    }
                                    else{
                                        $(element[i]).hide();
                                    }
                                }
                                else 
                                if(radio_button1 != undefined && radio_button2 != undefined  && radio_button3 != undefined){
                                    if(radio_button3.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase() || radio_button2.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase() || radio_button1.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase())
                                    {
                                        $(element[i]).show();
                                    }
                                    else{
                                        $(element[i]).hide();
                                    }
                                }
                                else 
                                if(radio_button1 == undefined && radio_button2 == undefined  && radio_button3 == undefined){
                                    $(element[i]).hide();
                                }
                
                }
                else{
                    if(radio_button1 != undefined && radio_button2 == undefined && radio_button3 == undefined)
                    {
                        if($(element[i]).attr("data-src-industry").toLowerCase() == value.toLocaleLowerCase() && radio_button1.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase())
                        {
                            $(element[i]).show();
                        }
                        else{
                            $(element[i]).hide();
                        }

                    }
                    else
                        if(radio_button1 != undefined && radio_button2 != undefined  && radio_button3 == undefined)
                        {
                            if($(element[i]).attr("data-src-industry").toLowerCase() == value.toLocaleLowerCase() && radio_button1.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase() || radio_button2.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase())
                            {
                                $(element[i]).show();
                            }
                            else{
                                $(element[i]).hide();
                            }

                        }
                        else
                            if(radio_button1 == undefined && radio_button2  != undefined  && radio_button3 == undefined)
                            {
                                if($(element[i]).attr("data-src-industry").toLowerCase() == value.toLocaleLowerCase() && radio_button2.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase())
                                {
                                    $(element[i]).show();
                                }
                                else{
                                    $(element[i]).hide();
                                }
                            }
                            else
                                if(radio_button1 == undefined && radio_button2 != undefined  && radio_button3 != undefined)
                                {
                                    if( $(element[i]).attr("data-src-industry").toLowerCase() == value.toLocaleLowerCase() && radio_button2.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase() || radio_button3.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase())
                                    {
                                        $(element[i]).show();
                                    }
                                    else{
                                        $(element[i]).hide();
                                    }
                                }
                                else
                                    if(radio_button1 == undefined && radio_button2 == undefined  && radio_button3 != undefined){
                                        if($(element[i]).attr("data-src-industry").toLowerCase() == value.toLocaleLowerCase() && radio_button3.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase())
                                        {
                                            $(element[i]).show();
                                        }
                                        else{
                                            $(element[i]).hide();
                                        }
                                    }
                                    else 
                                    if(radio_button1 != undefined && radio_button2 != undefined  && radio_button3 != undefined){
                                        if($(element[i]).attr("data-src-industry").toLowerCase() == value.toLocaleLowerCase() && radio_button3.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase() || radio_button2.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase() || radio_button1.toLowerCase() == $(element[i]).attr("data-src-type").toLowerCase())
                                        {
                                            $(element[i]).show();
                                        }
                                        else{
                                            $(element[i]).hide();
                                        }
                                    }
                                    else 
                                    if(radio_button1 == undefined && radio_button2 == undefined  && radio_button3 == undefined){
                                        $(element[i]).hide();
                                    }

                }
                
                
            }
            
        }
    
       });
});