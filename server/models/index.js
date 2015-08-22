var db = require('../db');



module.exports = {
  messages: {
    get: function () {   //when server has GET it executes this
      db.createConnection(); // connect to db
      db.connect();
      var allMessages = db.query('SELECT * FROM messages LEFT JOIN (users, rooms) ON (messages.user_id = users.id AND messages.room_id = rooms.id);', done)                  //query contains join that calls module.users; module.rooms
      console.log('allMessages (line 12): ', allMessages); //send mysql command



      return allMessages     //returns an array of results

    }, // a function which produces all the messages
    post: function (messageObject) {
                //when server has POST it excutes this
        db.createConnection(); //connect to DB
        db.connect();
        var userInfo = db.query('SELECT * FROM users WHERE username = ' + messageObject.username+';', done)        //query into message
        if(userInfo == null){
          db.query('INSERT INTO users (username) VALUES ('+ messageObject.username +');', done)
        userInfo = db.query('SELECT * FROM users WHERE username = ' + messageObject.username+';', done)        //query into message
        }
        console.log('userInfo(line28): ',userInfo)
        var roomInfo  = db.query('SELECT * FROM rooms WHERE roomname = '+ messageObject.roomname+';', done)       //look in the users database
         if(roomInfo == null){
           db.query('INSERT INTO rooms (roomname) VALUES ('+ messageObject.roomname +');', done)
         roomInfo  = db.query('SELECT * FROM rooms WHERE roomname = '+ messageObject.roomname+';', done)       //look in the users database
         }
         console.log('roominfo (line34): ',roomInfo)
         var roomInfoID = roomInfo.id //in stream format ???
         var userInfoID = userInfo.id // in stream format ???

         db.query('INSERT INTO messages (text, created_at, user_id, room_id) VALUES ('+ messageObject.text +','+ new Date()+','+ userInfoID+','+roomInfoID+');', done)


    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {   //when server has GET it executes this
      db.createConnection(); // connect to db
      db.connect();
      var allUsers = db.query('SELECT * FROM users;', done)                  //query contains join that calls module.users; module.rooms
      console.log('allUsers: ', allUsers);
     return allUsers;
    },
    post: function () {}
    //refactor after message implementation success! :)
  },

  rooms: {

    get: function(){
      db.createConnection(); // connect to db
      db.connect();
      var allRooms = db.query('SELECT * FROM rooms;', done)                  //query contains join that calls module.users; module.rooms
      console.log('allRooms :', allRooms);
     return allRooms;
    },
    post: function(){
      //refactor after messages
    }
  }

};

