// will use browser supported fetch api
// will use this browser api http://puzzle.mead.io/puzzle
// console.log('Client side javascript is loaded app.js');

/*
const puzzleUrl = 'http://puzzle.mead.io/puzzle';
// asyncronous call so need callback but must use
// then()
fetch(puzzleUrl).then( (res) => {
    res.json().then( (data) => {
        console.log(data);
    });
});
*/

// my weather data


const weatherForm = document.querySelector('form');
const userLocation = document.querySelector('input');
const docLocation = document.querySelector('#location');
const docWeather = document.querySelector('#weather');

// e is event coming from browser 
weatherForm.addEventListener('submit', (event) => {
    // prevent immediate page refresh
    event.preventDefault();
    const location = userLocation.value
    // console.log(location);
    const weatherUrl = '/weather?location=' + location;
    docLocation.textContent = 'Loading...';
    docWeather.textContent = '';
    fetch(weatherUrl).then((res) => {
        // console.log(res);
        res.json().then((data) => {
            if (data.error) {
                docLocation.textContent = 'Error: ' + data.error;
                docWeather.textContent = '';
            } else {
                docLocation.textContent ='For ' + data.location + '.';
                docWeather.textContent = 'The weather is ' + data.weather 
                    + '. It is ' + data.temperature + ' outside but feels like ' 
                    + data.feelslike + '. The humidity is ' + data.humidity + ' percent.';
            }
        });
    });

});