//function reads characters that have been typed and updates the counter accordingly
$(document).ready(function() {
  $('#tweet-text').keyup(function(event) {
    $('#charCounter').text(140 - $(this).val().length);
     let x = $(this).val().length
     if (x > 140) {
      document.getElementById("charCounter").className = "counterRed"
     } else {
      document.getElementById("charCounter").className = "counter"
     }
  })
});
