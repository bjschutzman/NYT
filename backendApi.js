    
// NY Times Article Search API
// api_key = eIfPjlynt1Zu0HJq8zHgV8JfK4D6qcRH  (Will's key) 

$(document).ready(function() {

    //Assigning jQuery objects from DOM elements
    var $q = $("#search-term").val();
    var $resultsDiv = $("#search-results");
    var $numberRecords = $("#number").val();
    var $startYear = $("#start-year");
    var $endYear = $("#end-year");

    var queryURL;
    var apiKey = "eIfPjlynt1Zu0HJq8zHgV8JfK4D6qcRH";
 

    $("button").on("click", function(){
        //reset URL string
        queryURL = "";

        // Constant Variable for the queryURL
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    
        

        //User inputs concatentate to query string
        queryURL += "q=";
        queryURL += $q;
        queryURL += "&api-key=";
        queryURL += apiKey;

        
        queryURL += yearsFilter($startYear, $endYear);

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response) {
        
                console.log(response);
            for (var i = 0; i < $numberRecords; i++) {
                console.log(response.response.docs[i].headline.main);

                var headline = response.response.docs[i].headline.main;
                var address = response.response.docs[i].web_url;
                var $articleDiv = $("<br><a>");
                    

                $articleDiv.attr("href", address);
                $articleDiv.text(headline);

                $resultsDiv.append($articleDiv);
                console.log($articleDiv);
            }

            });    

    });

    function yearsFilter(start, end){
       
        //setup query string variable
        var queryString = '&fq=pub_year:(';

        //parse input year values to integer to evaluate
        var s = parseInt(start.val());
        var e = parseInt(end.val());
        
       //if end year is blank set to current year
        if (end.val() === ""){
            var d = new Date();
            e = d.getFullYear();
        };
    
        if(start.val() !== ""){ //if start year is specified by user create filter
            if(s <= e){// make sure year inputs are chronologically correct
                for(var i = s; i <= e; i++){
                queryString += '"' + i + '"';
                }
            } else {
                alert("Error in filters. Choose a start year before the end year.");
                return "";
            }
            queryString += ")";
             return queryString;
         }   else { // no year filter, return blank string
             return "";
         }
        
    }
});