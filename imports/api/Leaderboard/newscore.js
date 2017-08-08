import { Mongo } from 'meteor/mongo';

export const Newscore = new Mongo.Collection('newscore');
if(Meteor.isServer){
    Meteor.publish("publishNewscore", function(){
    return Newscore.find();
    })
};