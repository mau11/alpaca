import React from "react";
import { Link } from "react-router";

export default class GameOverview extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
    	<div className="container customquiz">
        <h1>Games</h1>
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-6">
              <div>
                <img className="game-overview-icon" alt="Regular Quiz" src="http://s3.amazonaws.com/libapps/sites/611/icons/4179/app_store_icon.png" />
                <Link to="/prebuiltQuiz"><h2>Regular Quiz</h2></Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <img className="game-overview-icon" alt="Regular Quiz" src="http://s3.amazonaws.com/libapps/sites/611/icons/4179/app_store_icon.png" />
              <Link to="/carQuizGame"><h2>Car Quiz Game</h2></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
