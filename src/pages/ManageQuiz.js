import React from "react";
import axios from "axios";

export default class ManageQuiz extends React.Component {
 constructor(props) {
    super(props);

    // //keep state
    this.state = {
      questions: [] // populated with data from server in this.getTestNameCurrentQuestions
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
        this.setState({questions: response.data});
      })
      .catch(function(err){
        console.log(err)
      })
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
                {this.state.questions.map(question => {
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
