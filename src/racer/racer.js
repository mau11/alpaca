import Util from '../util/quiz.js';

var game = new Util.Game();

window.game = game;

game.start(function() {
  setCurrentQuestion();
  setListeners();
});

function setCurrentQuestion() {
  var question = game.getCurrentQuestion();
  var message = '<h1>' + question.questionString + '</h1>' +
                '<h3>Level: ' + game.level + '</h3>' + '<ol>';

  question.answers.forEach(function(answer) {
    message += '<li>' + answer.answerString + '</li>';
  });

  message += '</ol>';

  setMessage(message);
}

function setMessage(message) {
  var status = document.getElementById('status');
  status.innerHTML = message;
}

function setListeners() {
  var buttons = document.getElementsByClassName('button');

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].removeEventListener('click', chooseNextLevel);
    buttons[i].addEventListener('click', chooseAnswer);
  }
}

function chooseAnswer(e) {
  var correct = game.processAnswer(e.target.id);
  if (correct === undefined) {
    return;
  }
  var nextQuestion = game.getNextQuestion();
  if (nextQuestion === false){
    var score = game.getCurrentScore();
    var message = 'Your score is ' + score + '! Click 1 to redo the quiz, click 2 to start a different quiz.';
    setMessage(message);
    setGameOverListeners();
  } else {
    setCurrentQuestion();
  }
}

function chooseNextLevel(e) {
  if (e.target.id === '1') {
    // start the game over again at the same level
    game.finishLevel(false, function() {
      setCurrentQuestion();
      setListeners();
    });
  } else if (e.target.id === '2') {
    // go to the next level
    game.finishLevel(true, function() {
      setCurrentQuestion();
      setListeners();
    });
  }
}
function setGameOverListeners() {
  var buttons = document.getElementsByClassName('button');

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].removeEventListener('click', chooseAnswer);
    buttons[i].addEventListener('click', chooseNextLevel);
  }
}
