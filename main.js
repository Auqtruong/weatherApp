const apiKey = "28117ac2042593312acecb2d396ab235";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const history           = document.getElementById("historyList");
const delHistoryButton  = document.querySelector(".historyBox button")
const searchBarBox      = document.querySelector(".searchBar input")
const searchBarButton   = document.querySelector(".searchBar button")

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

    saved.push(city);
    localStorage.setItem("historyList", JSON.stringify(saved));
    buildHistory(city);

    searchBarBox.value = "";
}

const buildHistory = (text) => {
    const hist      = document.createElement("button");
    hist.classList.add('cityButton')
    hist.innerText  = text;
    document.getElementById("historyList").appendChild(hist);
}

saved.forEach(displaySaved);

function displaySaved(city){
    const btn = document.createElement("button");
    btn.className = 'cityButton'
    btn.innerText = city;
    document.getElementById("historyList").appendChild(btn);
}

console.log("local storage");
for (i = 0; i < localStorage.length; i++)   {
    console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
}

delHistoryButton.addEventListener("click", () => {
    localStorage.clear();
})

searchBarButton.addEventListener("click", () => {
    grabWeatherData(searchBarBox.value);
})

document.onkeydown = (Event) => {
    if (Event.key === "Enter") {
        grabWeatherData(searchBarBox.value);
    }
}




