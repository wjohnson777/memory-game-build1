var symbols = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'],
		opened = [],
		match = 0,
		moves = 0,
		clicks = 0,
		$deck = jQuery('.deck'),
		$scorePanel = $('#score-panel'),
		$moveNum = $('.moves'),
		$ratingStars = $('i'),
		$restart = $('.restart'),
		timer,
		delay = 800,
		gameCardsQTY = symbols.length / 2,
		rank3stars = gameCardsQTY + 2,
		rank2stars = gameCardsQTY + 6,
		rank1stars = gameCardsQTY + 10;

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
	
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Start Game
function initGame() {
  var cards = shuffle(symbols);
  $deck.empty();
  match = 0;
  moves = 0;
  $moveNum.text('0');
  $ratingStars.removeClass('fa-star-o').addClass('fa-star');
	for (var i = 0; i < cards.length; i++) {
		$deck.append($('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>'))
	}
	addClkListener();
	$(".clock").text('0:00');
		
};

// Timer
  let gameTimer = () => {

    let startTime = new Date().getTime();

    // Update the timer every second
    timer = setInterval(function() {

      var now = new Date().getTime();

      // Find the time elapsed between now and start
      var elapsed = now - startTime;

      // Calculate minutes and seconds
      let minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

      // Add starting 0 if seconds < 10
      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      let currentTime = minutes + ':' + seconds;

      // Update clock on game screen
      $(".clock").text(currentTime);
    }, 750);

  };

// Set Rating and final Score
function setRating(moves) {
	var rating = 3;
	if (moves > rank3stars && moves < rank2stars) {
		$ratingStars.eq(2).removeClass('fa-star').addClass('fa-star-o');
		rating = 2;
	} else if (moves > rank2stars && moves < rank1stars) {
		$ratingStars.eq(1).removeClass('fa-star').addClass('fa-star-o');
		rating = 1;
	} else if (moves > rank1stars) {
		$ratingStars.eq(0).removeClass('fa-star').addClass('fa-star-o');
		rating = 0;
	}	
	return { score: rating };
};

// End Game
function endGame(moves, score) {
	swal({
		allowEscapeKey: false,
		allowOutsideClick: false,
		title: 'Congratulations! You Won!',
		text: 'With ' + moves + ' Moves and ' + score + ' Stars.\n YAAAY!',
		type: 'success',
		confirmButtonColor: '#02ccba',
		confirmButtonText: 'Play Again?!'
	}).then(function(isConfirm) {
		if (isConfirm) {
			clicks = 0;
			clearInterval(timer);
			initGame();
		}
	})
}

// Restart Game
$restart.bind('click', function() {
  swal({
    allowEscapeKey: false,
    allowOutsideClick: false,
    title: 'Are you sure?',
    text: "All progress will be Lost!",
    type: 'warning!',
    showCancelButton: true,
    confirmButtonColor: '#02ccba',
    cancelButtonColor: '#f95c3c',
    confirmButtonText: 'Yes, Restart Game!'
  }).then(function(isConfirm) {
    if (isConfirm) {
		clicks = 0;
		clearInterval(timer);
      initGame();
    }
  })
});

var addClkListener = function() {

// Card flip
$deck.find('.card:not(".match, .open")').bind('click' , function() {
	clicks++ ;
	clicks == 1 ? gameTimer() :'';
	if($('.show').length > 1) { return true; }
	var $this = $(this),
			card = $this.context.innerHTML;
  $this.addClass('open show');
	opened.push(card);
	

// Compare with opened card
  if (opened.length > 1) {
    if (card === opened[0]) {
      $deck.find('.open').addClass('match animated infinite shake');
      setTimeout(function() {
        $deck.find('.match').removeClass('open show animated infinite shake');
      }, delay);
      match++;
    } else {
      $deck.find('.open').addClass('notmatch animated infinite tada');
			setTimeout(function() {
				$deck.find('.open').removeClass('animated infinite tada');
			}, delay / 1.5);
      setTimeout(function() {
        $deck.find('.open').removeClass('open show notmatch animated infinite tada');
      }, delay);
    }
    opened = [];
		moves++;
		setRating(moves);
		$moveNum.html(moves);
  }
	
// End Game if match all cards
	if (gameCardsQTY === match) {
		setRating(moves);
		var score = setRating(moves).score;
		setTimeout(function() {
			endGame(moves, score);
		}, 500);
  }
});
};

initGame();