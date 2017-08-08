import React from 'react';
import { browserHistory, Router, Route, Link, withRouter } from 'react-router';
import AccountsLogin from '../Login/AccountsLogin.jsx';



LoggedOutNav = React.createClass({

  _modifyFB(){
    setTimeout(()=>{
    console.log("aaaaaa");
    $(".login-password-form").children().remove();
    $(".login-password-form").append("<a href = '/Register' class='btn btn-primary'>Register</a>");
  },100)},

  render() {

    return (
      <div className="collapse navbar-collapse" id="myNavbar">
      <ul className="nav navbar-nav navbar-right">
        <li><a href="/">Dashboard</a></li>
        <li><a href="Leaderboard">Leaderboard</a></li>
        <li><a href="/About">About</a></li>
          <li><a href="/Contact">Contact</a></li>
          <li><a href="/Register">Register</a></li>
          <li><a href="#" className="col-sm-12" >
            {/*onClick = {this._modifyFB.bind(this)}*/}
          <AccountsLogin /></a>
          </li>

      </ul>
    </div>
    );
  }

});
export default LoggedOutNav;

{/*
import React from 'react';
import { browserHistory, Router, Route, Link, withRouter } from 'react-router';
import AccountsLogin from '../Login/AccountsLogin.jsx';



LoggedOutNav = React.createClass({

  render() {

    return (
      <div className="collapse navbar-collapse" id="myNavbar">
      <ul className="nav navbar-nav navbar-right">
        <li><a href="/">Dashboard</a></li>
        <li><a href="Leaderboard">Leaderboard</a></li>
        <li><a href="/About">About</a></li>
          <li><a href="/Contact">Contact</a></li>
          <li><a href="/Register">Register</a></li>
          <li><a href="#" className="col-sm-12">
          <AccountsLogin /></a>
          </li>

      </ul>
    </div>
    );
  }

});
export default LoggedOutNav;
*/}
