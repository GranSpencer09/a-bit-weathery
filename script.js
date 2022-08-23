const currentIcon = document.getElementById("currentIcon");
const cityCurrent = document.getElementById("cityCurrent");
const searchForm = document.getElementById("search-form");
const userInput = document.getElementById("tags-search");
let cityArray = JSON.parse(localStorage.getItem("cityArray")) || [];
renderSearchHistory();

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log("hi");
  //const userInput = document.getElementById("tags-search").value;
  getCoords(userInput.value.trim());
});

function getCoords(cityEntered) {
  // variables for first API
  const key1 = "b76aeff8b2ed6817e2d4af8ad0304159";
  const baseUrl1 = "https://api.openweathermap.org/geo/1.0/direct?q=";
  const query1 = `${cityEntered}&limit=1&appid=${key1}`;

  $.ajax({
    url: baseUrl1 + query1,
    method: "GET",
  }).then((value) => {
    console.log(value);
    lat = value[0].lat;
    lng = value[0].lon;

    cityCurrent.textContent = `${value[0].name} `;

    userInput.value.textContent = "";

    currentDate.textContent = dayjs().format("MM/DD/YYYY");

    if (!cityArray.includes(value[0].name)) {
      cityArray.push(value[0].name);
    }

    localStorage.setItem("cityArray", JSON.stringify(cityArray));
    renderSearchHistory();

    part2(lat, lng);
    part3(lat, lng);
    part4(lat, lng);
  });
}
function part2(lat, lng) {
  const key1 = "b76aeff8b2ed6817e2d4af8ad0304159";
  const baseURL2 = "https://api.openweathermap.org/data/2.5/weather?";
  const query2 = `lat=${lat}&lon=${lng}&appid=${key1}&units=imperial`;

  $.ajax({
    url: baseURL2 + query2,
    method: "GET",
  }).then((value) => {
    console.log(value);
    console.log(value.weather[0].icon);
    currentIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png"/>`;
  });
}

function part3() {
  const key1 = "b76aeff8b2ed6817e2d4af8ad0304159";
  const baseURL3 = "https://api.openweathermap.org/data/2.5/forecast?";
  const query3 = `lat=${lat}&lon=${lng}&appid=${key1}&units=imperial`;

  $.ajax({
    url: baseURL3 + query3,
    method: "GET",
  }).then((value) => {
    console.log(value);

    city5Fc.innerHTML = "";

    for (let i = 4; i < value.list.length; i += 8) {
      var divCard = document.createElement("div");
      divCard.classList.add("col-md-2", "card", "border-light");
      divCard.style.maxWidth = "18rem";
      divCard.innerHTML = `<div class="card-body">
                <h5 class="card-title">${dayjs(value.list[i].dt_txt).format(
                  "DD/MM/YYYY"
                )}</h5>
                <p class="card-text">
                <img src="http://openweathermap.org/img/wn/${
                  value.list[i].weather[0].icon
                }@2x.png"/>
                  <ul>
                    <dd>Temp: ${value.list[i].main.temp}°</dd>
                    <dd>Wind: ${value.list[i].wind.speed}mph</dd>
                    <dd>Humidity: ${value.list[i].main.humidity}%</dd>
                  </ul>
                </p>
              </div>`;
      city5Fc.append(divCard);
    }

    currentTemp.textContent = value.list[0].main.temp;
    currentWind.textContent = value.list[0].wind.speed;
    currentHum.textContent = value.list[0].main.humidity;
  });
}

function part4(lat, lng) {
  $.ajax({
    type: "GET",
    dataType: "json",
    beforeSend: function (request) {
      request.setRequestHeader(
        "x-access-token",
        "253f22589076a7a79595bb29b6511749"
      );
    },
    url: "https://api.openuv.io/api/v1/uv?lat=" + lat + "&lng=" + lng,
    success: function (response) {
      currentUV.textContent = response.result.uv;
      if (response.result.uv <= 5) {
        currentUV.className = "bg-success text-white";
      } else if (response.result.uv > 5 && response.result.uv <= 7) {
        currentUV.className = "bg-warning text-white";
      } else if (response.result.uv > 7) {
        currentUV.className = "bg-danger text-white";
      }
    },
    error: function (response) {
      console.log(response);
    },
  });
}

function renderSearchHistory() {
  cityButtons.innerHTML = "";
  cityArray.forEach((city) => {
    var btn = document.createElement("button");
    btn.classList.add("btn", "btn-secondary", "mt-md-2");

    btn.textContent = city;

    btn.addEventListener("click", function () {
      getCoords(city);
    });
    cityButtons.append(btn);
  });
}
