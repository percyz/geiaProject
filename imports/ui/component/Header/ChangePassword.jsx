import React from 'react';
import { browserHistory } from 'react-router';
import { ReactDOM } from 'react-dom';
import AboutNav from './AboutNav.jsx';


ChangePassword = React.createClass ({
  /** IF user is not logged in, pushes them to the homePage */
  componentWillMount() {
    if(!(!! Meteor.userId())){
      FlowRouter.go('/');
    }
  },

  onSubmit(e) {
    e.preventDefault();
    var oldPassword = this.refs.old_password.value;
    var newPassword = this.refs.new_password.value;
    var confirmPassword = this.refs.confirm_password.value;

    if(newPassword === confirmPassword){
      Accounts.changePassword(oldPassword, newPassword, (er)=>{
        if(er){
          alert("Password could not be changed");
        }else {
          alert("Password has been changed");
          FlowRouter.go('/');
        }
      });
    }
  },

  render (){

    var cont = {
  		marginTop: "0",
      margin: '0 auto'
  	};
  	var regButton = {
  		 height: "45px",
  		 width: "50%",
  		 background: "#7FFF00"
  	};

  	var mainLogin = {
  		backgroundColor: "white"
  	};

  	var textAr = {
  		fontFamily: "Oxygen"
  	};

    return (
      <div className="content">
      <AboutNav />
    <div className="container" style={cont}>
      <div className="signUp">Change Your Password</div>
      <div style={{marginTop: 0}} className="row main">

        <div className="main-login main-center" style={mainLogin}>
          <form onSubmit={this.onSubmit} className="form-horizontal">



            <div className="form-group">
              <label htmlFor="email"></label>
              <div className="cols-sm-10">
                <div className="input-group">

                  <input type="password" className="form-control" ref="old_password" placeholder="Old password"/>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password"></label>
              <div className="cols-sm-10">
                <div className="input-group">

                  <input type="password" className="form-control" ref="new_password" placeholder="New Password"/>
                </div>
              </div>
            </div>

                        <div className="form-group">
              <label htmlFor="password"></label>
              <div className="cols-sm-10">
                <div className="input-group">

                  <input type="password" className="form-control" ref="confirm_password" placeholder="Password (again)"/>
                </div>
              </div>
            </div>
            <div id="terms">

              <div className="registerButton">
                <button className="btn btn-success btn-lg" style={regButton}>Change</button>
              </div>
            </div>
          </form>

        </div>

            </div>

        </div>
      </div>
    );
  }
});
export default ChangePassword;
