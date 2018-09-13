'use strict';

var output = document.getElementById('output').insertAdjacentHTML("afterbegin", "Try yourself and play against real computer - take your pick!" + '<br>');

//zmienne

var rockBtn = document.getElementById('rock');
var paperBtn = document.getElementById('paper');
var scissorsBtn = document.getElementById('scissors');
var playerMove;
var compMove;
var compValue;
var duelScore;
var finalScore;
var targetScore = 3;

var playerWin = 0;
var compWin = 0;
var tableResult = document.getElementById('result').innerHTML= playerWin + ' : ' + compWin;

var gameContinue = true;

var newGameBtn = document.getElementById('newgame');


// funkcja zakończenia gry

finalScore = function() {
  if( playerWin == targetScore ) {
    document.getElementById('output').insertAdjacentHTML("afterbegin", '<br>' + ' YOU WON WITH COMPUTER, FOR NOW ' +  '<br>' + '<br>');
    gameContinue = false;
    return gameContinue;
  }
  else if( compWin == targetScore ) {
      document.getElementById('output').insertAdjacentHTML("afterbegin", '<br>' + ' YOU LOSE! COMPUTER PLAYED YOU AGAIN ' +  '<br>' + '<br>');
    gameContinue = false;
    return gameContinue;
  };
};

//funkcje przycisków ruchów

rockBtn.addEventListener('click', function(event){
  
  if(gameContinue === true){
    playerMove = ' ROCK ';
    var compChoice = compMove();
    var roundScore = duelScore();
    var countingScore = finalScore();
    }
  else if(gameContinue === false){
    document.getElementById('output').insertAdjacentHTML("afterbegin", ' Start new game ' +  '<br>');
  }
});

paperBtn.addEventListener('click', function(event){
  
  if(gameContinue === true){
    playerMove = ' PAPER ';
    var compChoice = compMove();
    var roundScore = duelScore();
    var countingScore = finalScore();
   }
  else if(gameContinue === false){
    document.getElementById('output').insertAdjacentHTML("afterbegin", ' Start new game ' +  '<br>');
  }
});

scissorsBtn.addEventListener('click', function(event){
  
  if(gameContinue === true){
    playerMove = ' SCISSORS ';
    var compChoice = compMove();
    var roundScore = duelScore();
    var countingScore = finalScore();
  }
  else if(gameContinue === false){
    document.getElementById('output').insertAdjacentHTML("afterbegin", ' Start new game ' +  '<br>');
  }
});


// Generator ruchu komputera

compMove = function(event) {

  var compAnswer = document.getElementById('comp-answer');
  var compMove = Math.random();
  compMove = Math.floor( compMove * 3 + 1 );

  if (compMove === 1) {
    compAnswer.innerHTML=' PAPER ';
    compValue = ' PAPER ';
  }
  else if (compMove === 2) {
    compAnswer.innerHTML=' ROCK ';
    compValue = ' ROCK ';
  }
  else if (compMove === 3) {
    compAnswer.innerHTML=' SCISSORS ';
    compValue = ' SCISSORS ';
  }
};

// PORÓWNANIE WYNIKÓW

duelScore = function() {
  if ( playerMove === compValue ) {
     document.getElementById('output').insertAdjacentHTML("afterbegin", ' It\'s a tie! ' + ' You chose ' +  playerMove + ' and computer guess what - ' + compValue +  '<br>');
  }
  else if ( (playerMove === ' ROCK ' && compValue === ' PAPER ') || (playerMove === ' PAPER ' && compValue === ' SCISSORS ') || (playerMove === ' SCISSORS ' && compValue === ' ROCK ') ) {
    document.getElementById('output').insertAdjacentHTML("afterbegin", ' You Lose! ' + ' You chose ' +  playerMove + ' and computer got you good with ' + compValue +  '<br>');
    compWin += 1;
    tableResult = document.getElementById('result').innerHTML= playerWin + ' : ' + compWin;
  }
  else if ( (playerMove === ' PAPER ' && compValue === ' ROCK ') || (playerMove === ' SCISSORS ' && compValue === ' PAPER ') || (playerMove === ' ROCK ' && compValue === ' SCISSORS ') ) {
    document.getElementById('output').insertAdjacentHTML("afterbegin", ' You Win! ' + ' You chose ' +  playerMove + ' and played computer\'s ' + compValue +  '<br>');
    playerWin += 1;
    tableResult = document.getElementById('result').innerHTML= playerWin + ' : ' + compWin;
  }
};

// prompt


newGameBtn.addEventListener('click', function() {
    gameContinue = true;
    playerWin = 0;
    compWin = 0;
    tableResult = document.getElementById('result').innerHTML= playerWin + ' : ' + compWin;
    targetScore = window.prompt('Put number of victories to win it all');
    parseInt(targetScore);
    
    if(isNaN(targetScore) || targetScore === null || targetScore === ''){
      alert('Don\'t make computer wait - put a correct number');
    }
    else {
    gameTarget = document.getElementById('gameend').innerHTML= 'YOU PLAY TILL ' + targetScore + ' WINS. MAY THE BEST MAN WIN!';
    return targetScore;
      }
    
    
  });

