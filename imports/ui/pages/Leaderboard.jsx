import React from 'react';
import Loading from 'react-loading';
import { Link } from 'react-router';
import AboutNav from '../components/Header/AboutNav.jsx';
import SearchBox from '../components/Leaderboard/SearchBox.jsx';
import OrganisationList from '../components/Leaderboard/OrganisationList.jsx';
import { Organisations } from '../../api/Leaderboard/organisations.js';
import { Regions } from '../../api/Leaderboard/regions.js';
import { Industries } from  '../../api/Leaderboard/industries.js'


export default class Leaderboard extends React.Component {

    /********************************************
     Load the organisations collection
     ********************************************/

    organisations(){
        return Organisations.find().fetch();
    }

    /********************************************
     Load city&region from leader collection
     ********************************************/

    regions(){
        return Regions.find().fetch();
    }

    /********************************************
     Load industry collection
     ********************************************/

    industries(){
        return Industries.find().fetch();
    }

    constructor(props,) {
        super(props);
        subscription:{
            publishIndustries: Meteor.subscribe("publishIndustries");
            publishRegions: Meteor.subscribe("publishRegions");
            publishOrgSearchBoox: Meteor.subscribe("publishOrg-Leaderboard")
        };
    }


    render(){

        return (
            <div className="Leaderboard">

                {/* The navigation bar */}

                <AboutNav />

                <div className="container" style={{marginTop: '10px'}}>

                    {/* The search box{this.Filters()} */}

                    <div>
                    <p style={{textAlign: 'center'}}>Here you can view organisations on their journey to sustainability, in order of
                    their <a href="https://www.geia.nz/rewards" target="_blank">GEIA-Score</a>. Click on any listing to view more information. </p>

                        <SearchBox />
                    </div>
                    <hr />

                    {/* The leaderboard contents */}

                    <div>
                        <OrganisationList />
                    </div>
                    <br />

                </div>
            </div>
        );
    }
}
