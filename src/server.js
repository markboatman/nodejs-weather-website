// version features: added some more urls and responses
const express = require('express');

console.log(__dirname);
console.log(__filename);

// create an express app, or server
const app = express();

// define what the app should do when someone sends a request
// to a specific url
// app.com
// app.com/help
// app.com/about

// this listener for url = app.com, req is reqest, res is response
app.get('', (req, res) => {
    // send html
    res.send('<h1>Weather</h1>');
})

// this listener for url = app.com/help
app.get('/help', (req, res) => {
    // send json, express will stringify it for us
    res.send([{
        name: 'Mark',
        age:  '64'
    },
    {
        name:   'Fred',
        age:    '34'
    }]);
})

// this listener for url = app.com/about
app.get('/about', (req, res) => {
    // send back to requester
    res.send('<h2>About Page</h2>');
})

// this listener for url = app.com/weather
app.get('/weather', (req, res) => {
    // send back to requester
    res.send({
        weather: 'The weather is partly cloudy',
        temperature: 'The temperature is 87',
        location: 'Dallas'
    })
})
// start the app or server, second param is optional callback from 
// startup
app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});