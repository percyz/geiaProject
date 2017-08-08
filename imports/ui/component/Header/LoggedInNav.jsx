import React from 'react';
import ChangePassword from './ChangePassword.jsx';
import AccountsLogin from '../Login/AccountsLogin.jsx';

LoggedInNav = React.createClass({

  render() {
    return (
      <div className="collapse navbar-collapse" id="myNavbar">
        <ul className="nav navbar-nav navbar-right">
          <li><a href="/">Dashboard</a></li>
          <li><a href="Leaderboard">Leaderboard</a></li>
          <li><a href="/About">About</a></li>
          <li><a href="/Contact">Contact</a></li>
          <li><a href="/RegisterOrg">Register Org</a></li>
          <li>
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">Settings &nbsp;<span className="glyphicon glyphicon-cog"></span></a>
      <ul id="login-bg" style={{backgroundColor: '#337ab7'}} className="dropdown-menu">
        <li>
        <div className="bottom text-center">
           <a style={{textDecoration: 'none'}} href="/ChangePassword">Change Password</a>
         </div>
          </li>
    </ul>
</li>
          <li><a style={{cursor: 'pointer'}}onClick={this.props.logout}>Logout</a></li>

        </ul>
      </div>
    );
  }

});
export default LoggedInNav;
