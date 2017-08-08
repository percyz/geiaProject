import { Mongo } from 'meteor/mongo';

export const Score = new Mongo.Collection('score');
if(Meteor.isServer){
    Meteor.publish("publishScore", function(){
    return Score.find();
    })
};