/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */




// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];
const escapefnc = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
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
    ${escapefnc(tweet.content.text)}
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
const renderTweets = function(tweets) {
  $('#tweets-container').empty();
  for (let tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
};
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
  //renderTweets(data);
  loadTweets();
  $("form").on("submit", function(event) {
    event.preventDefault();
    // console.log($(this).serialize);
    let charCounter = document.getElementById('charCounter');
    charCounter = parseInt(charCounter.innerHTML);
    console.log(charCounter);
    if (charCounter < 0) {
      $('.error-msg2').hide()
      $('.error-msg').show();
      //alert('You have exceeded the character limit');
    } else if (charCounter == 140) {
      $('.error-msg').hide();
      $('.error-msg2').show();
      //alert('You attempted to submit an empty tweet');
    } else {
      $.post('/tweets', $(this).serialize(), () => {
        loadTweets();
      });
    }
  });
});

//new Date(tweet.created_at)