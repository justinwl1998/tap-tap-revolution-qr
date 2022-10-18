if (document.querySelector("#highscore") !== null) {
  document.querySelector("#highscore").addEventListener("click", function () {
    window.location.href = "/scores";
  });
}
