var db = require('../db');
var Promise = require('bluebird');




module.exports = {
  messages: {
    get: function () {   //when server has GET it executes thi // c
      console.log('models.messages is getting called');
      var queryFunction = function(){
        db.connection.query('SELECT * FROM messages LEFT JOIN (users, rooms) ON (messages.user_id = users.id AND messages.room_id = rooms.id);', function(err, rows, fields){
          if(err) throw err;
          return rows;
      })
      }

       var doQuery = Promise.promisify(queryFunction);

       doQuery.call(queryFunction).then(function(rows){
                console.log ("promised rows", rows);
                //return rows;
              } );

       //return messages;


    },
    post: function (messageObject) {
                //when server has POST it excutes this //connect to DB

        var userInfo = db.query('SELECT * FROM users WHERE username = ' + messageObject.username+';')        //query into message
        if(userInfo == null){
          db.query('INSERT INTO users (username) VALUES ('+ messageObject.username +');')
        userInfo = db.query('SELECT * FROM users WHERE username = ' + messageObject.username+';')        //query into message
        }
        console.log('userInfo(line28): ',userInfo)
        var roomInfo  = db.query('SELECT * FROM rooms WHERE roomname = '+ messageObject.roomname+';')       //look in the users database
         if(roomInfo == null){
           db.query('INSERT INTO rooms (roomname) VALUES ('+ messageObject.roomname +');', done)
         roomInfo  = db.query('SELECT * FROM rooms WHERE roomname = '+ messageObject.roomname+';')       //look in the users database
         }
         console.log('roominfo (line34): ',roomInfo)
         var roomInfoID = roomInfo.id //in stream format ???
         var userInfoID = userInfo.id // in stream format ???

         db.query('INSERT INTO messages (text, created_at, user_id, room_id) VALUES ('+ messageObject.text +','+ new Date()+','+ userInfoID+','+roomInfoID+');')


    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {   //when server has GET it executes this// connect to db
      var allUsers = db.query('SELECT * FROM users;')                  //query contains join that calls module.users; module.rooms
      console.log('allUsers: ', allUsers);
     return allUsers;
    },
    post: function () {}
    //refactor after message implementation success! :)
  },

  rooms: {

    get: function(){ // connect to db
      var allRooms = db.query('SELECT * FROM rooms;')                  //query contains join that calls module.users; module.rooms
      console.log('allRooms :', allRooms);
     return allRooms;
    },
    post: function(){
      //refactor after messages
    }
  }

};

