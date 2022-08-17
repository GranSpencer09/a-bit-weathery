var searchEl = document.getElementById("search");

fetch(
  "http://api.openweathermap.org/geo/1.0/direct?q=san francisco&limit=5&appid=b76aeff8b2ed6817e2d4af8ad0304159"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      console.log(data[i].country);
      //searchEl.textContent = data[i].country;
    }
  });

$(function () {
  var availableTags = [
    "ActionScript",
    "AppleScript",
    "Asp",
    "BASIC",
    "C",
    "C++",
    "Clojure",
    "COBOL",
    "ColdFusion",
    "Erlang",
    "Fortran",
    "Groovy",
    "Haskell",
    "Java",
    "JavaScript",
    "Lisp",
    "Perl",
    "PHP",
    "Python",
    "Ruby",
    "Scala",
    "Scheme",
  ];
  $("#tags").autocomplete({
    source: availableTags,
  });
});
