import { Mongo } from 'meteor/mongo';

export const Qr = new Mongo.Collection('qr');
if(Meteor.isServer){
    Meteor.publish("publishQr", function(){
    return Qr.find();
    })
};
