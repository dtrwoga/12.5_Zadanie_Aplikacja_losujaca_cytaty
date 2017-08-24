// scripts.js
var prefix = "https://cors-anywhere.herokuapp.com/";
var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

// 1. POBIERANIE CYTATU

function getQuote() {
    $.getJSON(prefix + quoteUrl, createTweet);
    $.ajaxSetup({ cache: false });
    // quoteUrl - to adres zapytania (czyli nasz link do API),
    // createTweet - to po prostu funkcja, która zostanie wykonana przy pomyślnym wykonaniu zapytania
}

// 2. TWORZENIE TWEETA - funkcja createTweet ma za zadanie tworzyć linki z tweetami 
// i podpinać je pod przycisk do tweetowania.

function createTweet(input) {
    var data = input[0];

    var quoteText = $(data.content).text().trim();//data.content to zwykły kod HTML paragrafu
    var quoteAuthor = data.title;

    // warunek jeśli string jest pusty

    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    }

    //
    
    var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;
    
    if (tweetText.length > 140) {
    	getQuote();
	} else {
	    var tweet = tweetLink + encodeURIComponent(tweetText);
	    $('.quote').text(quoteText);
	    $('.author').text("Author: " + quoteAuthor);
	    $('.tweet').attr('href', tweet);
	}
	$('.tweet').attr('href', tweet);
	
}//koniec funkcji createTweet


$(document).ready(function() {
    getQuote();
    $('.trigger').click(function() {
        getQuote();
    })
});
getQuote();