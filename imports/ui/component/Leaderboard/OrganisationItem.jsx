import React from 'react';
import Loading from 'react-loading';
import { Link } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Organisations } from '../../../api/Leaderboard/organisations.js';

export default class OrganisationItem extends TrackerReact(React.Component) {

    constructor(props,) {
        super(props);
        this.state = {
            subscription:{
                publishOrganisations: Meteor.subscribe("publishOrg-LeaderboardD")
            }
        };
    }

    organisations() {
        return this.state.subscription.publishOrganisations;
    }

    /*** checking the organisation is validated ***/

    renderValidated(){
        if(this.props.leader.validated){
            return (
                <div style={{marginTop: '8px',width: '50px'}}>
                    <img id="checkimg" src="checked.png" alt="tick" />
                </div>
            );
        }
        else{
            return (
                <div style={{marginTop: '8px',width: '50px'}}>
                    <img id="checkimg" src="white-position.png" alt="tick" />
                </div>
            ); 
        }
    }
    
    renderRewards(){
       
        if(this.props.leader.rewards){
            return (
                <div style={{marginTop: '8px',width: '50px'}}>
                    <img id="checkimg" src=" rewards-partner.png" alt="tick" />
                </div>
            );
        }
        else{
            return (
                <div style={{marginTop: '8px',width: '50px'}}>
                    <img id="checkimg" src="white-position.png" alt="tick" />
                </div>
            ); 
        }
    }
    
    leadurl(){
        for(var i = 0; i < this.organisations().length; i++){
            console.log("url is :",this.organisations()[i].logo);
            array.push((this.organisations()[i].logo));
        }
        return array;
    }

    /*** checking the organisation is champion ***/

    renderChampion(){
        if(this.props.leader.stars){
            return (
                <div style={{marginTop: '8px'}}>
                    <img className="favimg" src="favorite.png" alt="star" />
                </div>
            )
        }
    }

    /*** modifying the border by the star and validated ***/

    renderBorder(){

        var status = this.props.leader.authstatus;
        if(status == "champ"){
            return(
                "bac-img-gre"
            )
        }else if(status == "valid"){
            return(
                "bac-img-blu"
            )
        }else {
            return(
                "bac-img-bla"
            )
        }  
    }

    /*** modifying the background by the and validated ***/

    renderBackground(){
        var status = this.props.leader.authstatus;
        if(status == "champ"){
            return(
                "bac-img-gre"
            )
        }else if(status == "valid"){
            return(
                "bac-img-blu"
            )
        }else {
            return(
                "bac-img-bla"
            )
        }
    }

    /*** choosing the logo from database ***/

    renderLogo(){
        var url = this.props.leader.url;
        var logoName = url + ".png";
        return(logoName)
    }

    renderLink(){
        var url = this.props.leader.url;
        return(url)
    }

    renderScore(){
        var status = this.props.leader.authstatus;
        if(status == "self"){
            return(<p id="scoreSize">Self Assessed</p>)
        }else{
            return(this.props.leader.scores)
        }
    }

    render() {

        SessionAmplify = _.extend({}, Session, {
            keys: _.object(_.map(amplify.store(), function(value, key) {
                return [key, JSON.stringify(value)]
            })),
            set: function (key, value) {
                Session.set.apply(this, arguments);
                amplify.store(key, value);
            },
        });

        sess = SessionAmplify.get('userOrgId');

        let res = this.organisations();
        if(!res){
            <div style={{width:'100px', margin:'auto'}}><Loading type='bubbles' color='#8AC440' margin='0 auto' /></div>
        }

        /*** Checks whether the admins have publishes the organisation (sets checkstate to true) ***/

        if(this.props.leader.checkstate){
          var checkLogo =
                  <img style={{marginTop: '-20px', maxHeight: '79px', maxWidth: '79px', float:'left'}} id="renderLogo" src={this.props.leader.logo}  /> 
            
          var checkrest = <div className="col-md-10" id="checkrest">
              <div className={this.renderBorder()}>
                  <a href={this.renderLink()} target="_blank">
                      <div className="row" id="renderRow" style={{textAlign: 'inherit'}}>
                          <div className="col-md-2" id={this.renderBackground()}>
                              <h5 style={{margin: '0 auto', marginTop: '3px'}}>{this.renderScore()}</h5>
                          </div>
                          <div className="col-md-3" style={{maxWidth: '350px', textAlign:'left'}}>
                              <h4>{this.props.leader.name}</h4>
                          </div>
                          <div className="col-md-1 " id="renderValid" style={{maxWidth: '50px'}}>
                              {this.renderValidated()}
                          </div>
                          <div className="col-md-2 " id="renderChamp" style={{maxWidth: '110px'}}>
                              {this.renderChampion()}
                          </div>
                          <div className="col-md-2 " style={{maxWidth: '80px'}}>
                              {this.renderRewards()}
                          </div>
                          
                          <div className="col-md-3" id="lea-loc-ind">
                              <div className="row">
                                  <div className="col-md-1 lea" >
                                      <img src="placeholder1.png" alt="location" />
                                  </div>
                                  <div className="col-md-10 lea">
                                      <p>{this.props.leader.address.city}</p>
                                  </div>
                              </div>
                              <div className="row">
                                  <div className="col-md-1 lea" >
                                      <img src="suitcase.png" alt="location" />
                                  </div>
                                  <div className="col-md-10 lea">
                                      <p>{this.props.leader.industry}</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </a>
              </div>
          </div>;
        }
        return (
            <div className="row" id="organisationdRow">
                <div className="row">
                    <div style={{textAlign: 'center', width: '80px', position: 'absolute'}}>
                    {checkLogo}
                    </div>          
                    {checkrest}
                </div><br />
            </div>
        )
    }
}
