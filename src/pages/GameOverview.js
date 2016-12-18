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
          <div className="col-md-6">
            <div>
              <img className="game-overview-icon" alt="Racer Game" src="http://s3.amazonaws.com/libapps/sites/611/icons/4179/app_store_icon.png" />
              <a href="../racer/v4.final.html"><h2>Racer Quiz Game</h2></a>
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <img className="game-overview-icon" alt="3D Racer Game" src="http://s3.amazonaws.com/libapps/sites/611/icons/4179/app_store_icon.png" />
              <a href="../hex/index.html"><h2>3D Racer Quiz Game</h2></a>
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <img className="game-overview-icon" alt="Shooter Game" src="http://s3.amazonaws.com/libapps/sites/611/icons/4179/app_store_icon.png" />
              <a href="../shooter/index.html"><h2>Wolfenstein 3D - Quiz version</h2></a>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
