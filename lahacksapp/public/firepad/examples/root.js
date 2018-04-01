import * as firebase from 'firebase';

const config = {
  apiKey: "XXXXXXXXXXXX-XXXXXXXXXXX-XX-XXXXXXXXXXX",
  authDomain: "XXXX.firebaseapp.com",
  databaseURL: "https://XXXX.firebaseio.com",
  storageBucket: "XXXX.appspot.com",
};

const fb = firebase
  .initializeApp(config)
  .database()
  .ref();

const App = (props) => {
  console.log('snapshot', props);
  return (
    <div>
      <h1>My Prototype</h1>
      <p>{JSON.stringify(props)}</p>
    </div>
  );
}

fb.on('value', snapshot => {
  const store = snapshot.val();
  ReactDOM.render(
    <App {...store} />,
    document.getElementById('root')
  );
});