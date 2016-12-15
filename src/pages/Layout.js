import React from "react";
import { Link } from "react-router";

import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";

export default class Layout extends React.Component {
  render() {
    const { location } = this.props;
    const containerStyle = {
      marginTop: "60px"
    };
    return (
      <div>
        <Nav auth={this.props.route.auth} location={location} />
        <div className="container" style={containerStyle}>
          <div id="messagesContainer"></div>
          <div className="row">
            {this.props.children}
          </div>
        </div>
         <Footer/>
      </div>
    );
  }
}
