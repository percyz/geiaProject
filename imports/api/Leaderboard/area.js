import { Mongo } from 'meteor/mongo';

export const Area = new Mongo.Collection('area');
if(Meteor.isServer){
    Meteor.publish("publishArea", function(){
    return Area.find();
    })
};