let playerCurrentPlace = {
  0: 1,
  1: 1,
};
let startPlaying = 0;
let playerOne = true;
const rollDice = () => {
  let playerTurn = playerOne ? 0 : 1;
  let currentPlace = playerCurrentPlace[playerTurn];

  if (startPlaying != 2) {
    document
      .getElementById("B" + currentPlace)
      .children[0].children[playerTurn].classList.add("hidden");
    console.log(
      document.getElementById("B" + currentPlace).children[0].children[
        playerTurn
      ]
    );
    startPlaying += 1;
  }

  let diceNumber = Math.floor(Math.random() * (7 - 1) + 1);
  playerOne = playerOne ? false : true;

  //   playerCurrentPlace[playerTurn] += diceNumber;

  //   let BoardNum = "B" + diceNumber;
  //   let nextPlace = document.getElementById(BoardNum).id;

  //   playerOne
  //     ? loadHTML("playerAvatars.html", nextPlace)
  //     : loadHTML("playerAvatars2.html", nextPlace);

  //   playerOne = playerOne ? false : true;
  //   console.log("turn" + playerTurn);
};

function loadHTML(data, boardNum) {
  console.log("hello");
  fetch(data)
    .then((response) => response.text())
    .then((text) => (document.getElementById(boardNum).innerHTML += text));
}
