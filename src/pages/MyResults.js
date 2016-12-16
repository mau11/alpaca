import React from "react";
import { Link } from 'react-router'
import axios from 'axios';

export default class MyResults extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      results: [],
    };
  }

  componentWillMount(){
    this.getUserId();
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
      this.getResults();
    });
  }

  getResults() {
    console.log('props.', this.state.userID)
    var config = {
      params:{
        userID: this.state.userID
      }
    }
    axios.get('/Results', config)
      .then(response => {
        this.setState({
          results: response.data,
        });
      })
      .catch(function(err){
        console.log('NO TEST RESULTS');
      })
  }

  render() {
    return (
      <div className="container myresults">
        <div className="col-md-12">
          <div className="row flex-container">
            <div className="flex-box">
              <h1>Quiz Results</h1>
              <table className="table table-striped results"><thead><tr><th>Quiz</th><th>Correct</th><th>Incorrect</th></tr></thead>
              <tbody>
              {this.state.results.map(quiz =>
                <tr><td>{quiz.testName}</td><td>{quiz.correct}</td><td>{quiz.incorrect}</td></tr>
              )}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
