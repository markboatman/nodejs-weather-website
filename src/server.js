// version features:  
// installed npm -i hbs, handbars module that extends express functionality
// telling app what the view engine is, i.e. handlebars
// telling the app where the template dir is for hbs templates is

// core modules
const path = require('path');
// npm modules
const express = require('express');

// create an express app, or server
const app = express();

// define paths for express config
const veiwsPath = path.join(__dirname, '../templates');
const publicPath = path.join(__dirname, '../public');
//
// set up integration of hbs with our express server
app.set('view engine', 'hbs');
// tell app where the views dir is
app.set('views', veiwsPath);
// set up static directory for other for static html
app.use(express.static(publicPath));

// this listener for url = app.com, req is reqest, res is response
app.get('', (req, res) => {
    // this is a hbs call under the hood of express
    res.render('index',{
        title: 'Weather App',
        name: 'Mark'
    });
})

app.get('/about', (req, res) => {
    // this is a hbs call under the hood of express
    res.render('about',{
        title: 'This is the hbs about page',
        name: 'Mark'
    });
})

app.get('/help', (req, res) => {
    // this is a hbs call under the hood of express
    res.render('help',{
        title: 'This is the hbs help page',
        name: 'Mark'
    });
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