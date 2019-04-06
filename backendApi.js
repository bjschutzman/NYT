    
// NY Times Article Search API
// api_key = eIfPjlynt1Zu0HJq8zHgV8JfK4D6qcRH  (Will's key) 

$(document).ready(function() {

    //Grab values from DOM elements
    var $q = $("#search-term");
    var $resultsDiv = $("#search-results");
    var numberRecords = $("select.number").children("option:selected").val();
    var $startYear = $("#start-year");
    var $endYear = $("#end-year");

    var queryURL;
    var apiKey = "eIfPjlynt1Zu0HJq8zHgV8JfK4D6qcRH";
 

    //submit button click event handler ============================================

    $("button.submit").on("click", function(){
        //reset URL string
        queryURL = "";

        //clear results div
        $resultsDiv.empty();

        // Constant Variable for the queryURL
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    
        

        //User inputs concatentate to query string
        queryURL += "q=";
        queryURL += $q.val();
        queryURL += "&api-key=";
        queryURL += apiKey;

        
        queryURL += yearsFilter($startYear, $endYear);

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response) {
        
                //create a short message decribing the results to user
                var showing = numberRecords;
                if(response.response.docs.length < numberRecords){ //query return fewer results than numberRecords requested by user
                        showing = response.response.docs.length;
                }
                $resultsDiv.append("Showing " + showing + " search results for <em>" + $q.val() + "</em>");
                
                //Iterate through the response and display headlines with link
                for (var i = 0; i < numberRecords; i++) {

                    var headline = response.response.docs[i].headline.main;
                    var address = response.response.docs[i].web_url;
                    var $articleDiv = $("<br>" + (i+1) + ". <a>");
                        
                    $articleDiv.attr("href", address);
                    $articleDiv.text(headline);

                    $resultsDiv.append($articleDiv);
                    console.log($articleDiv);
                }

            });    

    });

    //END OF submit button click event handler ============================================


    //clear button click event handler ===================================================

    //END OF clear button click event handler ============================================


    // numberRecord change event handler =================================================
    $("select.number").change(function(){
        numberRecords = $(this).children("option:selected").val();
       // alert("You have selected the country - " + selectedCountry);
    });
     // End of numberRecord change event handler =================================================

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