import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory, IndexRedirect } from "react-router";
import 'velocity-animate';
import 'velocity-animate/velocity.ui';

import CustomQuiz from "./pages/CustomQuiz";
import PrebuiltQuiz from "./pages/PrebuiltQuiz";
import Layout from "./pages/Layout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import AuthService from "./util/AuthService"


// Wraps Login, adding the auth prop
class AuthLogin extends React.Component {
  render() {
    return <Login auth={auth} />
  }
}

// Wraps Layout, adding the auth prop
class AuthLayout extends React.Component {
  render() {
    return <Layout auth={auth} />
  }
}



const app = document.getElementById('root');

const auth = new AuthService('iH7Hvxq7GkgxZEIVFK7Ntb5ySmT8jWdE', 'stefanr.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={AuthLayout}>
      <IndexRedirect to="/home" />
      <Route path="home" component={Homepage} />
      <Route path="access_token=:token" component={AuthLogin} />
      <Route path="/prebuiltQuiz" name="prebuiltQuiz" component={PrebuiltQuiz}></Route>
      <Route path="/customQuiz" name="customQuiz" component={CustomQuiz} onEnter={requireAuth} ></Route>
      <Route path="/login" name="login" component={AuthLogin} ></Route>
    </Route>
  </Router>,
app);

