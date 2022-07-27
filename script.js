const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

setInterval(() => {
    
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

const div = document.querySelector('.others')
async function CityAction(cityName) {
    console.log(cityName)
    const key = '17055d0ad8222645072fe4079e4cc864';
    console.log(key)
    const cityData = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=1b8241e135315eca3d63b497ed3f35f5`) .then((data)=>{
        return data.json()
    })
    console.log(cityData)
    const lat = await cityData[0].lat
    const lon = await cityData[0].lon
    console.log(lat,lon)

    const weatherDetails = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`).then((data)=>{
        return data.json()
    })
    console.log(weatherDetails)
    const temperature =  weatherDetails.main.temp
    const weather = weatherDetails.weather[0]
    const name = weatherDetails.name
    console.log(div)
    
div.innerHTML=`

<div><h2>Weather in ${cityName}</h2></div>
<p class="temp">${temperature}°C</p>
<div class="weather-item">
    <div>Humidity</div><br><br>
    <div>${ weatherDetails.main.humidity}%</div>
</div>
<div class="weather-item">
    <div>Pressure</div><br><br>
    <div>${weatherDetails.main.pressure}</div>
    </div>
<div class="weather-item">
    <div>Wind Speed</div>
    <div>${weatherDetails.wind.speed}</div>
</div>
`
     return weatherDetails
    


}
CityAction('kirkless')


const form = document.querySelector('.input')
form.addEventListener('submit',e=>{
    e.preventDefault()
    CityAction(e.target.b.value)
})

