// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Initailize Firebase
const config = {
    apiKey: "AIzaSyBHvYqbcGu2MWc3NiIhsoEejfEKMo2rzl0",
    authDomain: "noteworthy-a7cc3.firebaseapp.com",
    databaseURL: "https://noteworthy-a7cc3.firebaseio.com",
    projectId: "noteworthy-a7cc3",
    storageBucket: "noteworthy-a7cc3.appspot.com",
    messagingSenderId: "501950428377",
};
firebase.initializeApp(config);

function getModalContent() {
    const dbRefObject = fireabase.database().ref('/')
    dbRefObject.on('value', data => {
        obj = data.val();
        console.log(obj)

    })
}

(function() {
    const dbRefObject = firebase.database().ref()
    dbRefObject.on('value', data => {
        obj = data.val();
        console.log(obj);
        allocateFiles(obj); 
        initializeFiles();      
    });
}());

function allocateFiles(filesObj) {
    files = [];
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