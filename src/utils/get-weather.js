// updates 
// using ES6 destructuring, value extraction and assignment 
// using request api
const request = require('request');

const getWeatherInfo = ( latitude, longitude, cbProcResponse ) => {
    // add &units=f to get farenheight
    console.log('In getWeatherInfo(), latitude is: ' + latitude + ', longitude is: ' + longitude);
    const url = 'http://api.weatherstack.com/current?access_key=62e071df0c59cee757d8a5d3e83202a6&query=' +
                        latitude + ',' + longitude + '&units=f';
    // use this if you want to get a error in the response
    // const urlWeather = 'http://api.weatherstack.com/current?access_key=62e071df0c59cee757d8a5d3e83202a6&query=&units=f';


    // get request to parse the JSON, i.e. json: true
    request({ url, json: true }, (error, { body } = {}) => {
        if (error !== null) {
            // get this if the wifi is off
            cbProcResponse('Network error trying to access weather server: ' + error.message,
                undefined);
            // else if condition is specific to server
        } else if (body.error !== undefined) {
            cbProcResponse('Error in response from weather server.', undefined);
            // if( body.error.info ) {
            //     console.log('Error info: ' + body.error.info);
            // }
        } else { // everything is okay
            cbProcResponse(undefined, data = {
                location: body.location.name,
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            });
        }
    });
}

module.exports = getWeatherInfo;