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
document.getElementById("user_name").innerHTML = "Welcome" + username +"!";

function enter_room(){
      roomname=document.getElementById("room_name").value;
      firebase.database().ref("/").child(roomname).update({
            purpose:"adding room name"
      });
      localStorage.setItem("roomname",roomname);
      window.location="kwitter_page.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      console.log("room names-"+ Room_names);
      row ="<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#"+ Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row; 
      //End code
      });
});
}
getData();

function redirectToRoomName(name){
      console.log(name);
      localStorage.setItem("roomname",name);
      window.location="kwitter_page.html";
}

function logout(){
      localStorage.removeItem("username");
      localStorage.removeItem("roomname");
      window.location="index.html";
}