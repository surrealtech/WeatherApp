const form = document.querySelector("form")
const search = document.querySelector("input")

const label = document.querySelector(".label")
const val = document.querySelectorAll(".val")
const img = document.querySelector("#img")
const loader = document.querySelector(".loader")

const temp = document.querySelector("#temp")
const forecast = document.querySelector("#forecast")
const loc = document.querySelector("#loc")
const dateDiv = document.querySelector("#date")

const feels = document.querySelector("#feels")
const humidity = document.querySelector("#humidity")
const pressure = document.querySelector("#pressure")
const uv = document.querySelector("#uv")
const dewpoint = document.querySelector("#dewpoint")
const windspeed = document.querySelector("#windspeed")
const visibility = document.querySelector("#visibility")
const clouds = document.querySelector("#clouds")

let date
let time

const getDate = ()=>{
    let today = new Date()

    let dateToday, month
    dateToday = today.getDate()
    month = (today.getMonth()+1)

    if(dateToday < 10){dateToday = '0' + dateToday}
    if(month < 10){month = '0' + month}

    date = dateToday +'-'+ month +'-'+today.getFullYear()

    let hrs, min
    hrs = today.getHours()
    min = today.getMinutes() 

    if(min < 10){min = '0' + min}

    if(hrs < 12)
    {
        if(hrs < 10){hrs = '0' + hrs}
        time =  hrs + ":" + min + ' am'
    }
    else if(hrs > 12)
    {
        hrs = hrs - 12
        if(hrs < 10){hrs = '0' + hrs}
        time =  hrs + ":" + min + ' pm'
    }
    else
    {
        time =  hrs + ":" + min + ' pm'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    loader.style.display = 'block'
    dateDiv.innerHTML = ''
    temp.innerHTML = ''
    forecast.innerHTML = 'Loading...'
    loc.innerHTML = ''
    img.src = 'images/cloud.svg'

    for(let i = 0; i < val.length; i++)
    {
        val[i].innerHTML = 'loading...'
    }

    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                loader.style.display = 'none'
                img.src = 'images/error.svg'
                dateDiv.innerHTML = ''
                temp.innerHTML = 'Error'
                forecast.innerHTML = data.error
                loc.innerHTML = ''

                for(let i = 0; i < val.length; i++)
                {
                    val[i].innerHTML = 'unavailable'
                }

            }
            else{

                getDate()

                loader.style.display = 'none'
                dateDiv.innerHTML = time + ', ' + date
                temp.innerHTML = Math.round(data.temp) + '&degC'
                forecast.innerHTML = data.forecast 
                loc.innerHTML = data.location
                feels.innerHTML = Math.round(data.feels) + '&degC'
                humidity.innerHTML = data.humidity + '%'
                pressure.innerHTML = data.pressure + ' Pa'
                uv.innerHTML = data.uv
                dewpoint.innerHTML = data.dewpoint + '&degC'
                windspeed.innerHTML = data.windspeed +' mph'
                visibility.innerHTML = data.visibility
                clouds.innerHTML = data.clouds + '%'

                label.visibility = true
                
                if(data.forecast == 'Thunderstorm'){
                    img.src = 'images/stormy.svg'
                }
                else if(data.forecast == 'Rain'){
                    img.src = 'images/rain.svg'
                }
                else if(data.forecast == 'Drizzle'){
                    img.src = 'images/lightrain.svg'
                }
                else if(data.forecast == 'Snow'){
                    img.src = 'images/snow.svg'
                }
                else if(data.forecast == 'Clear'){
                    img.src = 'images/sunny.svg'
                }
                else if(data.forecast == 'Clouds'){
                    img.src = 'images/cloud2.svg'
                }
                else if(data.forecast == 'Mist'){
                    img.src = 'images/mist.svg'
                }
                else if(data.forecast == 'Smoke'){
                    img.src = 'images/smoke.svg'
                }
                else if(data.forecast == 'Haze'){
                    img.src = 'images/haze.svg'
                }
                else if(data.forecast == 'Dust'){
                    img.src = 'images/dust.svg'
                }
                else if(data.forecast == 'Sand'){
                    img.src = 'images/sand.svg'
                }
                else if(data.forecast == 'Tornado'){
                    img.src = 'images/tornado.svg'
                }
                else if(data.forecast == 'Ash'){
                    img.src = 'images/ash.svg'
                }
                else if(data.forecast == 'Squall'){
                    img.src = 'images/squall.svg'
                }
                else if(data.forecast == 'Fog'){
                    img.src = 'images/fog.svg'
                }
                else{
                    img.src = 'images/cloud.svg'
                }
            }
        })
    })

})