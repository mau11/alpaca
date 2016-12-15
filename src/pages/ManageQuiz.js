import React from "react";
import axios from "axios";

export default class ManageQuiz extends React.Component {
 constructor(props) {
    super(props);

    // //keep state
    this.state = {
      testName: undefined,
      currQuesList: [] // populated with data from server in this.getTestNameCurrentQuestions
    };
  }

  // this actually pushes the current values to the server using a post request
  // with axios
  sendCustomTemplate(e) {
    e.preventDefault();

    // an array of objects for each input field, with 'name' and 'value' keys
    var $form = $('.form-customquiz').serializeArray();
    var testName, question, correct, wrong1, wrong2, wrong3;

    // TODO: perhaps there is a better way to write this
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
      this.setState({
        testName: testName
      }, this.getTestNameCurrentQuestions)
    })
    .then(function () {
      $(':input', '.form-customquiz')
      .not('input[name=testName]')
      .val('');
    })
    .catch(function (err) {
      console.error('error:', err);
    });
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

  handleTestName(testName) {
    this.setState({
      testName: testName
    }, this.getTestNameCurrentQuestions);
  }

  handleRemove(e) {
    // do something here that posts a delete request to server
    var tempName = e.target.textContent;
    this.setState({
      currQuesList: [],
    }, function() {
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

  render() {
    return (
      <div className="container customquiz">
        <div className="col-md-12">
          <div className='row'>
            <div className='col-md-6' >
              <h2>Build a Custom Quiz</h2>

              <form className="form-customquiz customquiz">
                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="testName">Test Name</label>
                  <div className="col-xs-8">
                    <input name="testName" type="text" className="form-control" placeholder="Enter the Name of this Test" onKeyUp={(e) => this.handleTestName(e.target.value)} required></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="question">Question</label>
                  <div className="col-xs-8">
                    <input name="question" type="text" className="form-control" placeholder="Enter a question" required></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="answer">Correct</label>
                  <div className="col-xs-8">
                    <input name="answer" type="text" className="form-control" placeholder="Enter an answer" required></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="option1">Wrong 1</label>
                  <div className="col-xs-8">
                    <input name="option1" type="text" className="form-control" placeholder="Enter an answer"></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="option2">Wrong 2</label>
                  <div className="col-xs-8">
                    <input name="option2" type="text" className="form-control" placeholder="Enter an answer"></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="option3">Wrong 3</label>
                  <div className="col-xs-8">
                    <input name="option3" type="text" className="form-control" placeholder="Enter an answer"></input>
                  </div>
                </div>

                <button className="btn btn-sm btn-primary" type="submit" onClick={(e) => this.sendCustomTemplate(e) }>Submit</button>
              </form>
            </div>

            <div className='col-md-6'>
              <div>
                <h3>Click questions below to delete them once created!</h3>
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
