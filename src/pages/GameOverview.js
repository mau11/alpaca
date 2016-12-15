import React from "react";
import { Link } from "react-router";

export default class GameOverview extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div><Link to="/prebuiltQuiz">Regular Quiz</Link></div>
    );
  }
}
