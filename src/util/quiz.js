import axios from "axios";

class Game {
  constructor() {
    // Levels correspond to quiz ids. If you complete a level at 100%, you pass on to the next one.
    this.level = 1;
    this._currentQuestions = [];
    this._currentQuestionIndex = 0;
    // Number of wrong answers during the current quiz
    this._numCorrectAnswers = 0;
    this._numWrongAnswers = 0;
  }

  /**
   * Starts the game for the current level.
   */
  start() {
    this._initializeCurrentLevel();
  }

  /**
   * Initializes the current game.
   */
  _initializeCurrentLevel() {
    // @todo
    var cb = function () {};
    this._initializeCurrentQuiz(this.level, cb);
    // Number of correct answers during the current quiz
    this._numCorrectAnswers = 0;
    // Number of wrong answers during the current quiz
    this._numWrongAnswers = 0;
  }

  /**
   * Get the question that the player is about to answer.
   */
  getCurrentQuestion() {
    return this._currentQuestions[this._currentQuestionIndex];
  }

  /**
   * Checks the answer given by the player and sets the next question.
   *
   * @val string answer
   *   The answer ID given by the player (1, 2, 3, or 4).
   * @return bool|undefined
   */
  processAnswer(answerId) {
    if (this.getCurrentQuestion().hasAnswerId(answerId)) {
      console.log('answer not found');
      return undefined;
    }

    let match = answerId === this.getCurrentQuestion().correctAnswer;
    if (match) {
      this._numCorrectAnswers++;
      console.log('correct answer')
    } else {
      this._numWrongAnswers++;
      console.log('wrong answer');
    }
    this._currentQuestionIndex++;
    return match;
  }

  /**
   * Gets the quiz data that corresponds to the current level.
   */
  _intializeCurrentQuiz(level, cb) {
    // make every testName correspond to a quiz ID.
    var testNames = [];
    var testNameForLevel;
    var questions = [];
    axios.get('/questions')
      .then(response => {
        var entries = response.data;
        entries.forEach(entry => {
          if (testNames.indexOf(entry.testName) === -1) {
            testNames.push(entry.testName);
          }
          if (this.level === testNames.length) {
            testNameForLevel = entry.testName;
          }
          if (entry.testName === testNameForLevel) {
            questions.push(new Question(entry.name, entry.correct, entry.wrong1, entry.wrong2, entry.wrong3));
          }
        });
        cb();
      })
      .catch(function(err){
        console.log(err)
      })
  }

  /**
   * hecks if all questions have been answered
   * @return bool|string
   */
  getNextQuestion() {
    var question = this.currentQuestions[this.currentQuestionIndex];
    this.currentQuestionIndex++;
    return question;
  }

  getCurrentScore() {
    return Math.floor(this.numCorrectAnswers / this.currentQuestions.length * 100) + '%';
  }

  finishLevel() {
    this.level++;
  }
};


/**
 * Quiz class
 */
class Quiz {

  /**
   * @var string quizName
   * @var Question[] questions
   */
  constructor(quizName = '', questions) {
    this.quizName = quizName;
    questions.forEach((question) => {
      if (!question instanceof Question) {
        throw new Error('invalid question');
      }
    });
    this.questions = questions;
  }

  addQuestion(question) {
    if (!question instanceof Question) {
      throw new Error('invalid question');
    }
    this.questions.push(question);
  }
};

class Question {
  constructor(questionString = '', correctAnswer = '', wrong1 = '', wrong2 = '', wrong3 = '') {
    this.questionString = questionString;
    this.answers = [];
    this.answers.push(new Answer(correctAnswer, true));
    this.answers.push(new Answer(wrong1, false));
    this.answers.push(new Answer(wrong2, false));
    this.answers.push(new Answer(wrong3, true));
    // Shuffle the answers.
    this._shuffle(this.answers);
    // Add an answer ID.
    this.answers.map((answer, i) => answer.answerId = i + 1);
    // Set the answerId property.
    this._setCorrectAnswerId();
  }

  hasAnswerId(answerId) {
    for (var i = 0; i < this.answers.length; i++) {
      if (this.answers[i].answerId == answerId) {
        return true;
      }
    }
    return false;
  }

  /**
   * Sets the correctAnswerId property. This assumes there is only one correct answer.
   */
  _setCorrectAnswerId() {
    for (let i = 0; i < this.answers.length; i++) {
      if (this.answers[i].isCorrect) {
        this.correctAnswerId = this.answers[i].answerId;
      }
    }
  }

  _shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
};

/**
 * Answer class
 */
class Answer {
  constructor(answerString, isCorrect) {
    this.answerString = answerString;
    this.isCorrect = isCorrect;
  }
}
