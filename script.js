const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log("hi");
  const userInput = document.getElementById("tags-search").value;
  getCoords(userInput.trim());
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
    cityCurrent.textContent = value[0].name;

    part2(lat, lng);
    part3(lat, lng);
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
    // part3();
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

    //cityCurrentDateSymbol.textContent = date();

    currentTemp.textContent = value.list[0].main.temp;
    currentWind.textContent = value.list[0].wind.speed;
    currentHum.textContent = value.list[0].main.humidity;

    part4();
  });
}
