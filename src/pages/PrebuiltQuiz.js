import React from "react";
import axios from "axios";
import { VelocityComponent, VelocityTransitionGroup, velocityHelpers } from 'velocity-react';

export default class PrebuiltQuiz extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userID: '', // opportunity to get ID for currently logged-in user to track results
      category: '', // opportunity to get category of current test to track results
      name: '',  // this is actually the question being asked (please change the name)
      correct: '',
      questions: [],
      answers: [],
      index: null,
      timeCount:15, // used for countdown
      correctAns: 0, // number of correct and wrong answer submissions for percent
      wrongAns: 0,
      startTimer: false, // begins timer
      showTimer: false, // used to show timer after selecting a quiz
      quizName: '',
      quizNames: [],
      score: 0,
      completedQuiz: false, // when true ternary in render shows the summary component
    };
  }

  componentWillMount(){
    this.getQuizes(); // generate drop down list to select test
  }

  // get all quizzes from server
  getQuizes() {
    axios.get('/questions')
      .then(response => {
        var entries = response.data;
        var temp = [];
        entries.forEach(entry => {
          if (temp.indexOf(entry.testName) === -1) {
            temp.push(entry.testName);
          }
        });
        this.setState({
          quizNames: temp,
        });
      })
      .catch(function(err){
        console.log(err)
      })
  }

  componentDidUpdate() {
    if (this.state.startTimer) {
      this.handleTimeCount();
      this.setState({startTimer: false});
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  playCorrectSound() {
    var audio = new Audio('./assets/correct.mp3');
    audio.play();
  }
  playWrongSound() {
    var audio = new Audio('./assets/wrongCrash.wav');
    audio.play();
  }

  // grabs all the questions based on the selected quiz from the drop down list
  getQuestions() {
    var config = {
      params: {
        ID: this.state.quizName
      }
    };
    var questions;
    var index = this.state.index;
    axios.get('/questions', config)
      .then(response =>{
        questions = response.data;
        this.setState((prevState, props) => {
          return {
            questions: prevState.questions.concat(questions)
          };
        }, this.handleQuestionChange);
      })
      .catch(function(err){
        console.log(err)
      })
  }

  // *handle* functions take care of clicking the buttons, and the events of the
  // quiz
  handleClick(e) {
    if (this.state.correct === e.target.textContent) {
      this.handleCorrect();
    } else {
      this.handleWrong();
    }
  }

  handleCorrect() {
    this.playCorrectSound();
    this.setState((prevState, props) => {
      return {
        timeCount: 15,
        index: prevState.index + 1,
        answers: [],
        correctAns: prevState.correctAns + 1
      };
    }, this.handleQuestionChange);
  }

  handleWrong() {
    this.playWrongSound();
    this.setState((prevState, props) => {
      return {
        timeCount: 15,
        index: prevState.index + 1,
        answers: [],
        wrongAns: this.state.wrongAns + 1
      };
    }, this.handleQuestionChange);
  }

  handleTime() {
    this.setState((prevState, props) => {
      return {
        timeCount: prevState.timeCount - 1
      };
    }, function () {
      if (this.state.timeCount === 0) {
        this.handleWrong();
      }
      clearInterval(this.timer);
      this.setState({startTimer: true});
    })
  }

  handleTimeCount() {
    var that = this;
    this.timer = setInterval(function() {
      that.handleTime();
    }, 1000);
  }

  // after clicking an answer, index is incremented and the next question and
  // answer set is displayed
  handleQuestionChange() {
    var questions = this.state.questions;
    var index = this.state.index;
    var currentQuestion = questions[index];
    if (index === this.state.questions.length) {
      this.handleEndQuiz();
    } else {
      this.setState((prevState, props) => {
        var answers = [
        currentQuestion.correct,
        currentQuestion.wrong1,
        currentQuestion.wrong2,
        currentQuestion.wrong3
        ];

        // shuffle the order of the answer options
        this.shuffle(answers);

        return {
          name: currentQuestion.name,
          correct: currentQuestion.correct,
          answers: answers
        };
      });
    }
  }

  handleEndQuiz() {
    var percent = (this.state.correctAns/(this.state.questions.length)).toFixed(2) * 100;
    clearInterval(this.timer);
    this.setState({
      score: percent,
      completedQuiz: true,
      startTimer: false // stop the timer if quiz has ended
    })
  }

  // on selecting a quiz, reset timer, correct answer count and wrong count,
  // and get the array of questions
  handleQuizSelect(quizName) {
    if (quizName) { // don't update the state if they selected '' as a quiz
      this.setState({
        quizName: quizName,
        questions: [],
        answers: [],
        index: 0,
        timeCount:15,
        correctAns: 0,
        wrongAns: 0,
        startTimer: true, // start the timer if quiz has started
        showTimer: true,
        completedQuiz: false
      }, this.getQuestions);
    }
  }

  // helper function to shuffle the contents of an array
  shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) { 
      var j = Math.floor(Math.random() * (i + 1)); 
      var temp = array[i]; 
      array[i] = array[j]; 
      array[j] = temp; 
    } 
  }

  // ternary is used in render to render the completed page if this.state.CompletedQuiz is true :)
  // ternary is also used to display the Timer only after a test has been selected
  render() {
    return (
      <div className="App">
      {
          this.state.completedQuiz ?
          <div>
            <h1>quiz complete, your score is: {this.state.score}%!</h1>
            <div>
              <button className="button btn-retake-quiz" onClick={(e) => this.handleQuizSelect(this.state.quizName)} value={this.state.value} >Try again?
              </button>
              <button className="button btn-another-quiz" onClick={(e) => window.location.reload() }>Take another quiz?</button>
            </div>
          </div>
          :
          <div><h1>Select a quiz!</h1>
            <select className="buttonStyle" onChange={(e) => this.handleQuizSelect(e.target.value)} value={this.state.value} >
              <option selected></option>
              {this.state.quizNames.map(name =>
                <option value={name}>{name}</option>
              )}
            </select>

            <h2>{this.state.name}</h2>
            {/* animations for buttons */}
            <VelocityTransitionGroup
              enter={{animation: "transition.slideDownBigOut", duration: 20000, opacity: [1,1], translateY: 200}}
              leave={{opacity: [1,1]}}
            >
              {this.state.answers.map(option => <button onClick={this.handleClick.bind(this)} className={`answer btn btn-lg ${option}`}>{option}</button> )}
            </VelocityTransitionGroup>

            <div className="container"></div>
            {
              this.state.showTimer ? <h2>{this.state.timeCount}</h2> : null
            }
            <div id='ground'></div>
          </div>
      }
      </div>
    );
  }
}
