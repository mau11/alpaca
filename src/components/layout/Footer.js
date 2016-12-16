import React from "react";


export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="container footer">
          <div className="col-lg-12">
            <p>Copyright © CrashCourse 2016            <span><span id="volumeIcon" className="glyphicon glyphicon-volume-up"></span> <input  id="volume" type="range" min="0" max="100" /></span></p>
          </div>
        </div>
      </footer>
    );
  }
}
