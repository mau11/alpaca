import React from "react";
import { Link } from 'react-router'
import axios from 'axios';

export default class Homepage extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      quizNames: []
    };
  }
  render() {
    console.log(this.props.route.auth);
    return (
      <div className="container homepage">
        <div className="row text-center hero-section">
          <h1>CrashCourse</h1>
          <i className="fa fa-desktop"></i>
        </div>
        <div className="row main-content">
          <div className="col-md-4 text-left">
              <h2>What is CrashCourse?</h2>
              <p><b>CrashCourse</b> is a free online app where people can take educational quizzes!  It takes the tried-and-true multiple choice question approach and applies it into a fun interactive way.</p>
          </div>
          <div className="col-md-4 text-left">
              <h2>Why use CrashCourse?</h2>
              <p>Make challenge questions fun by making quizzes and sharing them with others, or take quizzes that others have made.  It's a fun and interactive way to test your knowledge.</p>
          </div>
          <div className="col-md-4 text-left">
              <h2>Get started</h2>
              <p>Take a quiz by clicking on "PreBuilt Quiz" in the top bar.  Or click "Custom Quiz" to start making your very own quiz for others!</p>
              {!this.props.route.auth.loggedIn() ? (<Link to="/login">Log In</Link>) : ''}

          </div>
        </div>




      </div>
    );
  }
}
