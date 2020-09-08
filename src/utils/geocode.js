// updates 
// using ES6 destructuring, value extraction and assignment 
const request = require('request');
// valid  query string for mapbox
// https://api.mapbox.com/geocoding/v5/mapbox.places/Dallas.json?access_token=pk.eyJ1IjoibWFyay1ib2F0bWFuIiwiYSI6ImNrZWZ3NTdmMjE5cWMyeXAzZ2M0MWVzc3UifQ.HtAYfsZGw-wSN46bfJf5wg&item=1
const getGeoCode = (address, cbProcResponse) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + 
            encodeURIComponent(address) + // missing p in the pk.eyJ ....... to cause failure from server
            '.json?access_token=pk.eyJ1IjoibWFyay1ib2F0bWFuIiwiYSI6ImNrZWZ3NTdmMjE5cWMyeXAzZ2M0MWVzc3UifQ.HtAYfsZGw-wSN46bfJf5wg&item=1'
    // making https request to url        
    request({ url, json: true }, (error, { body } = {}) => {
        if (error !== null) {
            cbProcResponse('Network error trying to access goecoding service: ' + error.message, undefined);
            // else if condition is specific to server
            // body.message !== undefined
        } else if ( body.features === undefined ) {  
            let errMsg = 'Invalid query string to geocoding service.';
            if( body.message ) {
                errMsg += ' [' + body.message + ']';
            }
            cbProcResponse( errMsg, undefined);
        } else if ( body.features.length === 0 ) {
            cbProcResponse( 'Weather for [' + address + '] not found', undefined);
        } else { // everything is okay
            // first param might should be null, when error comes back from successful request() it is null
            cbProcResponse( undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    place: body.features[0].place_name
            });         
        }
    });
}
// export a pointer to a function
module.exports = getGeoCode;