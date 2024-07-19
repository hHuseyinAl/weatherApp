const apiKey = '';
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=metric

const input = document.getElementsByTagName("input")[0];
const button = document.getElementById("button");
const weatherImg = document.getElementById("img");
const paragraph = document.getElementsByTagName("p")[0];

let data;

async function Weather() {
    let cityName = input.value.trim();

    if (input.value == "") {
        setError("The Input Can Not Be Left Blank");
        return;
    }
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);

    switch (response.status) {
        case 404:
            setError("Please Enter A Valid Name");
            break;
        case 429:
            setError("Slow Down Man");
            break;
        default:
            document.querySelector(".error").style.display = "none";
            data = await response.json();
            // console.log(data)
            if (data) {
                setUI();
                display();
                break;
            }
    }
}

button.addEventListener("click", Weather);

function display() {
    document.querySelector(".middle").style.display = "contents";
    document.querySelector(".bottom1").style.display = "flex";
    document.querySelector(".bottom2").style.display = "flex";
}

function displayNone() {
    document.querySelector(".middle").style.display = "none";
    document.querySelector(".bottom1").style.display = "none";
    document.querySelector(".bottom2").style.display = "none";
}

function setWeatherImg() {
    switch (data.weather[0].main) {
        case "Clear":
            weatherImg.src = "images/clear.png"
            break;
        case "Clouds":
            weatherImg.src = "images/clouds.png"
            break;
        case "Rain":
            weatherImg.src = "images/rain.png"
            break;
        case "Drizzle":
            weatherImg.src = "images/drizzle.png"
            break;
        case "Snow":
            weatherImg.src = "images/snow.png"
            break;
    }
}

function setError(e) {
    document.querySelector(".error").style.display = "block";
    paragraph.textContent = e
    displayNone()
}

function setUI() {
    document.getElementsByTagName("h1")[0].textContent = Math.round(data.main.temp) + "°C";
    document.getElementsByTagName("h2")[0].textContent = data.name;
    document.getElementById("h31").textContent = data.main.humidity + "%";
    document.getElementById("h32").textContent = data.wind.speed + "km/h";

    setWeatherImg();
}