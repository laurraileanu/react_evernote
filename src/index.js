import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require('firebase')
require('firebase/firestore')

firebase.initializeApp({
  apiKey: "AIzaSyDZshdVfmeJC4FcyIMgzIGVQD6SFN5Bw5c",
  authDomain: "evernote-clone-1823c.firebaseapp.com",
  databaseURL: "https://evernote-clone-1823c.firebaseio.com",
  projectId: "evernote-clone-1823c",
  storageBucket: "evernote-clone-1823c.appspot.com",
  messagingSenderId: "651236721928",
  appId: "1:651236721928:web:e12bb094ad3a0bf55958bd",
  measurementId: "G-D3FDPQGXV4"
});
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
