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
          <div className="col-md-12">
            <h1>Games</h1>
          </div>
          <div className="col-md-4">
            <div>
              <Link to="/prebuiltQuiz">
                <img className="game-overview-icon" alt="Regular Quiz" src="assets/icons/quiz.png" />
              </Link>
              <div className="game-overview-title"><Link to="/prebuiltQuiz">Regular Quiz</Link></div>
            </div>
          </div>
          <div className="col-md-4">
            <div>
              <Link to="/carQuizGame">
                <img className="game-overview-icon" alt="Car Quiz Game" src="assets/icons/carquiz.png" />
              </Link>
              <div className="game-overview-title"><Link to="/carQuizGame">Car Quiz Game</Link></div>
            </div>
          </div>
          <div className="col-md-4">
            <div>
              <a href="../game/v4.final.html">
                <img className="game-overview-icon" alt="Racer Quiz Game" src="assets/icons/racer.png" />
              </a>
              <div className="game-overview-title"><a href="../game/v4.final.html">Racer Quiz Game</a></div>
            </div>
          </div>
          <div className="col-md-4">
            <div>
              <a href="../hex/index.html">
                <img className="game-overview-icon" alt="3D Racer Quiz Game" src="assets/icons/hexgl.png" />
              </a>
              <div className="game-overview-title"><a href="../hex/index.html">3D Racer Quiz Game</a></div>
            </div>
          </div>
          <div className="col-md-4">
            <div>
              <a href="../wolf/index.html">
                <img className="game-overview-icon" alt="Wolfenstein 3D - Quiz edition" src="assets/icons/wolf3d.png" />
              </a>
              <div className="game-overview-title"><a href="../wolf/index.html">Wolfenstein 3D - Quiz edition</a></div>
            </div>
          </div>
          <div className="col-md-4">
            <div>
              <a href="../wolf/index.html">
                <img className="game-overview-icon" alt="Street Fighter Alpha - Quiz edition" src="assets/icons/fighter.png" />
              </a>
              <div className="game-overview-title"><a href="../fighter/default.htm">Street Fighter Alpha - Quiz edition</a></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
