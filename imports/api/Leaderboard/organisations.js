import { Mongo } from 'meteor/mongo';


export const Organisations = new Mongo.Collection('organisations');

if (Meteor.isServer) {
   
   Organisations.rawCollection().createIndex({ "rank": 1, "scores": 1 });
   //console.log("raw is :", Organisations.rawCollection());

   Meteor.publish("publishOrg-RegisterOrg", function () {
       console.log("regorg called");
       return Organisations.find();
       //return Organisations.find({},{ sort: {rank: 1,scores: 1}});
   });

   Meteor.publish("publishOrg-AssesEntry", function () {
       return Organisations.find();
       //return Organisations.find({},{ sort: {rank: 1,scores: 1}});
   });

   Meteor.publish("publishOrg-Leaderboard", function () {
       console.log("lead is called");
       return Organisations.find({"checkstate": true},{
           sort: { rank: 1, scores: 1 },
           fields: {
               "_id": 1, "name": 1, "address.street": 1, "address.town": 1, "address.city": 1, "address.region": 1,
               "address.country": 1, "scores": 1, "newScores": 1, "stars": 1, "industry": 1, "url": 1, "validated": 1,
               "currentState": 1, "authstatus": 1, "rank": 1, "rewards": 1, "checkstate": 1, "logo": 1
           }
           
       });
       //return Organisations.find();
   });


   Meteor.publish("publishOrg-LeaderboardC", function () {
       //return Organisations.find();
       console.log("c is called");
       return Organisations.find({"checkstate": true},{
           sort: { rank: 1, scores: 1 },
           fields: {
               "_id": 1, "name": 1, "address.street": 1, "address.town": 1, "address.city": 1, "address.region": 1,
               "address.country": 1, "scores": 1, "newScores": 1, "stars": 1, "industry": 1, "url": 1, "validated": 1,
               "currentState": 1, "authstatus": 1, "rank": 1, "rewards": 1, "checkstate": 1, "logo": 1
           }
       });
       //return Organisations.find({},{ sort: {rank: 1,scores: 1}});
       //return Organisations.find({}, { sort: {rank: 1}})
       //return Organisations.find({},{ sort: {rank: 1,scores: 1}});
   });

   Meteor.publish("publishOrg-LeaderboardD", function () {
       //return Organisations.find();
       console.log("D is called");
       return Organisations.find({"checkstate": true},{
           sort: { rank: 1, scores: 1 },
           fields: {
               "_id": 1, "name": 1, "address.street": 1, "address.town": 1, "address.city": 1, "address.region": 1,
               "address.country": 1, "scores": 1, "newScores": 1, "stars": 1, "industry": 1, "url": 1, "validated": 1,
               "currentState": 1, "authstatus": 1, "rank": 1, "rewards": 1, "checkstate": 1, "logo": 1
           }
       });
   });

   Meteor.publish("publishOrg-SearchBoox", function () {
       console.log("search is called");
       return Organisations.find({"checkstate": true},{
           sort: { rank: 1, scores: 1 },
           fields: {
               "_id": 1, "name": 1, "address.street": 1, "address.town": 1, "address.city": 1, "address.region": 1,
               "address.country": 1, "scores": 1, "newScores": 1, "stars": 1, "industry": 1, "url": 1, "validated": 1,
               "currentState": 1, "authstatus": 1, "rank": 1, "rewards": 1, "checkstate": 1, "logo": 1
           }
       });
       //return Organisations.find();
       //return Organisations.find({}, { sort: { checkstate: true, rank: 1, scores: 1 } });
   });

   Meteor.publish("publishOrg-ProfileContent", function () {
       console.log("profile called");
       return Organisations.find();
       //return Organisations.find({},{ sort: {rank: 1,scores: 1}});
   });

   Meteor.publish("publishOrg-AssCO2", function (sess) {
       //console.log("sess is: ",Organisations.findOne({_id: sess})._id);
       console.log("sess is :", sess);
       //return Organisations.find({_id: {$in: [sess]}});
       return Organisations.find({ _id: sess });
       //return Organisations.find();
   });


};