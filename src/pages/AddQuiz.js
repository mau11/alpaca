import React from "react";
import axios from "axios";

export default class AddQuiz extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
      option1: '',
      option2: '',
      option3: '',
      testName: '',
      currQuesList: [], // populated with data from server in this.getTestNameCurrentQuestions
    }
  }

  handleRemove(e) {
    var tempName = e.target.textContent;
    this.setState({currQuesList: []}, () => {
      axios.post('/questions', {
        delete: true,
        name: tempName,
      })
      .catch(function(err){
        console.log(err)
      });
    this.getTestNameCurrentQuestions();
    });
  }

  handleTestName(testName) {
    this.setState({
       testName: testName
    }, this.getTestNameCurrentQuestions);
  }

  getTestNameCurrentQuestions() {
    var entries;
    var config = {
      params: {
        ID: this.state.testName
      }
    };
    axios.get('/questions', config)
    .then(response => {
      entries = response.data;
      var temp = [];
      entries.forEach(entry => {
        temp.push(entry.name);
      });
      this.setState({
        currQuesList: temp,
      });
    })
    .catch(function(err){
      console.log(err)
    })
  }

  componentWillUnmount() {
     document.getElementById('messagesContainer').innerHTML = '';
  }

  // this actually pushes the current values to the server using a post request
  // with axios
  sendCustomTemplate(e) {
    e.preventDefault();

    // an array of objects for each input field, with 'name' and 'value' keys
    var $form = $('.form-customquiz').serializeArray();
    var testName, question, correct, wrong1, wrong2, wrong3;

    $form.forEach(function (field) {
      if (field.name === 'testName') {
        testName = field.value;
      } else if (field.name === 'question') {
        question = field.value;
      } else if (field.name === 'answer') {
        correct = field.value;
      } else if (field.name === 'option1') {
        wrong1 = field.value;
      } else if (field.name === 'option2') {
        wrong2 = field.value;
      } else if (field.name === 'option3') {
        wrong3 = field.value;
      }
    });

    axios.post('/questions', {
      name: question,
      correct: correct,
      wrong1: wrong1,
      wrong2: wrong2,
      wrong3: wrong3,
      testName: testName,
    })
    .then(() => {
      // clear forms
      this.setState({
        name: '',
        correct: '',
        wrong1: '',
        wrong2: '',
        wrong3: ''
      })
      this.setMessage('Question added! Keep adding questions to this quiz if you like...', 'success');
      this.getTestNameCurrentQuestions();
    })
    .catch(function (err) {
      console.error('error:', err);
    });
  }
  // the next *handle* functions to the work of updating state variables as
  // data is typed into the input fields.
  handleQuestion(e) {
    this.setState({
      question: e.target.value
    });
  }

  handleCorrentAnswer(e) {
    this.setState({
      answer: e.target.value
    });
  }

  handleWrong1(e) {
    this.setState({
      option1: e.target.value
    });
  }

  handleWrong2(e) {
    this.setState({
      option2: e.target.value
    });
  }

  handleWrong3(e) {
    this.setState({
      option3: e.target.value
    });
  }

  // still handling input field text, but calling this.getTest..... to populate the
  // existing questions for the supplied test in the div to the right
  handleTestName(e) {
    this.setState({
      testName: e.target.value,
      currQuesList: [],
    }, this.getTestNameCurrentQuestions);
  }

  setMessage(message, type = 'info') {
    document.getElementById('messagesContainer').innerHTML = '<div class="alert alert-' + type + '">' + message + '</div>';
  }


  render() {
    return (
      <div className="container customquiz">
        <div className="col-md-12">
          <div className='row'>
            <div className='col-md-6' >
              <h1>Build a Custom Quiz</h1>

              <form className="form-customquiz customquiz">
                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="testName">Quiz Name</label>
                  <div className="col-xs-8">
                    <input name="testName" type="text" className="form-control" placeholder="Enter the Name of this Test" required onChange={this.handleTestName.bind(this)}></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="question">Question</label>
                  <div className="col-xs-8">
                    <input name="question" type="text" className="form-control" placeholder="Enter a question" required onChange={this.handleQuestion.bind(this)}></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="answer" maxlength="20">Correct answer</label>
                  <div className="col-xs-8">
                    <input name="answer" type="text" className="form-control" placeholder="Enter an answer" required onChange={this.handleCorrentAnswer.bind(this)}></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="option1" maxlength="20">Wrong answer #1</label>
                  <div className="col-xs-8">
                    <input name="option1" type="text" className="form-control" placeholder="Enter an answer" onChange={this.handleWrong1.bind(this)}></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="option2" maxlength="20">Wrong answer #2</label>
                  <div className="col-xs-8">
                    <input name="option2" type="text" className="form-control" placeholder="Enter an answer" onChange={this.handleWrong2.bind(this)}></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="option3" maxlength="20">Wrong answer #3</label>
                  <div className="col-xs-8">
                    <input name="option3" type="text" className="form-control" placeholder="Enter an answer" onChange={this.handleWrong3.bind(this)}></input>
                  </div>
                </div>

                <button className="btn btn-sm btn-primary" type="submit" onClick={(e) => this.sendCustomTemplate(e) }>Submit</button>
              </form>
            </div>
             <div className='col-md-6'>
               <div>
                 {this.state.currQuesList.length > 0 ? <h1>Click to delete previous questions in this quiz!</h1> : ''}
                 {this.state.currQuesList.map(option =>
                   <button
                     onClick={this.handleRemove.bind(this)}
                     className={`answer btn btn-lg ${option}`}>{option}
                   </button> )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
