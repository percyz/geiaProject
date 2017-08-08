import { browserHistory, Router, Route, Link, withRouter } from 'react-router';

import React from 'react';
import {mount} from 'react-mounter';
import {MainLayout} from '../ui/containers/MainLayout.jsx';


//import {rootRoute} from '../startup/client/app.jsx';
import Home from '../ui/pages/Home.jsx';

import Contact from '../ui/pages/ContactUs.jsx';
import About from '../ui/pages/About.jsx';
import Faqs from '../ui/pages/Faqs.jsx';
import Rewards from '../ui/pages/Rewards.jsx';
import Giveback from '../ui/pages/Giveback.jsx';
import Sustain from '../ui/pages/Sustain.jsx';
import Leaderboard from '../ui/pages/Leaderboard.jsx';
import Profiles from '../ui/pages/Profiles.jsx';
import ChangePassword from '../ui/components/Header/ChangePassword.jsx';
import Terms from '../ui/pages/Terms.jsx';

/*** Register pages ***/
import Register from '../ui/pages/Register.jsx';
import RegisterOrg from '../ui/pages/RegisterOrg.jsx';
import EditOrg from '../ui/pages/EditOrg.jsx';
import EditUser from '../ui/pages/EditUser.jsx';
//import Dashboard from '../ui/pages/Registers/Dashboard.jsx';
import VerifyEmail from '../ui/pages/Registers/VarifyEmail.jsx';
import Qr from '../ui/pages/Registers/Qr.jsx';
import BusinessDetails from '../ui/pages/Registers/BusinessDetails.jsx';
import ListingStatus from '../ui/pages/Registers/ListingStatus.jsx';
import AssesmentEntry from '../ui/pages/Registers/AssesmentEntry.jsx';
import Championprogram from '../ui/pages/Registers/Championprogram.jsx';
import Dashuser from '../ui/pages/Registers/Dashuser.jsx';
import Dashorg from '../ui/pages/Registers/Dashorg.jsx';

/** Admin pages **/
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import '../ui/pages/admin.js';
import '../ui/pages/geia.js';
import '../ui/pages/admin/users.js';
import '../ui/pages/admin/list.js';


/*** Assesment pages ***/
import AssInstruction from '../ui/pages/Assesment/AssInstruction.jsx';
import AssCO2 from '../ui/pages/Assesment/AssCO2.jsx';



if(Meteor.isClient){
Accounts.onLogin(function(){
FlowRouter.go('/dashuser');
});

Accounts.onLogout(function (){
FlowRouter.go('/')
});
}

/** Start of admin **/

var adminRoutes = FlowRouter.group({
prefix: '/admin',
name: 'admin'
});

adminRoutes.route('/', {
action: function() {
BlazeLayout.render('Admin', {
main: 'Admin',
links: "Links",
logo: "BetaLogo"
});
}
});

adminRoutes.route('/users', {
action: function() {
BlazeLayout.render('Users', {
main: 'Users',
links: "Links",
logo: "BetaLogo"
});
}
});

adminRoutes.route('/list', {
action: function() {
BlazeLayout.render('List', {
main: 'List',
links: "Links",
logo: "BetaLogo"
});
}
});

/** End of admin **/

FlowRouter.route('/', {
action(){
mount(MainLayout, {
content: (<Home />)
})
}
});


FlowRouter.route('/Terms', {
action(){
mount(MainLayout, {
content: (<Terms />)
})
}
});


FlowRouter.route('/About', {
action(){
mount(MainLayout, {
content: (<About />)
})
}
});

FlowRouter.route('/Leaderboard', {
action(){
mount(MainLayout, {
content: (<Leaderboard />)
})
}
});

FlowRouter.route('/Contact', {
action(){
mount(MainLayout, {
content: (<Contact />)
})
}
});

FlowRouter.route('/Faqs', {
action(){
mount(MainLayout, {
content: (<Faqs />)
})
}
});

FlowRouter.route('/Rewards', {
action(){
mount(MainLayout, {
content: (<Rewards />)
})
}
});

FlowRouter.route('/Giveback', {
action(){
mount(MainLayout, {
content: (<Giveback />)
})
}
});

FlowRouter.route('/Sustain', {
action(){
mount(MainLayout, {
content: (<Sustain />)
})
}
});

FlowRouter.route('/RegisterOrg', {
action(){
mount(MainLayout, {
content: (<RegisterOrg />)
})
}
});

FlowRouter.route('/EditOrg', {
action(){
mount(MainLayout, {
content: (<EditOrg />)
})
}
});

FlowRouter.route('/EditUser', {
action(){
mount(MainLayout, {
content: (<EditUser />)
})
}
});

FlowRouter.route('/Dashuser', {
action(){
mount(MainLayout, {
content: (<Dashuser />)
})
}
});
    
    FlowRouter.route('/Dashorg', {
action(){
mount(MainLayout, {
content: (<Dashorg />)
})
}
});

FlowRouter.route('/VerifyEmail', {
action(){
mount(MainLayout, {
content: (<VerifyEmail />)
      })
}
});

FlowRouter.route('/BusinessDetails', {
action(){
mount(MainLayout, {
    content: (<BusinessDetails />)
              })
}
      });

FlowRouter.route('/Championprogram', {
    action(){
        mount(MainLayout, {
            content: (<Championprogram />)
                      })
        }
              });

        FlowRouter.route('/ListingStatus', {
            action(){
                mount(MainLayout, {
                    content: (<ListingStatus />)
})
                }
                      });

                FlowRouter.route('/AssesmentEntry', {
                    action(){
mount(MainLayout, {
content: (<AssesmentEntry />)
})
}
});

FlowRouter.route('/AssInstruction', {
action(){
mount(MainLayout, {
content: (<AssInstruction />)
})
}
});
    
    FlowRouter.route('/Qr', {
action(){
mount(MainLayout, {
content: (<Qr />)
})
}
});

FlowRouter.route('/AssCO2', {
action(){
mount(MainLayout, {
content: (<AssCO2 />)
})
}
});

FlowRouter.route('/:url', {
action(params){
mount(MainLayout, {
content: (<Profiles url={params.url} />)
})
}
});