// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');


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

(function() {
    const dbRefObject = firebase.database().ref()
    dbRefObject.on('value', data => {
        obj = data.val();
        console.log(obj);
    });
}());
