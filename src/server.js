// version features: add common page features, i.e. partials
// change nodemon command so it will restart on .js and .hbs file save
// nodemon ./src/server1.3.js -e js,hbs 
// -e is extensions flag

// core modules
const path = require('path');
// npm modules
const express = require('express');
// load in hbs explicitly
const hbs = require('hbs');
// my app modules
const getGeoCode = require('./utils/geocode');
const getWeatherInfo = require('./utils/get-weather');


console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

// create an express app, or server
const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const veiwsPath = path.join(__dirname, '../templates/views');
const publicPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');
//
// set up integration of hbs with our express server
app.set('view engine', 'hbs');
// tell app where the views dir is
app.set('views', veiwsPath);
hbs.registerPartials(partialsPath);
 
// set up express/hbs route handlers / listeners, order is used by express
// express is looking for url matches on the incoming request

// set up static directory for static html
app.use(express.static(publicPath));
// the video is calling this get() calls, setting up an http endpoint (terminology)
// this listener for url = app.com, req is reqest, res is response
app.get('', (req, res) => {
    // this is a hbs call under the hood of express
    res.render('index',{
        title: 'Weather App',
        name: 'Mark Boatman'
    });
})

app.get('/about', (req, res) => {
    // this is a hbs call under the hood of express
    res.render('about',{
        title: 'About',
        name: 'Mark Boatman'
    });
})

app.get('/help', (req, res) => {
    // this is a hbs call under the hood of express
    res.render('help',{
        title: 'Help',
        name: 'Mark Boatman'
    });
})

// this listener for url = root/weather
app.get('/weather', (req, res) => {
    const query = req.query;
    if( !query.location ) { // maybe === undefined
        return res.send({
            error: 'You must provide a city name.'
        });
    } else {
        getGeoCode( query.location, ( error, {latitude, longitude, place} = {}) => {
            if( error != undefined ) {
                return res.send({
                    error: error
                });
            } 
            // else keep going
            // console.log('For the city of: ' + plce + ', latitude is: ' + latitude +
            //     ', longitude is: ' + longitude + '.');
            // NOTE: weatherstack does not agree with the lat and log supplied by mapbox geocoding service
            // so you get the weather for someplace close to the lat and long you pass to getWeatherInfo
            getWeatherInfo(latitude, longitude, ( errorMsg, { location, description, temperature,
                            feelslike } = {} ) => {
                if( errorMsg !== undefined ) {
                    return res.send ({
                        error: 'Unable to get weather data. ' + errorMsg
                    })
                }
                // else keep going
                // should have gotten response
                res.send({
                    location: location,
                    weather: description,
                    temperature: temperature,
                    inputLocation: query.location + 
                        ' - Note: mapbox and weatherstack do not agree on latitude and longitude so inputLocation and location do not match'
                });
            }); // end parameter listing
            // console.log('BUG: The weatherstack and mapbox/geocode servers to not agree on latitude and longitude for a city.');
        })
    } 
    // console.log(query);
})
/*
app.get('/products', ( req, res ) => {
    const query = req.query;
    if( !query.search ) { // maybe === undefined
        res.send({
            error: 'You must provide a search term.'
        });
    } else {
        res.send({
            products: []
        })
    } 
    console.log(query);
})
*/
app.get('/help/*', (req, res) => {
    // this is a hbs call under the hood of express
    res.render('404', {
        title: '404 Error',
        name: 'Mark Boatman',
        errMsg: 'No help article found'
    })
})
// * match everything that has not been matched yet
app.get('*', (req, res) => {
    // this is a hbs call under the hood of express
    res.render('404', { 
        title: '404 Error',
        name: 'Mark Boatman',
        errMsg: 'Page not found' } );
})
// start the app or server, second param is optional callback from 
// startup

app.listen(port, () => {
    console.log('Server is up on port ' port + '.');
});