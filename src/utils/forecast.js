const request = require('request')
const forecast = (lattitude, longitude, callBack)=>{
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lattitude+'&lon='+longitude+'&%20exclude=hourly,daily&appid=0708f1686ab7d8c8604b8c8c2ba43ec4&units=metric'

    request({url, json: true}, (error, {body})=>{


        if(error){
            callBack('Please provide a valid location!', undefined)
        }
        else if(body.message){
            callBack('Please provide a valid location!', undefined)
        }
        else{
            const {current} = body
            callBack(undefined, {
                temp: current.temp,
                forecast: current.weather[0].main,
                feels: current.feels_like,
                humidity: current.humidity,
                pressure: current.pressure,
                uv: current.uvi,
                dewpoint: current.dew_point,
                windspeed: current.wind_speed,
                visibility: current.visibility,
                clouds: current.clouds,
                lat: lattitude,
                lon: longitude
            })
        }

    })
}

module.exports = forecast