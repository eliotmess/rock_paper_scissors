'use strict';

//parametry gry

var params = {};
params.gameContinue = true;
params.playerWin = 0;
params.compWin = 0;
params.playId = 0;

document.getElementById('result').innerHTML = params.playerWin + ' : ' + params.compWin;
var compAnswer = document.getElementById('comp-answer');
var newGameBtn = document.getElementById('newgame');
var output = document.getElementById('output');
output.insertAdjacentHTML("afterbegin", "Try yourself and play against real computer - PUSH START!" + '<br>');

// funkcja zakończenia gry

var gameEnd = function() {
  if( params.playerWin == params.targetScore ) {
    showModalGameOver();
    document.querySelector('.game-over-message').innerHTML = '<h2>you win!</h2> <p>computer lost, for now</p>';
    output.insertAdjacentHTML("afterbegin", '<br>' + ' YOU WIN! COMPUTER LOST, FOR NOW ' +  '<br>' + '<br>');
    compAnswer.innerHTML= '<div> :-/ </div>';
    document.querySelector('#comp-answer div').classList.add('move');
    params.gameContinue = false;
  } else if( params.compWin == params.targetScore ) {
    showModalGameOver();
    document.querySelector('.game-over-message').innerHTML = '<h2>you lose!</h2> <p>computer played you again</p>';
    output.insertAdjacentHTML("afterbegin", '<br>' + ' YOU LOSE! COMPUTER PLAYED YOU AGAIN ' +  '<br>' + '<br>');
    compAnswer.innerHTML= '<div> ;-) </div>';
    document.querySelector('#comp-answer div').classList.add('move');
    params.gameContinue = false;
  }
};

//funkcje przycisków ruchów

var moveBtns = document.querySelectorAll('.player-move');

for (var i = 0; i < moveBtns.length; i++){
  moveBtns[i].addEventListener('click', function(){
    if(params.gameContinue){
      params.playerMove = this.getAttribute('data-move').toUpperCase();
      compDecision();
      moveCompare();
      gameEnd();
    } else {
      output.insertAdjacentHTML("afterbegin", ' Start new game ' +  '<br>');
    }
  });
}

// Generator ruchu komputera

var compDecision = function() {
  params.compRandom = Math.floor( Math.random() * 3 + 1 );

  if (params.compRandom === 1) {
    params.compMove = 'PAPER';
  } else if (params.compRandom === 2) {
    params.compMove = 'ROCK';
  } else {
    params.compMove = 'SCISSORS';
  }
  compAnswer.innerHTML = params.compMove;
};

// PORÓWNANIE WYNIKÓW

var moveCompare = function() {
  params.playId++;
  if ((params.playerMove === 'PAPER' && params.compMove === 'ROCK') || (params.playerMove === 'SCISSORS' && params.compMove === 'PAPER') || (params.playerMove === 'ROCK' && params.compMove === 'SCISSORS')) {
    output.insertAdjacentHTML("afterbegin", ' You Win! ' + ' You chose ' +  params.playerMove + ', ' + params.userName.toUpperCase() + ' and played computer\'s ' + params.compMove +  '<br>');
    params.playerWin ++;
    params.isCompWon = false;
    params.isDraw = false;
    document.getElementById('result').innerHTML = params.compWin + ' : ' + params.playerWin;
  } else if ( (params.playerMove === 'ROCK' && params.compMove === 'PAPER') || (params.playerMove === 'PAPER' && params.compMove === 'SCISSORS') || (params.playerMove === 'SCISSORS' && params.compMove === 'ROCK') ) {
    output.insertAdjacentHTML("afterbegin", ' You Lose! ' + ' You chose ' +  params.playerMove + ', ' + params.userName.toUpperCase() + ' and computer got you good with ' + params.compMove +  '<br>');
    params.isCompWon = true;
    params.isDraw = false;
    params.compWin ++;
    document.getElementById('result').innerHTML = params.compWin + ' : ' + params.playerWin;
  } else {
    params.isDraw = true;
    output.insertAdjacentHTML("afterbegin", ' It\'s a tie! ' + ' You chose ' +  params.playerMove + ', ' + params.userName.toUpperCase() + ' and computer guess what - ' + params.compMove +  '<br>');
  }
  scoreTable();
};

// prompt


newGameBtn.addEventListener('click', function() {
    params.gameContinue = true;
    params.playerWin = 0;
    params.compWin = 0;
    compAnswer.innerHTML='';
    document.getElementById('result').innerHTML = params.playerWin + ' : ' + params.compWin;
    showModalNewGame();
    document.querySelector('form div').innerHTML = '';
    params.playId = 0;
    document.querySelector('table tbody').innerHTML = '';
});


// MODALE

var showModalGameOver = function() {
  document.querySelector('#modal-overlay').classList.add('show');
  document.querySelector('.modal-game-over').classList.add('show');
}

var showModalNewGame = function() {
  document.querySelector('#modal-overlay').classList.add('show');
  document.querySelector('.modal-new-game').classList.add('show');
}

var hideModal = function() {
  document.querySelector('#modal-overlay').classList.remove('show');
  var modals = document.querySelectorAll('.modal');
  for(i = 0; i < modals.length; i++){
    modals[i].classList.remove('show');
  }
};

var closeModalButtons = document.querySelectorAll('.close-modal-button');
for(i = 0; i < closeModalButtons.length; i++){
  closeModalButtons[i].addEventListener('click', hideModal);
}

document.addEventListener('keydown', function(e) {
  if(e.keyCode === 32 && document.querySelector('.modal-game-over').classList.contains('show')) {
      hideModal();
  }
});

document.querySelector('#modal-overlay').addEventListener('click', function(e) {
  if ((e.target).closest('.modal')) {
    return;
  }
  hideModal();
});

// modal - new game

document.querySelector('.modal-new-game button[type="submit"]').addEventListener('click', function(e){
  e.preventDefault();
  params.targetScore = document.querySelector('.modal-new-game input[type="number"]').value;
  params.userName = document.querySelector('.modal-new-game input[type="text"]').value;

  if(params.targetScore.length > 0 && params.targetScore && params.userName.length > 0){
    hideModal();
    params.targetScore = Math.round(params.targetScore);
    document.getElementById('gameend').innerHTML= 'YOU PLAY TILL ' + params.targetScore + ' WINS ' + params.userName.toUpperCase() + '. MAY THE BEST MAN WIN.';
  } else {
    document.querySelector('form div').innerHTML = '<p>Error! Put correct data.</p>';
  }
});

// modal - game-over tabela

function scoreTable() {

  document.querySelector('table tbody').innerHTML += '<tr id="' + params.playId + '"> \
  <td>' + params.playId + '</td> \
  <td id="comp-move">' + params.compMove + '</td> \
  <td id="player-move">' + params.playerMove + '</td> \
  <td>' + params.compWin + ' : ' + params.playerWin + '</td> </tr>';

  var gameData = document.querySelectorAll('table tbody tr');
  for(i = 0; i < gameData.length; i++){
    if(gameData[i].id == params.playId && !params.isDraw){
      if(params.isCompWon) {
        gameData[i].querySelector('#comp-move').classList.add('winner');
      } else {
        gameData[i].querySelector('#player-move').classList.add('winner');
      }
    }
  }  
}
