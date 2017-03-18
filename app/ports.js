'use strict'
const Elm = require('../build/elm.js');

// get a reference to the div where we will show our UI
const container = document.getElementById('app');

// start the elm app in the container
// and keep a reference for communicating with the app
const app = Elm.Main.embed(container);