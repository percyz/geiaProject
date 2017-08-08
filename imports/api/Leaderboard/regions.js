import { Mongo } from 'meteor/mongo';

export const Regions = new Mongo.Collection('regions');
if(Meteor.isServer){
    Meteor.publish("publishRegions", function(){
    return Regions.find();
    })
};
