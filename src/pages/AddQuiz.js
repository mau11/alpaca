import React from "react";
import axios from "axios";

export default class AddQuiz extends React.Component {
 constructor(props) {
    super(props);

    this.state = {
      userID: '',
      allTestNames: [],
      testName: '',
      currQuesList: []
    }
  }

  componentWillMount(){
    this.getUserId(this.getTestNames);
  }

  componentWillUnmount() {
     document.getElementById('messagesContainer').innerHTML = '';
  }

  getUserId(cb){
    var setUserId = this.setUserId.bind(this);
    this.props.route.auth.lock.getProfile(this.props.route.auth.getToken(), function(error, profile) {
      if (error) {
        return;
      }
      setUserId(profile.user_id, cb);
    });
  }

  setUserId(id, cb){
    this.setState({
      userID: id
    }, cb);
  }

  getTestNames() {
    var config = {
      params:{
        userID: this.state.userID
      }
    }
    axios.get('/questions', config)
          .then(response => {
            var allTestNames = [];
            response.data.forEach(function(question) {
              var testName = question.testName;
              if (allTestNames.indexOf(testName) === -1) {
                // case insensitive
                allTestNames.push(testName.toLowerCase());
              }
            });
            this.setState({
              allTestNames: allTestNames
            });
          })
          .catch((error) => {
            console.log('There was an error:', error);
          });
  }

  getTestNameCurrentQuestions() {
    var entries;
    var config = {
      params: {
        userID: this.state.userID,
        testName: this.state.testName
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
    if (this.state.allTestNames.indexOf(testName.toLowerCase()) !== -1 || testName === '') {
      this.setState({
        testName: testName,
        currQuesList: [],
      }, this.getTestNameCurrentQuestions);
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
      userID: this.state.userID,
      name: question,
      correct: correct,
      wrong1: wrong1,
      wrong2: wrong2,
      wrong3: wrong3,
      testName: testName,
    })
    .then(() => {
      // clear forms except for the test name
      $(':input', '.form-customquiz')
      .not('input[name=testName]')
      .val('');
      this.setMessage('Question added! Keep adding questions to this quiz if you like...', 'success');

      // load questions to delete
      this.setState((prevState, props) => {
        allTestNames: prevState.allTestNames.push(testName);
      }, function() {
        this.handleTestName(testName);
      });

    })
    .catch(function (err) {
      console.error('error:', err);
    });
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
                  <label className="col-xs-4 col-form-label" htmlFor="testName">Test Name</label>
                  <div className="col-xs-8">
                    <input name="testName" type="text" className="form-control" placeholder="Enter the Name of this Test" onChange={(e) => this.handleTestName(e.target.value)} required></input>
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
                    <input name="answer" type="text" className="form-control" placeholder="Enter an answer" maxLength="25" required></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="option1">Wrong 1</label>
                  <div className="col-xs-8">
                    <input name="option1" type="text" className="form-control" placeholder="Enter an answer" maxLength="25"></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="option2">Wrong 2</label>
                  <div className="col-xs-8">
                    <input name="option2" type="text" className="form-control" placeholder="Enter an answer" maxLength="25"></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="option3">Wrong 3</label>
                  <div className="col-xs-8">
                    <input name="option3" type="text" className="form-control" placeholder="Enter an answer" maxLength="25"></input>
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
