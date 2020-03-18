$(document).ready(function(){
    $.get("/country_List", function(data, status){
        var country_List = data.country;
        if(country_List.length > 0){
            country_List.forEach(element => {
                $("#countries").append($('<option>', {
                    value: country_List,
                    text: country_List
                }));
            });
        }
    });
});