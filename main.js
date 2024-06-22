const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const history           = document.getElementById("historyList");
const delHistoryButton  = document.querySelector(".historyBox button");
const searchBarBox      = document.querySelector(".searchBar input");
const searchBarButton   = document.querySelector(".searchBar button");
const weatherIcon       = document.querySelector(".icon");
const savedCityBtn      = document.querySelector(".cityButton button");

//history exists or empty array/list
let saved = localStorage.getItem("historyList") ? JSON.parse(localStorage.getItem("historyList")) : [];

async function grabWeatherData(city) {
    const resp  = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data    = await resp.json();

    console.log(data);

    document.querySelector(".city").innerHTML        = data.name;
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°f";
    document.querySelector(".rain").innerHTML        = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML        = data.wind.speed + " mph";

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

    saved.push(city);
    localStorage.setItem("historyList", JSON.stringify(saved));
    buildHistory(city);

    searchBarBox.value = "";
}

//build history list
const buildHistory = (text) => {
    const list      = document.createElement("li");
    const hist      = document.createElement("button");
    hist.classList.add('cityButton')
    hist.innerText  = text;
    list.appendChild(hist);

    document.getElementById("historyList").appendChild(list);
}

//display search history
saved.forEach(displaySaved);


//create button for city
function displaySaved(city){
    const btn = document.createElement("button");
    btn.className = 'cityButton'
    btn.innerText = city;
    document.getElementById("historyList").appendChild(btn);
}

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

// savedCityBtn.addEventListener("click", () => {
//     grabWeatherData(savedCityBtn.innerText);
// })




