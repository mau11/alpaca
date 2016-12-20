import React from "react";
import { Link } from 'react-router'
import axios from 'axios';
import chart from 'chart.js';

export default class MyResults extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      results: [],
      allTestNames:[],
      allScores:[]
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
    var config = {
      params:{
        userID: this.state.userID
      }
    }
    console.log('userID:', this.state.userID);
    axios.get('/results', config)
      .then(response => {
        //create array of test names
        var results = response.data;
        var testNames = [];
        var scores = [];
        results.forEach(function(result){
          testNames.push(result.testName);
          scores.push(100*result.correct/(result.correct + result.incorrect));
        })
        //create array of scores
        //add them to setstate
        this.setState({
          results: response.data,
          allTestNames: testNames,
          allScores:scores
        }, function(){
          this.displayChart();
        });
      })
      .catch(function(err){
        console.log('NO TEST RESULTS');
      })
  }

  displayChart(){
    var ctx = document.getElementById("myChart");
    
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: this.state.allTestNames,
        datasets: [{
            label: 'Score',
            data: this.state.allScores,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
  }

  render() {
    return (
      <div className="container myresults">
        <div className="col-md-12">
          <div className="row flex-container">
            <div className="flex-box">
              <h1>Quiz Results</h1>
              <table className="table table-striped results"><thead><tr><th>Quiz</th><th>Correct</th><th>Incorrect</th><th>Game</th></tr></thead>
              <tbody>
              {this.state.results.map(quiz =>
                <tr><td>{quiz.testName}</td><td>{quiz.correct}</td><td>{quiz.incorrect}</td><td>{quiz.game}</td></tr>
              )}</tbody>
              </table>
              <canvas id="myChart" width="400" height="400"></canvas>
              <div id="chart"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
