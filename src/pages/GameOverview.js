import React from "react";
import { Link } from "react-router";

export default class GameOverview extends React.Component {
  constructor(props){
    super(props);
  }

  // ternary is used in render to render the completed page if this.state.CompletedQuiz is true :)
  // ternary is also used to display the Timer only after a test has been selected
  render() {
    return (
      <div><Link to="/prebuiltQuiz">Regular Quiz</Link></div>
    );
  }
}
