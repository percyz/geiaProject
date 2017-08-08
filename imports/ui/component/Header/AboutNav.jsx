import React from 'react';
import { browserHistory, Router, Route, Link, withRouter } from 'react-router';
import AccountsLogin from '../Login/AccountsLogin.jsx';
import { Meteor } from 'meteor/meteor';

export default class AboutNav extends React.Component {

  componentDidMount() {
       console.log("im leaving!!");
       $('#login-dropdown-list').hide();
   }

  render() {
    var LogoStyle = {
       maxWidth: "90px",
       maxHeight: "40px",
       position: "absolute",
       marginTop: "5px",
       left: "10px"
    };

    var checkLogged = (!! Meteor.userId())
    {/*Checks whether the user is logged in*/}
    var navOptions = checkLogged ? <li><a href="/Dashuser">Dashboard</a></li> : <li><a href="/">Home</a></li>
    return (
      <header>
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>

              <a className="Logo" href="/"><img style={{maxWidth: '90px', maxHeight: '40px', position: 'absolute', marginTop: '5px', left: '10px'}} src="Geia-white-Logo.png"/></a>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav navbar-right">
            {navOptions}
            <li><a href="Leaderboard">Leaderboard</a></li>
            <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#">About<span className="caret"></span></a>
              <ul className="dropdown-menu">
              
                <li><a href="/About">Geia</a></li>
                <li><a href="/Sustain">Our Service</a></li>
                <li><a href="/Rewards">Leaderboard</a></li>
                <li><a href="/Giveback">Give Back</a></li>
                <li><a href="/FAQs">Faqs</a></li>
                <li><a href="/Contact">Contact Us</a></li>
              </ul>
            </li>

              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                  <AccountsLogin />
                </a>
              </li>
          </ul>
          </div>
        </div>
      </nav>
        <img id="Aboutmountimg" src="General-Website-Banner-7.jpg"/>
    </header>
    );
  }
}
