const express = require('express');

// create an express app, or server
const app = express();

// define what the app should do when someone sends a request
// to a specific url
// app.com
// app.com/help
// app.com/about

// this listener for url = app.com, req is reqest, res is response
app.get('', (req, res) => {
    // send back to requester
    res.send('Hello express!');
})

// this listener for url = app.com/help
app.get('/help', (req, res) => {
    // send back to requester
    res.send('Help Page');
})

// this listener for url = app.com/about
app.get('/about', (req, res) => {
    // send back to requester
    res.send('About Page');
})

// this listener for url = app.com/weather
app.get('/weather', (req, res) => {
    // send back to requester
    res.send('Weather Page');
})
// start the app or server, second param is optional callback from 
// startup
app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});