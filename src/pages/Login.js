import React, { PropTypes as T } from "react";
import AuthService from '../util/AuthService';
import { Link } from 'react-router';


//instead of writing <a href="">, you can substitute it with Link
// import { Link } from "react-router";

export default class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { auth } = this.props;
    return (
      <div className="container main-login-container">
        <div className="col-md-4 col-md-offset-4">
          <h1>Log In</h1>
            <div className="form-group row">
              <button className="btn btn-sm btn-primary" type="submit" onClick={auth.login.bind(this)}>Log In</button>
            </div>
        </div>
      </div>
    );
  }
}
