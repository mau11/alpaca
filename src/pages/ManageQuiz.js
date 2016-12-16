import React from "react";
import axios from "axios";

export default class ManageQuiz extends React.Component {
 constructor(props) {
    super(props);

    this.state = {
      userID: '',
      allQuestions: [], // populated with data from server in this.getTestNameCurrentQuestions
      allTestNames: [], // populated by this.getTestNames
      displayQuestions: [] // questions to display
    };
  }

  componentWillMount() {
    this.getUserId();
    this.getQuestions();
  }

  componentWillUnmount() {
     document.getElementById('messagesContainer').innerHTML = '';
  }

  getUserId(){
    var setUserId = this.setUserId.bind(this);
    this.props.route.auth.lock.getProfile(this.props.route.auth.getToken(), function(error, profile) {
      if (error) {
        return;
      }
      setUserId(profile.user_id);
    });
  }

  setUserId(id){
    this.setState({
      userID: id
    }, function(){
      this.getQuestions();
    });
  }

  getQuestions() {
    var config = {
      params:{
        userID: this.state.userID
      }
    }
    axios.get('/questions', config)
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
      userID: this.state.userID,
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
      userID: this.state.userID,
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
          <label htmlFor="quiz-name">Search for a quiz</label>
          <input className="form-control" id="quiz-name" name="quiz-name" type="text" placeholder="Search for a quiz" onChange={(e) => this.handleSearch(e.target.value)}></input>

        </form>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="col-md-8">Question</th>
              <th className="col-md-4">Operations</th>
            </tr>
          </thead>
          <tbody>
          {this.state.displayQuestions.map((question, key) => {
            return (
              <tr key={key} onClick={this.toggleInfo.bind(this)}>
                <td className="col-md-8">
                    <h3>{question.testName}</h3>
                    <div className="question"><span className="glyphicon glyphicon-question-sign"></span> {question.name}</div>
                  <div className="info-answers">
                    <ul className="list-group">
                      <li className="list-group-item"><span className="glyphicon glyphicon-ok"></span> {question.correct}</li>
                      <li className="list-group-item">
                        <ul>
                          <li><span className="glyphicon glyphicon-remove"></span> {question.wrong1}</li>
                          <li><span className="glyphicon glyphicon-remove"></span> {question.wrong2}</li>
                          <li><span className="glyphicon glyphicon-remove"></span> {question.wrong3}</li>
                       </ul>
                      </li>
                    </ul>
                  </div>
                </td>
                <td className="actions col-md-4" role="quiz-actions">
                  <button className="btn btn-primary btn-sm" onClick={(e) => {this.handleTestRemove(e, question.testName)}}>Delete Quiz</button>
                  <button className="btn btn-primary btn-sm" onClick={(e) => {this.handleQuestionRemove(e, question.name)}}>Delete Question</button>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    )
  }
}
