
// Initailize Firebase
import * as firebase from 'firebase';

// 2. This code loads the IFrame Player API code asynchronously.
//var tag = document.createElement('script');


const config = {
    apiKey: "AIzaSyBHvYqbcGu2MWc3NiIhsoEejfEKMo2rzl0",
    authDomain: "noteworthy-a7cc3.firebaseapp.com",
    databaseURL: "https://noteworthy-a7cc3.firebaseio.com",
    projectId: "noteworthy-a7cc3",
    storageBucket: "noteworthy-a7cc3.appspot.com",
    messagingSenderId: "501950428377",
};
var app = firebase.initializeApp(config);
console.log("Firebase! "+firebase)

// Global variables
// Holds { filename: name, date: date, id: id }
let files = [];

function allocateFiles(filesObj) {
  keys = Object.keys(filesObj);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let file = filesObj[key];
    if ("metadata" in file) {
      files.push({
        "filename": file["metadata"]["name"],
        "date": file["metadata"]["date"],
        "id": key,
      });
    }
  }
}
function initializeFiles() {
  var filesWrapper = document.getElementById("filesWrapper");
  filesWrapper.innerHTML = "";  // Clears inner html
  for (var i = 0; i < files.length; i++) {
    let file = files[i];
    var newFileDiv = document.createElement("div");
    newFileDiv.innerHTML = "DOC " + file["filename"] + " " + file["date"];
    filesWrapper.append(newFileDiv);
  }
}



(function() {
    const dbRefObject = firebase.database().ref()
    dbRefObject.on('value', data => {
        obj = data.val();
        console.log(obj);
        allocateFiles(obj);
        //initializeFiles();
    });
}());


export default files;