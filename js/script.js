'use strict';

var output = document.getElementById('output');
output.insertAdjacentHTML("afterbegin", "Try yourself and play against real computer - PUSH START!" + '<br>');

//zmienne

var params = {};

var playerMove;
var compMove;
var compValue;
var duelScore;
var targetScore = 3;

var playerWin = 0;
var compWin = 0;
var tableResult = document.getElementById('result').innerHTML= playerWin + ' : ' + compWin;


var compAnswer = document.getElementById('comp-answer');

var gameContinue = true;

var newGameBtn = document.getElementById('newgame');



// funkcja zakończenia gry

var finalScore = function() {
  if( playerWin == targetScore ) {
    output.insertAdjacentHTML("afterbegin", '<br>' + ' YOU WON WITH COMPUTER, FOR NOW ' +  '<br>' + '<br>');
    compAnswer.innerHTML=' :-/ ';
    gameContinue = false;
    return gameContinue;
  } else if( compWin == targetScore ) {
    output.insertAdjacentHTML("afterbegin", '<br>' + ' YOU LOSE! COMPUTER PLAYED YOU AGAIN ' +  '<br>' + '<br>');
    compAnswer.innerHTML=' ;-) ';
    gameContinue = false;
    return gameContinue;
  };
};

//funkcje przycisków ruchów

var moveBtns = document.querySelectorAll('.player-move');

for (var i = 0; i < moveBtns.length; i++){
  moveBtns[i].addEventListener('click', function(){
    if(gameContinue === true){
      playerMove = this.getAttribute('data-move').toUpperCase();
      compMove();
      duelScore();
      finalScore();
    } else {
      output.insertAdjacentHTML("afterbegin", ' Start new game ' +  '<br>');
    }
  });
}

// Generator ruchu komputera

compMove = function(event) {

  var compMove = Math.floor( Math.random() * 3 + 1 );

  if (compMove === 1) {
    compValue = 'PAPER';
  } else if (compMove === 2) {
    compValue = 'ROCK';
  } else {
    compValue = 'SCISSORS';
  }
  compAnswer.innerHTML = compValue;
};

// PORÓWNANIE WYNIKÓW

duelScore = function() {
  if ( (playerMove === 'PAPER' && compValue === 'ROCK') || (playerMove === 'SCISSORS' && compValue === 'PAPER') || (playerMove === 'ROCK' && compValue === 'SCISSORS') ) {
    output.insertAdjacentHTML("afterbegin", ' You Win! ' + ' You chose ' +  playerMove + ' and played computer\'s ' + compValue +  '<br>');
    playerWin ++;
    tableResult = document.getElementById('result').innerHTML= playerWin + ' : ' + compWin;
  } else if ( (playerMove === 'ROCK' && compValue === 'PAPER') || (playerMove === 'PAPER' && compValue === 'SCISSORS') || (playerMove === 'SCISSORS' && compValue === 'ROCK') ) {
    output.insertAdjacentHTML("afterbegin", ' You Lose! ' + ' You chose ' +  playerMove + ' and computer got you good with ' + compValue +  '<br>');
    compWin ++;
    tableResult = document.getElementById('result').innerHTML= playerWin + ' : ' + compWin;
  } else {
    output.insertAdjacentHTML("afterbegin", ' It\'s a tie! ' + ' You chose ' +  playerMove + ' and computer guess what - ' + compValue +  '<br>');
  }
};

// prompt


newGameBtn.addEventListener('click', function() {
    gameContinue = true;
    playerWin = 0;
    compWin = 0;
    compAnswer.innerHTML='';
    tableResult = document.getElementById('result').innerHTML= playerWin + ' : ' + compWin;
    targetScore = Math.round(window.prompt('Put number of victories to win it all'));
    
    if(isNaN(targetScore) || targetScore === null || targetScore === ''){
      alert('Don\'t make computer wait - put a correct number');
    }
    else if( targetScore <= 0 ){
      alert('Be serious!');
    }
    else {
      document.getElementById('gameend').innerHTML= 'YOU PLAY TILL ' + targetScore + ' WINS. MAY THE BEST MAN WIN!';
    }
    
    
  });
