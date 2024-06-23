const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const history           = document.getElementById("historyList");
const delHistoryButton  = document.querySelector(".historyBox button");
const searchBarBox      = document.querySelector(".searchBar input");
const searchBarButton   = document.querySelector(".searchBar button");
const weatherIcon       = document.querySelector(".icon");
const directionIcon     = document.querySelector(".direction")

//history exists or empty array/list
let saved = localStorage.getItem("historyList") ? JSON.parse(localStorage.getItem("historyList")) : [];

//use api to fetch weather information
async function grabWeatherData(city) {
    const resp  = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(resp.status == 404){
        document.querySelector(".invalid").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }

    let data = await resp.json();


    console.log(data);

    document.querySelector(".city").innerHTML        = data.name;
    if(data.sys.country){
        document.querySelector(".country").innerHTML     = data.sys.country;
    }
    else{
        document.querySelector(".country").innerHTML     = "N/A";
    }
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°f";
    document.querySelector(".rain").innerHTML        = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML        = Math.round(data.wind.speed * 10) / 10 + " mph";
    document.querySelector(".description").innerHTML = data.weather[0].description;
    document.querySelector(".feelsLike").innerHTML   = data.main.feels_like + "°f";
    document.querySelector(".highLow").innerHTML     = data.main.temp_max + "°f" + " / " + data.main.temp_min + "°f";
    document.querySelector(".pressure").innerHTML    = data.main.pressure + " hPa";
    document.querySelector(".visibility").innerHTML  = data.visibility + " m";
    document.querySelector(".cloudiness").innerHTML  = data.clouds.all + "%";

    switch(data.weather[0].main) {
        case "Clear":
            weatherIcon.src = "assets/sunny.png";
            break;
        case "Clouds":
            weatherIcon.src = "assets/cloudy.png";
            break;
        case "Drizzle":
            weatherIcon.src = "assets/drizzle.png";
            break;
        case "Rain":
            weatherIcon.src = "assets/rain.png";
            break;
        case "Mist":
            weatherIcon.src = "assets/misty.png";
            break;
        case "Snow":
            weatherIcon.src = "assets/snow.png";
            break;
        case "Thunderstorm":
            weatherIcon.src = "assets/thunderstorm.png";
            break;
        case "Smoke":
            weatherIcon.src = "assets/smoke.png";
            break;
        case "Haze":
            weatherIcon.src = "assets/haze.png";
            break;
        case "Dust":
            weatherIcon.src = "assets/dust.png";
            break;
        case "Fog":
            weatherIcon.src = "assets/fog.png";
            break;
        case "Sand":
            weatherIcon.src = "assets/sand.png";
            break;
        case "Ash":
            weatherIcon.src = "assets/ash.png";
            break;
        case "Squall":
            weatherIcon.src = "assets/squall.png";
            break;
        case "Tornado":
            weatherIcon.src = "assets/tornado.png";
            break;
    }

    let val = degreeToDirection(data.wind.deg);

    switch(val) {
        case "N":
            directionIcon.src = "assets/n.png";
            break;
        case "NNE": case "NE": case "ENE":    
        directionIcon.src = "assets/ne.png";
            break;
        case "E":
            directionIcon.src = "assets/e.png";
            break;
        case "ESE": case "SE": case "SSE":
            directionIcon.src = "assets/se.png";
            break;
        case "S":
            directionIcon.src = "assets/s.png";
            break;
        case "SSW": case "SW": case"WSW":
            directionIcon.src = "assets/sw.png";
            break;
        case "W":
            directionIcon.src = "assets/w.png";
            break;
        case "WNW": case "NW": case"NNW": 
            directionIcon.src = "assets/nw.png";
            break;
    }
    
    city = data.name.toLowerCase();

    if(!saved.includes(city)){
        saved.push(city);
        saved = [...new Set(saved)];
        localStorage.setItem("historyList", JSON.stringify(saved));
        buildHistory(city);
    }

    searchBarBox.value = "";

    document.querySelector(".invalid").style.display = "none";
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".details").style.display = "grid";
}

//build history list
const buildHistory = (text) => {
        const list      = document.createElement("li");
        const hist      = document.createElement("button");
        hist.classList.add('cityButton')
        hist.innerText  = text;
        list.appendChild(hist);
        
        hist.addEventListener("click", () =>{
            grabWeatherData(text, true);
        })

        document.getElementById("historyList").appendChild(list);
}

//convert degrees to compass direction
function degreeToDirection(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var directions = ["N", "NNE", "NE", "ENE", 
                      "E", "ESE", "SE", "SSE", 
                      "S", "SSW", "SW", "WSW", 
                      "W", "WNW", "NW", "NNW"];
    return directions[(val % 16)];
}

//display persisting search history
saved.forEach(buildHistory);


//check local storage/searches
//TO BE REMOVED
console.log("local storage");
for (i = 0; i < localStorage.length; i++)   {
    console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
}

//delete search history on click
delHistoryButton.addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
})


//search for weather data on click or Enter key press
searchBarButton.addEventListener("click", () => {
    grabWeatherData(searchBarBox.value);
})

document.onkeydown = (Event) => {
    if (Event.key === "Enter") {
        grabWeatherData(searchBarBox.value);
    }
}



