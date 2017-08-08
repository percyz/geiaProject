import { Mongo } from 'meteor/mongo';

export const Z = new Mongo.Collection('z');
if(Meteor.isServer){
    Meteor.publish("publishZ", function(){
    return Z.find();
    })
};
