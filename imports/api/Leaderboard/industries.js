import { Mongo } from 'meteor/mongo';

export const Industries = new Mongo.Collection('industries');

if(Meteor.isServer){
    Meteor.publish("publishIndustries", function(){
    return Industries.find();
    })
};