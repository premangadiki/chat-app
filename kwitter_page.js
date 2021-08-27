var firebaseConfig = {
      apiKey: "AIzaSyABKJ5uYBcLTcWO4mbsn5ov76QJ2B0RB98",
      authDomain: "kwitter-27168.firebaseapp.com",
      databaseURL: "https://kwitter-27168-default-rtdb.firebaseio.com",
      projectId: "kwitter-27168",
      storageBucket: "kwitter-27168.appspot.com",
      messagingSenderId: "259860030536",
      appId: "1:259860030536:web:b23eee9e4a5d40e1c7e47d"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    username=localStorage.getItem("username");
    room_name=localStorage.getItem("roomname");

    function send(){
          msg=document.getElementById("msg").value;
          firebase.database().ref(room_name).push({
                name:username,
                message:msg,
                like:0
          });
          document.getElementById("msg").value ="";
    }

    function logout(){
      localStorage.removeItem("username");
      localStorage.removeItem("roomname");
      window.location="index.html";
    }

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;

         console.log(firebase_message_id);
         console.log(message_data);
         name = message_data['name'];
         message = message_data['message'];
         like = message_data['like'];
         name_with_tag="<h4>" + name + "<img src='tick.png' class='user_tick'></h4>";
         message_with_tag="<h4 class='message_h4'>" + message + "</h4>" ;
         like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='update_like(this.id)'>";
         span_with_tag="<span class='glyphicon glyphicon-thumbs-up'> like:" +like+"</span></button><hr>";

         row=name_with_tag + message_with_tag + like_button + span_with_tag;
         document.getElementById("output").innerHTML += row;


//End code
      } });  }); }
getData();

function update_like(message_id)
{
      console.log("clicked on the like buttom -" + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) +1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like:updated_likes
      });
}
