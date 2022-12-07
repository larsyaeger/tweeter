/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */




const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

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
    ${tweet.content.text}
    <hr class="line">
  </div>
  <footer class="allTweetsFooter">
    <div class="tweetAge">
      <h6>${new Date(tweet.created_at)} </h6>
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
  for (let tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
};
$(document).ready(() => {
  renderTweets(data);
  $("form").on("submit", function(event) {
    event.preventDefault();
    console.log($(this).serialize);
    $.post('/tweets', $(this).serialize());
  });
});