import React from "react";
import { Link } from "react-router";

export default class GameOverview extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
    	<div className="container customquiz">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-6">
              <div><Link to="/prebuiltQuiz"><h2>Regular Quiz</h2></Link></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
