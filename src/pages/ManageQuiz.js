import React from "react";
import axios from "axios";

export default class ManageQuiz extends React.Component {
 constructor(props) {
    super(props);

    this.state = {
      allQuestions: [], // populated with data from server in this.getTestNameCurrentQuestions
      allTestNames: [], // populated by this.getTestNames
      displayQuestions: [] // questions to display
    };
  }

  componentWillMount() {
    this.getQuestions();
  }

  componentWillUnmount() {
     document.getElementById('messagesContainer').innerHTML = '';
  }

  getQuestions() {
    axios.get('/questions')
      .then(response =>{
        this.setState({
          allQuestions: response.data,
          displayQuestions: response.data
        }, () => {
          this.getTestNames(this.state.allQuestions);
        });
      })
      .catch(function(err){
        console.log(err)
      })
  }

  getTestNames(questions) {
    var testNames = [];
    questions.forEach(function(question) {
      var testName = question.testName;
      if (testNames.indexOf(testName) === -1) {
        testNames.push(testName.toLowerCase()); // case insensitive
      }
    });
    this.setState({
      allTestNames: testNames
    });
  }

  handleQuestionRemove(e, questionName) {
    e.preventDefault();
    axios.post('/questions', {
      delete: true,
      name: questionName
    })
    .then((result) => {
      this.setMessage('Question "' + questionName + '" deleted!', 'warning');
      this.getQuestions();
    })
    .catch(function(err) {
      console.error(err);
    });
  }

  handleTestRemove(e, testName) {
    e.preventDefault();
    // do something here that posts a delete request to server
    axios.post('/tests', {
      delete: true,
      testName: testName,
    })
    .then((result) => {
      this.setMessage('Quiz "' + testName + '" deleted!', 'warning');
      this.getQuestions()
    })
    .catch(function(err) {
      console.error(err)
    });
  }

  handleSearch(term) {
    var term = new RegExp(term.split(' ').join('|'), 'i');

    if (term === '') { // no search term
      this.setState((prevState, props) => {
        return {
          displayQuestions: prevState.allQuestions
        };
      });
    } else {
      var displayQuestions = [];

      this.state.allQuestions.forEach(function(question) {

        if (question.testName.match(term) ||
            question.name.match(term)) {
          displayQuestions.push(question);
        }
      });

      this.setState({
        displayQuestions: displayQuestions
      });
    }
  }

  setMessage(message, type = 'info') {
    document.getElementById('messagesContainer').innerHTML = '<div class="alert alert-' + type + '">' + message + '</div>';
  }

  // toggle the display of the individual questions and answers
  toggleInfo(e) {
    const info = e.currentTarget.getElementsByClassName('info-answers')[0];
    if(info.style.display == 'block'){
      info.style.display = 'none';
    } else {
      info.style.display = 'block';
    }
  }

  render() {
    return (
      <div className="container customquiz">
        <h1>Manage Quizzes</h1>
        <form name="filter-quiz">
          <label for="quiz-name">Search</label>
          <input id="quiz-name" name="quiz-name" type="text" placeholder="Search for a quiz" onChange={(e) => this.handleSearch(e.target.value)}></input>
        </form>
          {this.state.displayQuestions.map(question => {
            return (
              <div className="quiz-row" onClick={this.toggleInfo.bind(this)}>
                <div className="info-test">
                  Test name: {question.testName}
                  <div className="info-answers">
                  Question: {question.name}<br/>
                  Correct: {question.correct}<br/>
                  Wrong: {question.wrong1} {question.wrong2} {question.wrong3}
                  </div>
                </div>
                <div className="actions" role="quiz-actions">
                  <button className="btn btn-primary" onClick={(e) => {this.handleTestRemove(e, question.testName)}}>Delete Quiz</button>
                  <button className="btn btn-primary" onClick={(e) => {this.handleQuestionRemove(e, question.name)}}>Delete Question</button>
                </div>
              </div>
            );
          })}
      </div>
    )
  }
}
