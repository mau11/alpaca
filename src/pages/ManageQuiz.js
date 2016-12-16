import React from "react";
import axios from "axios";

export default class ManageQuiz extends React.Component {
 constructor(props) {
    super(props);

    // //keep state
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

  handleRemove(e, testName) {
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
    .catch(function(err){
      console.log(err)
    });
  }

  handleSearch(term) {
    var term = term.toLowerCase();
    if (this.state.allTestNames.indexOf(term) !== -1) { // search term matches a test name
      var displayQuestions = this.state.allQuestions.filter(function(question) {
        return question.testName.toLowerCase().match(term);
      });
      this.setState({
        displayQuestions: displayQuestions
      });
    } else if (term === '') { // no search term
      this.setState((prevState, props) => {
        return {
          displayQuestions: prevState.allQuestions
        };
      });
    } else { // no matches
      this.setState({
        displayQuestions: []
      });
    }
  }

  setMessage(message, type = 'info') {
    document.getElementById('messagesContainer').innerHTML = '<div class="alert alert-' + type + '">' + message + '</div>';
  }

  // toggle the display of the individual questions and answers
  toggleInfo(e) {
    const info = e.currentTarget.getElementsByClassName('moreInfo')[0];
    if(info.style.display == 'block'){
      info.style.display = 'none';
    } else {
      info.style.display = 'block';
    }
  }

  render() {
    return (
      <div className="container customquiz">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-6">
              <h1>Manage Quizzes</h1>
              <form>
                <label for="filter-quiz">Search</label>
                <input id="filter-quiz" name="filter-quiz" type="text" placeholder="Search for a quiz" onChange={(e) => this.handleSearch(e.target.value)}></input>
              </form>
                {this.state.displayQuestions.map(question => {
                  return (
                    <div className="quiz-row" onClick={this.toggleInfo.bind(this)}>
                      <div >
                        Test name: {question.testName}
                        <span className="moreInfo">Correct: {question.correct}
                        Wrong: {question.wrong1} {question.wrong2} {question.wrong3}</span>
                      </div>
                      <div className="actions">
                        <button onClick={(e) => {this.handleRemove(e, question.testName)}}>Delete</button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
