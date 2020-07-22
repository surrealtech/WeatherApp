const express = require('express')
const hbs = require('hbs')
const path = require('path')//not npm
const app = express()
//custom js
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

const publicdir = path.join(__dirname,'../public')

app.use(express.static(publicdir))

app.set('view engine', 'hbs')

app.get('', (req, res) => {
    res.render('index')
})

app.get('/weather', (req, res) => {
    const add = req.query.address
    if(!add){
        return res.send({error: 'Please provide a location!'})
    }
    geocode(add, (error, {lattitude, longitude, location} = {}) => {
        if(error)
        {
           res.send({error})
        }
        else{
    forecast(lattitude, longitude, (error, {temp, forecast, feels, humidity, pressure, uv, dewpoint, windspeed, visibility, clouds}) => {
          if(error){
         res.send({error})
        }
          else {
               res.send({
                   location, 
                   temp,
                   forecast,
                   feels,
                   humidity,
                   pressure,
                   uv,
                   dewpoint,
                   windspeed,
                   visibility,
                   clouds
                })  
          }
      })
     }  
   })
})
app.listen(port, () => {
    console.log('Server is running on port ' + port)
})