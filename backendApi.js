    
// 61b2003f-5c61-4f96-acd1-3978f08bae80 AppId Trevis

// 5d859c95-56d0-42d9-b066-ac07e96017bc AppId Will

// eIfPjlynt1Zu0HJq8zHgV8JfK4D6qcRH Api Key Will 

// var q = $("#searchTerm");
var q = "texas";
var $resultsDiv = $("#results");
var $numberRecords = $("");
var $startYear = $("");
var $EndYear = $("");

var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
var apiKey = "eIfPjlynt1Zu0HJq8zHgV8JfK4D6qcRH";


$("button").on("click", function(){


    //User inputs
    queryURL += "q=";
    queryURL += q;
    queryURL += "&api-key=";
    queryURL += apiKey;
    queryURL += '&fq=pub_year:("1998" "1999" "2000" "2001")';

   // queryURL += $startYear;

    $numberRecords = 5;
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

        }

        });    

});
