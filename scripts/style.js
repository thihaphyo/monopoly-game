const startNow = () => {
  document.getElementById('click').play();
  document.getElementsByClassName("landingPage")[0].classList.add("fade-out");

  setTimeout(() => {
    document.getElementsByClassName("landingPage")[0].classList.add("hidden");
    document.getElementById("main").play();
  }, 2000);

  setTimeout(() => {
    document.getElementsByClassName("loadingPage")[0].classList.add("fade-in");
    document
      .getElementsByClassName("loadingPage")[0]
      .classList.remove("hidden");
  }, 3000);

  setTimeout(() => {
    document.getElementById("msg1").setAttribute("class", "fade-out");
    document.getElementById("msg2").classList.remove("hidden");
  }, 6000);

  setTimeout(() => {
    document.getElementById("msg2").setAttribute("class", "fade-out");
    document.getElementById("msg3").classList.remove("hidden");
  }, 9000);

  setTimeout(() => {
    document
      .getElementsByClassName("loadingPage")[0]
      .classList.remove("fade-in");
    document.getElementsByClassName("loadingPage")[0].classList.add("fade-out");
  }, 12000);

  setTimeout(() => {
    document.getElementsByClassName("loadingPage")[0].classList.add("hidden");
    document.getElementsByClassName("playGround")[0].classList.remove("hidden");
    document.getElementById("main").pause();
    // document.getElementById('ingame').play();
  }, 13000);

  setTimeout( () => {
    var audio = document.getElementById("ingame");
    audio.volume = 0.5;
    audio.play();
    setInterval(() => {
      audio.currentTime = 0;
      audio.play();
    }, 76200);
  },13200);
};