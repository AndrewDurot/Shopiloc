$(document).ready(function(){
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
        $.get("/state", function(data, status){
           
            var country_List = data.country;
            if(country_List.length > 0){
                country_List.forEach(element => {
                    $("#states_list").append($('<option>', {
                        value: element.name,
                        text: element.name
                    }));
                });
            }
        });
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
    //debugger;
});