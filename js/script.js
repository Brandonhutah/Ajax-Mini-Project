
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $("#street").val()
    var city = $("#city").val()
    // YOUR CODE GOES HERE!
    $body.append('<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + street + ',' + city + '">')

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "5094f1cf94d242cebdb43f1134f27f08",
      'q': city
    });

    $.getJSON(url, function(data) {
        $nytHeaderElem.text('New York Times Articles About ' + city);

        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article"><a href="' + article.web_irl + '">' + article.headline.main + '</a><p>' + article.snippet + '</p></li>');
        }
    }).error($nytHeaderElem.text('New York Times Articles About ' + city + " could not be loaded."));

    return false;
};

$('#form-container').submit(loadData);