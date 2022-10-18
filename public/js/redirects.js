if (document.querySelector("#login") !== null) {
  document.querySelector("#login").addEventListener("click", function () {
    window.location.href = "/login";
  });
}

if (document.querySelector("#signup") !== null) {
  document.querySelector("#signup").addEventListener("click", function () {
    window.location.href = "/signup";
  });
}

if (document.querySelector('#stats') !== null) {
  document.querySelector("#stats").addEventListener("click", function () {
    window.location.href = "/stats";
  });  
}

if (document.querySelector('#back') !== null) {
  document.querySelector("#back").addEventListener("click", function () {
    window.location.href = "/";
  });  
}
