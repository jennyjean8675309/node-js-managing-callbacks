const prompt  = require('prompt');
// used to get the user's input
const request = require('request');
const async   = require('async');

const WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather?q='
const WEATHER_API_KEY = '88bfde3533d98e8a300a138ef668cda2'

async.waterfall([
    (callback) => {
        prompt.get({
            name: "city",
            description: "Enter city to fetch its current weather"
        }, (error, result) => {
            // this anonymous callback is provided by the prompt library - it gets called after the user inputs something to the command line, and either ends in an error, or in returning the result (the user's input)
            if (error) return callback(error);
            callback(null, result.city)
            // null is the value of the error argument, if there is no error
            // this callback function calls on the next callback in the array, and passes in result.city (the user's input from the prompt) as an argument
        })
    },
    (city, callback) => {
        console.log(`The user entered: ${city}.`)
        const url = WEATHER_API_URL + city + "&APPID=" + WEATHER_API_KEY + "&units=imperial"
        request(url, (error, response, body) => {
            if (error) return callback(error);
            callback(null, city, body)
        })
    }
], (error, city, weather) => {
    if (error) console.error(error);
    console.log(`The weather in ${city} \n ${weather}:`);
})

