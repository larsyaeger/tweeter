/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */




//function to prevent weird <script> stuff when typed into the tweet text box
const escapefnc = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
//html stuff/outline
const createTweetElement = function(tweet) {
  const $tweet = $(` <article class="alltweetsarticle">
  <header class="allTweetsHeader">
    <div class="profile">
      <img src="${tweet.user.avatars}"
      width="64"
      heigh="64"> 
  </div>
    <div class="tweetersName">
     ${tweet.user.name}
  </div>
    <div class="tweetersUsernameDiv">
      <h3 class="tweetersUsername">${tweet.user.handle}</h3>
    </div>
    </header>
  <div class="tweetTextBody">
   <p class="tweetersText"> ${escapefnc(tweet.content.text)}</p>
    <hr class="line">
  </div>
  <footer class="allTweetsFooter">
    <div class="tweetAge">
       <h6>${timeago.format(tweet.created_at)} </h6>
      </div>
    <div class="likesharesubscribe">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-sharp fa-solid fa-repeat"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`);
  return $tweet;
};
//empty #tweets-contaier before rendering tweets so old ones don't get duplicated
const renderTweets = function(tweets) {
  $('#tweets-container').empty();
  for (let tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
};
//this runs when document is ready and every time a new tweet is submitted
const loadTweets = function() {
  $.ajax('http://localhost:8080/tweets', { method: 'GET' })
    .then(function(data) {
      console.log('Success: ', renderTweets(data));
    })
    .catch(err => {
      console.log(err);
    });
};
$(document).ready(() => {
  loadTweets();
  $("form").on("submit", function(event) {
    event.preventDefault();
    let charCounter = document.getElementById('charCounter');
    charCounter = parseInt(charCounter.innerHTML);
    console.log(charCounter);
    if (charCounter < 0) {
      $('.error-msg2').hide()
      $('.error-msg').show();
      //You have exceeded the character limit
    } else if (charCounter == 140) {
      $('.error-msg').hide();
      $('.error-msg2').show();
      //You attempted to submit an empty tweet
    } else {
      $('.error-msg').hide();
      $('.error-msg2').hide();
      $.post('/tweets', $(this).serialize(), () => {
        loadTweets();
      });
    }
  });
});

