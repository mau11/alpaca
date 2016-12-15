import React, { PropTypes as T } from 'react'
import { Link } from 'react-router'


export default class Nav extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  logout() {
    this.props.auth.logout();
    this.context.router.push('/home');
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const navClass = collapsed ? "collapse" : "";
    const showLogin = this.props.auth.loggedIn() ? false : true;


    return (

      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">CrashCourse</a>
          <div><input id="volume" type="range" min="0" max="100" /></div>
          </div>
          <div className={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/gameOverview">Game overview</Link></li>
              {this.props.auth.loggedIn() ? (<li><Link to="/addQuiz">Add Quiz</Link></li>) : ''}
              {this.props.auth.loggedIn() ? (<li><Link to="/manageQuiz">Manage Quizzes</Link></li>) : ''}
              {this.props.auth.loggedIn() ? (<li><Link onClick={this.logout.bind(this)}>Log Out</Link></li>) : ''}
              {!this.props.auth.loggedIn() ? (<li><Link onClick={this.props.auth.login.bind(this)}>Log In</Link></li>) : ''}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Nav.contextTypes = {
  router: T.object
}
