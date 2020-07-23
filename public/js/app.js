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

let dateToday, hrs, min, time

const getDate = (localtime)=>{
    dateToday = localtime.substring(0, 10)
    hrs = Number(localtime.substring(11, 13))
    min = localtime.substring(14, 16)

    console.log(dateToday)
    console.log(min)

    if(hrs < 12)
    {
        if(hrs == 0){hrs = 12}
        time = hrs + ':' + min + ' am'
    }
    else if(hrs > 12)
    {
        hrs = hrs - 12
        time =  hrs + ":" + min + ' pm'
    }
    else
    {
        time =  hrs + ":" + min + ' pm'
    }

    console.log(hrs)
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

                fetch('https://dev.virtualearth.net/REST/v1/TimeZone/'+ data.lat +','+ data.lon +'?key=Arho4N2s-g5kTYSKvy3GnhAojkM6bCP1ZF4BFD2gdBGNTG4CJDzmKm1lpKgMmi0w').then((response2) => {
                    response2.json().then((data2) => {
                        
                        localtime = data2.resourceSets[0].resources[0].timeZone.convertedTime.localTime

                        getDate(localtime)
                        dateDiv.innerHTML = time + ', ' + dateToday
                        console.log(localtime)

                    })
                
                })

                loader.style.display = 'none'
                temp.innerHTML = Math.round(data.temp) + '&degC'
                forecast.innerHTML = data.forecast 
                loc.innerHTML = data.location
                feels.innerHTML = Math.round(data.feels) + '&degC'
                humidity.innerHTML = data.humidity + '%'
                pressure.innerHTML = data.pressure + ' hPa'
                uv.innerHTML = data.uv + ' mWm<sup>-2</sup>'
                dewpoint.innerHTML = Math.round(data.dewpoint) + '&degC'
                windspeed.innerHTML = (data.windspeed * 1.6).toFixed(2) +' kmh<sup>-1</sup>'
                visibility.innerHTML = data.visibility / 1000 + ' km'
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