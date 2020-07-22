const form = $("form")
const search = $("input")

const label = $(".label")
const img = $("#img")

const temp = $("#temp")
const forecast = $("#forecast")
const loc = $("#loc")

const feels = $("#feels")
const humidity = $("#humidity")
const pressure = $("#pressure")
const uv = $("#uv")
const dewpoint = $("#dewpoint")
const windspeed = $("#windspeed")
const visibility = $("#visibility")
const clouds = $("#clouds")

form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                forecast.innerHTML = data.error
            }
            else{
                temp.innerHTML = data.temp
                forecast.innerHTML = data.forecast 
                loc.innerHTML = data.location
                feels.innerHTML = data.feels
                humidity.innerHTML = data.humidity
                pressure.innerHTML = data.pressure
                uv.innerHTML = data.uv
                dewpoint.innerHTML = data.dewpoint
                windspeed.innerHTML = data.windspeed
                visibility.innerHTML = data.visibility
                clouds.innerHTML = data.clouds

                label.visibility = true
                
                if(data.forecast == 'Thunderstorm'){
                    img.src = 'images/stormy.svg'
                }
                else if(data.forecast == 'Rain'){
                    img.src = 'images/rain.svg'
                }
                else if(data.forecast == 'Drizzle'){
                    img.src = 'images/rain.svg'
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
                    img.src = 'images/cloud2.svg'
                }
                else if(data.forecast == 'Smoke'){
                    img.src = 'images/cloud2.svg'
                }
                else if(data.forecast == 'Haze'){
                    img.src = 'images/cloud2.svg'
                }
                else if(data.forecast == 'Dust'){
                    img.src = 'images/cloud2.svg'
                }
                else if(data.forecast == 'Sand'){
                    img.src = 'images/cloud2.svg'
                }
                else if(data.forecast == 'Tornado'){
                    img.src = 'images/cloud2.svg'
                }
                else if(data.forecast == 'Ash'){
                    img.src = 'images/cloud2.svg'
                }
                else if(data.forecast == 'Squall'){
                    img.src = 'images/cloud2.svg'
                }
                else if(data.forecast == 'Fog'){
                    img.src = 'images/cloud2.svg'
                }
                else{
                    img.src = 'images/cloud.svg'
                }
            }
        })
    })

})