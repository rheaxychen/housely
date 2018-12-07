import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth'; 
import 'firebase/database';

var config = {
  apiKey: "AIzaSyDh7UDrRrxTskLhBLCw5OSxNuoAnl8PWVs",
  authDomain: "info340-au18-housely.firebaseapp.com",
  databaseURL: "https://info340-au18-housely.firebaseio.com",
  projectId: "info340-au18-housely",
  storageBucket: "info340-au18-housely.appspot.com",
  messagingSenderId: "689607535216"
};
firebase.initializeApp(config);

ReactDOM.render(<BrowserRouter basename={process.env.PUBLIC_URL}><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
