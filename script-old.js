// ref search button
var searchBtn = document.getElementById("searchBtn");
// ref for search box
var tagsSearch = document.getElementById("tags-search");

// ref large current city h2
var cityCurrent = document.getElementById("cityCurrent");
// ref large current date h2
var currentDateSymbol = document.getElementById("currentDateSymbol");

var city5Fc = document.getElementById("city5Fc");

var cityButtons = document.getElementById("cityButtons");

var currentTemp = document.getElementById("currentTemp");
var currentWind = document.getElementById("currentWind");
var currentHum = document.getElementById("currentHum");
var currentUV = document.getElementById("currentUV");

var btn = document.getElementById("btn");

// creating places to store city in LS
var cityStored = localStorage.getItem(cityStored);
// store the latitude
var latStored = localStorage.getItem(latStored);
// store the longitude
var lngStored = localStorage.getItem(lngStored);

// setting the limit to 5, given free account limits
var limit = 5;

var lat = "";
var lng = "";

// setting the limit to 5, given free account limits
var cities = [];

// listener to click on the search button
searchBtn.addEventListener("click", function () {
  if (tagsSearch.value === "") {
    // this alert won't show up even if the user doesn't enter anything
    alert("You must enter a city!");
    return;
  } else {
    storeInput();
  }
});

// stores user input in local storage, creates buttons
function storeInput() {
  // store user input in variable
  var cityEntered = tagsSearch.value.trim();

  cities.push(cityEntered);
  tagsSearch.value = "";
  city5Fc.value = "";
  // Use .setItem() to store object in storage and JSON.str
  // ingify to convert it as a string
  localStorage.setItem("cityStored", JSON.stringify(cityEntered));

  console.log();

  var btn = document.createElement("button");
  btn.classList.add("btn", "btn-secondary", "mt-md-2");

  btn.addEventListener("click", function () {
    // city name
  });

  // variables for first API
  const key1 = "b76aeff8b2ed6817e2d4af8ad0304159";
  const baseUrl1 = "https://api.openweathermap.org/geo/1.0/direct?q=";
  const query1 = `${cityEntered}&limit=${limit}&appid=${key1}`;

  $.ajax({
    url: baseUrl1 + query1,
    method: "GET",
  }).then((value) => {
    console.log(value);
    lat = value[0].lat;
    lng = value[0].lon;

    cities.push(lat);
    cities.push(lng);

    localStorage.setItem("lat", JSON.stringify(lat));
    localStorage.setItem("lng", JSON.stringify(lng));

    btn.textContent = value[0].name;

    cityButtons.appendChild(btn);

    part2();
  });
}
// takes the lat and long from to return the current weather data
function part2() {
  const key1 = "b76aeff8b2ed6817e2d4af8ad0304159";
  const baseURL2 = "https://api.openweathermap.org/data/2.5/weather?";
  const query2 = `lat=${lat}&lon=${lng}&appid=${key1}&units=imperial`;

  $.ajax({
    url: baseURL2 + query2,
    method: "GET",
  }).then((value) => {
    console.log(value);
    part3();
  });
}

//
function part3() {
  const key1 = "b76aeff8b2ed6817e2d4af8ad0304159";
  const baseURL3 = "https://api.openweathermap.org/data/2.5/forecast?";
  const query3 = `lat=${lat}&lon=${lng}&appid=${key1}&units=imperial`;

  $.ajax({
    url: baseURL3 + query3,
    method: "GET",
  }).then((value) => {
    console.log(value);
    for (let i = 4; i < value.list.length; i += 8) {
      var divCard = document.createElement("div");
      divCard.classList.add("col-md-2", "card", "border-light");
      divCard.style.maxWidth = "18rem";
      divCard.innerHTML = `<div class="card-body">
                <h5 class="card-title">${value.list[i].dt_txt}</h5>
                <p class="card-text">
                <img src="http://openweathermap.org/img/wn/${value.list[i].weather[0].icon}@2x.png"/>
                  <ul>
                    <dd>Temp: ${value.list[i].main.temp}°</dd>
                    <dd>Wind: ${value.list[i].wind.speed}mph</dd>
                    <dd>Humidity: ${value.list[i].main.humidity}%</dd>
                  </ul>
                </p>
              </div>`;
      city5Fc.append(divCard);
    }
    //console.log(value);
    cityCurrent.textContent = value.city.name;
    //cityCurrentDateSymbol.textContent = date();

    currentTemp.textContent = value.list[0].main.temp;
    currentWind.textContent = value.list[0].wind.speed;
    currentHum.textContent = value.list[0].main.humidity;

    part4();
  });
}

function part4() {
  $.ajax({
    type: "GET",
    dataType: "json",
    beforeSend: function (request) {
      request.setRequestHeader(
        "x-access-token",
        "988c321c1ddde559e602bae0133f5498"
      );
    },
    url:
      "https://api.openuv.io/api/v1/uv?lat=" +
      lat +
      "&lng=" +
      lng +
      "&alt=" +
      0 +
      "&ozone=" +
      0 +
      "&dt=" +
      0,
    success: function (response) {
      console.log(response);
      //for (var i = 0; i<)
      //currentHum.textContent = response.uv;
    },
    error: function (response) {
      // handle error response
    },
  });
}

loadCities();
