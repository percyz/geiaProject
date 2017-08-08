import { Mongo } from 'meteor/mongo';

export const Minstaffarea = new Mongo.Collection('minstaffarea');

if(Meteor.isServer){
    Meteor.publish("publishMinstaffarea", function(){
    return Minstaffarea.find();
    })
};
