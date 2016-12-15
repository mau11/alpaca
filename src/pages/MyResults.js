import React from "react";
import { Link } from 'react-router'
import axios from 'axios';

export default class MyResults extends React.Component {

  constructor(props) {
    super(props);
    

    this.state = {
      userID: '999',
      results: [],
      
    };
  }

  componentWillMount(){
    this.getResults();
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
        console.log('------------RESULTS',response.data);
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
      <div className="container my-results"><h2>Quiz Results</h2>
        <table><tr><th>Quiz</th><th>#Correct</th><th>#Incorrect</th></tr>
        {this.state.results.map(quiz =>
          <tr><td>{quiz.testName}</td><td>{quiz.correct}</td><td>{quiz.incorrect}</td></tr>
        )}
        </table>
      </div>
    );
  }
}