import { Mongo } from 'meteor/mongo';

export const Assess = new Mongo.Collection('assess');
if(Meteor.isServer){
    Meteor.publish("publishAssess", function(){
    return Assess.find();
    })
};
