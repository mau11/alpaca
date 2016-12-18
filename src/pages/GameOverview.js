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
<<<<<<< eecc39c1c27b46a3d9ee327f7862eb870b4bbb7c
          <div className="col-md-4">
            <div>
              <a href="../game/v4.final.html">
                <img className="game-overview-icon" alt="Racer Quiz Game" src="assets/icons/racer.png" />
=======
          <div className="col-lg-3 col-md-4 col-xs-6 thumb">
            <a href="http://localhost:1337/game/v4.final.html" className="thumbnail" >
              <img className="game-overview-icon" alt="Racer Game" src="http://s3.amazonaws.com/libapps/sites/611/icons/4179/app_store_icon.png" />
              <h2>Racer Quiz Game</h2>
>>>>>>> added some css styling
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
                <img className="game-overview-icon" alt="Street Fighter Alpha - Quiz edition" src="assets/icons/wolf3d.png" />
              </a>
              <div className="game-overview-title"><a href="../fighter/default.htm">Street Fighter Alpha - Quiz edition</a></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
