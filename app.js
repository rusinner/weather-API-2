//Get all elements from the DOM

const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelectorAll('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelectorAll('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelectorAll('.icon');
const cloudOutput = document.querySelector('.cloud');
const windOutput = document.querySelector('.wind');
const form = document.querySelector("#locationInput");
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

//Default city when the page loads
let cityInput = "London";

//click event in each city on the panel
cities.forEach((city) => {
  city.addEventListener('click',(e)=>{
      //change from default city to the clicked one
      cityInput = e.target.innerHTML;
      //functionthat fetches and displays all the data from weather API
      fetchWeatherData();
      //fade out the app (animation)
      app.style.opacity = "0";
  });
});

//add submit event to the form
form.addEventListener('submit',(e)=>{
    //if the input field is empty throw alert
    if(search.value.length == 0){
        alert('Please type in a city name');
    }else{
        //change from default city to the selected one
        cityInput = search.value;
        //functionthat fetches and displays the data from weather API
        fetchWeatherData();
        //remove all text from input field
        search.value = "";
        //fade out app
        app.style.opacity = 0;
    }
    //prevents the default behaviour of the form
    e.preventDefault();
});


//function that returns the day of the week from a date

function dayOfTheWeek(day,month,year){
const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
return weekday [new Date(`${day}/${month}/${year}`).getDay() ];
};

//function that catches and displays the data from the weather API
function fetchWeatherData(){
    //fetch the data and dynamically add the city name with template literals
    //USE YOUR OWN KEY
    fetch(`http://api.weatherapi.com/v1/current.json?key=3b46084ff5e74001be9112902222605&q=${cityInput}`)
    //take the data (JSON format) and convert it to a regular JS object
    .then(response=>response.json())
    .then(data=> {
        console.log(data);
   //add temp and weather conditions to the page
   temp.innerHTML = data.current.temp_c + "&#176;";
   conditionOutput.innerHTML = data.current.condition.text;
   //get the day.month,year and time into individual variables 
   const date = data.location.localtime;
   const y = parseInt(date.substr(0.4));
   const m = parseInt(date.substr(5,2));
   const d = parseInt(date.substr(8,2));
   const time = date.substr(11);

   //Reformat date into something more appealing and add it to page
   dateOutput.innerHTML = `${dayOfTheWeek(d,m,y)} ${d}, ${m} ${y} `;
   //add the name of the city into the page
   nameOutput.innerHTML = data.location.name;
   //get the corresponding icon url for the weather and extract a part of it
   const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);

   //reformat the ioon url to our own local folder path and add it to the page
   icon.src = `./images/64x64/${timeOfDay}` + iconId;

//add the weather details to the page
cloudOutput.innerHTML = data.current.cloud + "%";
humidityOutput.innerHTML = data.current.humidity + "%";
windOutput.innerHTML = data.current.wind_kph + "Km/h";
//set default time of the day
let timeOfDay = "day";
//set the unique id for each weather condition 
const code = data.current.condition.code;
//change to night if its night ion the city
if(!data.current.is_day){
    timeOfDay = "night";
}

if(code==1000){
    //set the background image to clear if weather is clear
    app.style.backgroundImage = `url("./images/${timeOfDay}+"2"/clear.jpg")`;
    //change the button background color depending of its day or night
    btn.style.background = "#e5ba92";
    if(timeOfDay == "night"){
        btn.style.background = "#181e27";
    }
}
else if (
    code == 1003 ||
    code == 1006 ||
    code == 1009 ||
    code == 1030 ||
    code == 1069 ||
    code == 1087 ||
    code == 1135 ||
    code == 1273 ||
    code == 1276 ||
    code == 1279 ||
    code == 1282 
) {
    
    app.style.backgroundImage =` url(./images/${timeOfDay}/cloudy.jpg)`;
    btn.style.background = "#fa6d1b";
    if (timeOfDay == "night"){
        btn.style.background = "#181e27";
    }
} else if (
    code == 1063 ||
    code == 1069 ||
    code == 1072 ||
    code == 1150 ||
    code == 1153 ||
    code == 1180 ||
    code == 1183 ||
    code == 1186 ||
    code == 1189 ||
    code == 1192 ||
    code == 1195 ||
    code == 1204 ||
    code == 1207 ||
    code == 1240 ||
    code == 1243 ||
    code == 1246 ||
    code == 1249 ||
    code == 1252 
) {
    app.style.backgroundImage = `
    url(./images/${timeOfDay}/rainy.jpg)`;
    btn.style.background = "#647d75";
    if(timeOfDay == "night"){
        btn.style.background = "#325c80";
    }
}else{
    app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
    btn.style.background = "#4d72aa";
    if (timeOfDay == "night"){
        btn.style.background = "#1b1b1b";
    }
}
//fade in the page once all is done
app.style.opacity = "1"
})
    // // //if user types a city that doesn't exist throw an alert
    .catch (() => {
        // alert("city not found,please try again");
        app.style.opacity = "1";
    });

}
app.style.opacity = "1";

//call the function on page load
fetchWeatherData();


