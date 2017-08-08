import React from 'react';
import { Link } from 'react-router';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Organisations } from  '../../../api/Leaderboard/organisations.js'
import OrganisationItem from './OrganisationItem.jsx';
import Pager from './Pager.jsx';

/*** The maximum number of items on each page ***/
const MAXINUMBER = 25;

export default class OrganisationList extends TrackerReact(React.Component) {

  constructor(props,) {
        super(props);
        this.handlePageChanged = this.handlePageChanged.bind(this);
        this.state = {
            total:       9,
            current:     0,
            visiblePage: 2,
            subscription:{
                publishOrganisations: Meteor.subscribe("publishOrg-LeaderboardC")
            }
        };
    }

    handlePageChanged(newPage){
        this.setState({ current : newPage });
    }

    organisations() {
      idList = Session.get('searchResults');
      if (Session.get('searchResults') != null){
          return Organisations.find({_id: {$in:idList}},{sort:{rank:1,scores:1}}).fetch();
      }
      else{
          return Organisations.find({},{sort:{rank:1, scores:1}}).fetch();
      }
  }

  displayLeaders(i, n, t, d) {

      var items = [];

      /*** Find how many items are left ***/
      var leftover = t%d;
      if (leftover == 0){

          /*** Find how many pages ***/
          leftover = d;
      }

      console.log("current page!!!", i);
      console.log("pageNum!!!", n);
      console.log("itemNum!!!", t);
      console.log("displayNum!!", d);
      console.log("leftover!!!", leftover);

        if (i == n - 1) {
            /*** display the last page ***/
            for (var j = 0; j < leftover; j++) {
                items.push(<ul><OrganisationItem key={this.organisations()._id} leader={this.organisations()[t-leftover+j]} /></ul>);
            }
            return(
                <div>
                    {items}
                </div>
            )
        }
        else{
            for (var j = i*d; j < i*d+d; j++) {
               items.push(<ul><OrganisationItem key={this.organisations()._id} leader={this.organisations()[j]} /></ul>);
            }

            return(
            <div>
                {items}
            </div>
            );
        }
    }

  currentPage(cur) {
                displayNum = MAXINUMBER;
                itemNum = Math.ceil(this.organisations().length);
			    pageNum = Math.ceil((this.organisations().length)/displayNum);
				return (
				<div>
                    {this.displayLeaders(cur, pageNum, itemNum, displayNum)}
                </div>
			);

    }

  /** Finished **/

  render() {

    let res = this.organisations();

    if(res.length < 1) {
        return (
            <div>
                <h3>Sorry, we couldn't find anything. Maybe try taking the following steps..</h3>
                <li>Change or remove filters such as classification to broaden your search.</li>
                <li>If searching organisation's name, check the spelling.</li>
            </div>
        )
    }

    if (Session.get('searchIntial')){
        this.state.current = 0;
        Session.set('searchIntial', false);
    }

  /*** Handle ***/

        const handle = Meteor.subscribe('publishOrg-SearchBoox');
        Tracker.autorun(() => {
          const isReady = handle.ready();
          console.log(`Handle is ${isReady ? 'ready' : 'not ready'}`);
          if(isReady){
              console.log("is ready fam!");
              return Organisations.find({},{ sort: {rank: 1,scores: 1}});
          }
        });

  /*** end of handle ***/

    return (

        <div>
        {/*This is declaration*/}
        <div className="row">
            <div className="col-md-1" id="rank">
            </div>
            <div className="col-md-1" id="orgs" style={{textAlign : 'left'}}>
                <p>Organisations</p>
            </div>
            <div className="col-md-9" id="topnav" style={{marginLeft: '40px'}}>

                <div className="sepimg" data-toggle="tooltip" data-placement="top" title="This listing has been checked and verified by Geia">
                <div className="col-md-1" >
                    <img src="checked.png" />
                </div>
                <div className="col-md-2">
                    <p>Validated</p>
                </div>
                </div>
                           
                <div className="sepimg" data-toggle="tooltip" data-placement="top" title="Geia's rewards partner">
                <div className="col-md-1" >
                    <img src="rewards-partner.png" />
                </div>
                <div className="col-md-2" >
                    <p>Rewards</p>
                </div>
                </div>
                
                <div className="sepimg" data-toggle="tooltip" data-placement="top" title="Working with an approved sustainability consultant, Has been Validated, and set improvement goals to be achieved within this year. 1 Star = Commitment made 2 stars = Commitment achieved 3 stars Commitment exceeded">
                <div className="col-md-1">
                    <img src="favorite.png" />
                </div>
                <div className="col-md-2">
                    <p>Champion</p>
                </div>
                </div>

                <div className="sepimg">
                <div className="col-md-1">
                    <img src="placeholder1.png" />
                </div>
                <div className="col-md-2">
                    <p>Location</p>
                </div>
                </div>
                <div className="sepimg">
                <div className="col-md-1">
                    <img src="suitcase.png" />
                </div>
                <div className="col-md-1">
                    <p >Industry</p>
                </div>
                </div>
            </div>
            <div className="col-md-2">
            </div>
            </div><br />
            <div>
            {this.currentPage(this.state.current)}
            </div>

            <div style={{textAlign: 'center', margin: '0 auto', position: 'relative', width: '300px', overflow: 'hidden'}}>
                <Pager
                    total={Math.ceil((this.organisations().length)/MAXINUMBER)}
                    current={this.state.current}
                    visiblePages={this.state.visiblePage}
                    titles={{ first: '<<', last: '>>' }}
                    onPageChanged={this.handlePageChanged}
                />
            </div>
        </div>

    );
  }
}
