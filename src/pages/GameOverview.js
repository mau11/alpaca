import React from "react";
import { Link } from "react-router";

export default class GameOverview extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <ul className="list-group row">
          <li className="list-group-item col-xs-6">
            <img className="game-overview-icon" alt="Regular Quiz" src="http://s3.amazonaws.com/libapps/sites/611/icons/4179/app_store_icon.png" />
            <Link to="/prebuiltQuiz">Regular Quiz</Link>
          </li>
          <li className="list-group-item col-xs-6">
            <img className="game-overview-icon" alt="Car Quiz" src="http://s3.amazonaws.com/libapps/sites/611/icons/4179/app_store_icon.png" />
            <Link to="/carQuizGame">Car Quiz Game</Link>
          </li>
        </ul>
      </div>
    );
  }
}