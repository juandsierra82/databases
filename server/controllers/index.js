var models = require('../models');
var bluebird = require('bluebird');
var express = require('express');
var router = express.Router();
var controllerApp = express();

module.exports = {
  messages: {
    get: function (req, res) {
      console.log("controllers.messages - is this getting called?")

         var theResponse = models.messages.get();
         return theResponse;

              //on GET
              //grab all database messages that match room from model
              //parse
              //respond back to client


    }, // a function which handles a get request for all messages
    post: function (req, res) {} // a function which handles posting a message to the database
            //on POST
            //parse data into message object
            //pass message object to messages method on model
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }

  // rooms :{

  //   get: function(req, res) // on page load
  //   {

  //   }
  //   post: function (req, res){

  //   }
  // }
 //possible parser function --!

};

