let player1 = new Player("Logan", 15000, []);
let player2 = new Player("Jame", 15000, []);
let currentRoll = 0;
let currentPlayer = player1;
let log = [];
let playersMoveOut = false;
let isGameOver = false;
let isPlayerDecided = false;
let globalProp;
const { ReplaySubject } = rxjs;
const sub = new ReplaySubject();

const readyPlayers = () => {
  [player1, player2].forEach((v, i) => {
    let index = i + 1;
    if (v.playeName == currentPlayer.playeName) {
      $("#turn").html(v.playeName + "'s turn");
    }
    $("#p" + index + "Name").html(v.playeName);
    $("#p" + index + "Money").html("$" + v.amount);
    $("#p" + index + "Property").html("");
    v.ownedProperties.forEach((value) => {
      $("#p" + index + "Property").append("<p>" + value + "</p>");
    });
  });
  if (
    [player1, player2].filter((data) => data.currentPosition != 0).length >= 2
  ) {
    playersMoveOut = true;
  }
  console.log(log);
  //   if (currentPlayer.playeName == player2.playeName) {
  //       //ai
  //       rollDice();
  //   }
};

const rollDice = () => {
  let num1 = Math.floor(Math.random() * (6 - 1) + 1);
  let num2 = Math.floor(Math.random() * (6 - 1) + 1);
  currentRoll = num1 + num2;
  $("#die1").attr("src", "assets/img/dice/dice_" + num1 + ".png");
  $("#die2").attr("src", "assets/img/dice/dice_" + num2 + ".png");
  document
    .getElementById("diceContainer")
    .setAttribute("class", "diceContainer");
  $("#btnRollDice").prop("disabled", true);
  $("#diceResult").html(currentPlayer.playeName + " got " + currentRoll);
  movePlayer();
};

const movePlayer = () => {
  // move & Game logic
  let p = currentPlayer.playeName == player1.playeName ? 1 : 2;
  if (!p.isInJail) {
    for (let index = 0; index < currentRoll; index++) {
      if (currentPlayer.currentPosition == 11) {
        let pos =
          Number(
            $("#p" + p + "Icon")
              .css("top")
              .replace(/px/g, "")
          ) + 190;
        let pos2 =
          Number(
            $("#p" + p + "Icon")
              .css("left")
              .replace(/px/g, "")
          ) - 20;  
        $("#p" + p + "Icon").css({ top: pos, left: pos2 });
        currentPlayer.currentPosition++;
      } else if (
        currentPlayer.currentPosition > 11 &&
        currentPlayer.currentPosition < 19
      ) {
        let pos =
          Number(
            $("#p" + p + "Icon")
              .css("top")
              .replace(/px/g, "")
          ) + 110;
        $("#p" + p + "Icon").css({ top: pos });
        currentPlayer.currentPosition++;
      } else if (currentPlayer.currentPosition == 19) {
        let pos =
          Number(
            $("#p" + p + "Icon")
              .css("left")
              .replace(/px/g, "")
          ) - 100;
        $("#p" + p + "Icon").css({ left: pos });
        currentPlayer.currentPosition++;
      } else if (
        currentPlayer.currentPosition > 19 &&
        currentPlayer.currentPosition < 29
      ) {
        if (currentPlayer.currentPosition == 28 && index == currentRoll - 1) {
          console.log("Jailed");
          let leftSide = 110 * 11 + 10;
          let top = 10;
          $("#p" + p + "Icon").css({ top: top, left: leftSide });
          currentPlayer.currentPosition = 10;
          if (currentPlayer.playeName == player1.playeName) {
            currentPlayer.isInJail = true;
            $("#p" + p + "Icon").css({ top: top, left: leftSide - 20 });
          } else {
            currentPlayer.isInJail = false;
          }
          currentPlayer.currentPosition++;
        } else {
          let pos =
            Number(
              $("#p" + p + "Icon")
                .css("left")
                .replace(/px/g, "")
            ) - 120;
          $("#p" + p + "Icon").css({ left: pos });
          currentPlayer.currentPosition++;
        }
      } else if (currentPlayer.currentPosition == 29) {
        let pos =
          Number(
            $("#p" + p + "Icon")
              .css("top")
              .replace(/px/g, "")
          ) - 110;
        $("#p" + p + "Icon").css({ top: pos });
        currentPlayer.currentPosition++;
      } else if (
        currentPlayer.currentPosition > 29 &&
        currentPlayer.currentPosition < 36
      ) {
        let pos =
          Number(
            $("#p" + p + "Icon")
              .css("top")
              .replace(/px/g, "")
          ) - 110;
        $("#p" + p + "Icon").css({ top: pos });
        currentPlayer.currentPosition++;
      } else if (currentPlayer.currentPosition == 36) {
        currentPlayer.currentPosition = 1;
        let pos =
          Number(
            $("#p" + p + "Icon")
              .css("left")
              .replace(/px/g, "")
          ) + 110;
        $("#p" + p + "Icon").css({ left: pos, top: "10px" });
      } else {
        let pos =
          Number(
            $("#p" + p + "Icon")
              .css("left")
              .replace(/px/g, "")
          ) + 120;
        $("#p" + p + "Icon").css({ left: pos });
        currentPlayer.currentPosition++;
      }
      console.log("ROll P" + currentPlayer.currentPosition);
      
    }

    gameLogic();

    log.push(
      currentPlayer.playeName +
        " rolled " +
        currentRoll +
        " and amt " +
        currentPlayer.amount +
        " and moved " +
        currentPlayer.currentPosition
    );
  } else {
    log.push(
      currentPlayer.playeName +
        " rolled " +
        currentRoll +
        " and in jailed " +
        currentPlayer.amount +
        " and moved " +
        currentPlayer.currentPosition
    );
  }

  checkGameStatus();
};

$(document).ready(function () {
  readyPlayers();
  sub.subscribe({
    next: (v) => {
      if (v) {
        setTimeout(() => {
          if (isGameOver) {
            return;
          }
          document
            .getElementById("diceContainer")
            .setAttribute("class", "diceContainer hidden");
          if (currentPlayer.playeName == player1.playeName) {
            p1.currentPosition = currentPlayer.currentPosition;
            currentPlayer = player2;
          } else {
            p2.currentPosition = currentPlayer.currentPosition;
            currentPlayer = player1;
          }
          currentRoll = 0;
          $("#btnRollDice").prop("disabled", false);
          setTimeout(() => {
            $("#diceResult").html("");
          }, 1000);
          readyPlayers();
        }, 1000);
      }
    },
  });
});

$("#btnRollDice").click(function () {
  document.getElementById("dice_roll").play();
  rollDice();
});

const gameLogic = () => {
  if (isGameOver) {
    return;
  }

  if (currentPlayer.playeName == player1.playeName) {
    let tile = player1.getLandingTile();
    if (tile.tileType.rule == rule.property) {
      player1.landedOnProperty(
        tile,
        onPromptUserToBuy,
        onFailMoneyProcess,
        onPayTaxDuetoOtherPlayerProps,
        onCollectRent
      );
    } else if (tile.tileType.rule == rule.tax) {
      player1.payGovTaxes(tile, onPayGovTax);
    } else if (tile.tileType.rule == rule.mystery) {
      player1.landOnMysteryCard(onSuccessMystery);
    } else {
      sub.next(true);
    }
  } else {
    let tile = player2.getLandingTile();
     if (tile.tileType.rule == rule.property) {
      player2.landedOnProperty(
        tile,
        onPromptUserToBuy,
        onFailMoneyProcess,
        onPayTaxDuetoOtherPlayerProps,
        onCollectRent
      );
    } else if (tile.tileType.rule == rule.tax) {
      player2.payGovTaxes(tile, onPayGovTax);
    } else if (tile.tileType.rule == rule.mystery) {
      player2.landOnMysteryCard(onSuccessMystery);
    } else {
      sub.next(true);
    }
  }
};

function onCollectRent(rent) {
  window.alert(
    currentPlayer.playeName +
      " collect rent of $" +
      rent +
      " from his owned property"
  );
  sub.next(true);
}

function onSuccessPassTravelBudget() {
  window.alert(currentPlayer.playeName + " got $200");
  sub.next(true);
}

function onPromptUserToBuy(tile) {
  //ai
  // if(currentPlayer.playeName == player2.playeName) {
  //     if (currentPlayer.amount > (tile.tileAmount + 50 ) ) {
  //         player2.buyProperty(tile, onSuccessBuy);
  //     } else {
  //         console.log('Player Skipped');
  //     }
  // } else{
  //     if (confirm("Buy " + tile.tileName + "?")) {
  //         if(currentPlayer.playeName == player1.playeName) {
  //             player1.buyProperty(tile, onSuccessBuy);
  //         } else {
  //             player2.buyProperty(tile, onSuccessBuy);
  //         }
  //       } else {
  //           console.log('Player Skipped');
  //     }
  // }
  // isPlayerDecided = false;
  showPropertyBuyPrompt(tile);
}

function onConfirmBuyProperty(prop) {
  if (currentPlayer.playeName == player1.playeName) {
    player1.buyProperty(prop, onSuccessBuy);
  } else {
    player2.buyProperty(prop, onSuccessBuy);
  }
  document
    .getElementById("propertyBuyPrompt")
    .setAttribute("class", "propertyBuy hidden");
  globalProp = null;
}

function onSkipBuy() {
  console.log("Player Skipped");
  document
    .getElementById("propertyBuyPrompt")
    .setAttribute("class", "propertyBuy hidden");
  globalProp = null;
  sub.next(true);
}

function onFailMoneyProcess() {
  window.alert(currentPlayer.playeName + " do not have enough money");
  sub.next(true);
}

function onPayGovTax(amt) {
  window.alert(currentPlayer.playeName + " has to pay " + amt + " as Tax.");
  sub.next(true);
}

function onPayTaxDuetoOtherPlayerProps(tax) {
  window.alert(
    currentPlayer.playeName +
      " paid " +
      tax +
      " for landing on other player's property"
  );
  if (currentPlayer.playeName != player1.playeName) {
    player1.collectTax(tax);
  } else {
    player2.collectTax(tax);
  }
  sub.next(true);
}

function onSuccessBuy(amt) {
  // window.alert(currentPlayer.playeName + " bought property that worth " + amt);
  document.getElementById("kaching").play();
  sub.next(true);
}

function onSuccessMystery(random, plusOrMinus) {
  //   window.alert(
  //     currentPlayer.playeName +
  //       " draws Mystery card and " +
  //       (plusOrMinus == 0 ? "rewarded " : "taxed ") +
  //       "$" +
  //       random
  //   );
  if (plusOrMinus == 0) {
    $("#mysteryCardImg").attr("src", "assets/img/svg/winning.jpg");
    $("#title").html("KA-CHING");
    $("#description").html("You got $" + random + " from street");
    document.getElementById("free_money").play();
  } else {
    $("#mysteryCardImg").attr("src", "assets/img/svg/hospital.jpg");
    $("#title").html("GOT INJURED!!");
    $("#description").html("Must pay $" + random + " hospital bills");
    document.getElementById("injured").play();
  }
  document
    .getElementById("mysteryCardsPanel")
    .setAttribute("class", "mysteryCardsPanel");
  setTimeout(() => {
    document
      .getElementById("mysteryCardsPanel")
      .setAttribute("class", "mysteryCardsPanel hidden");
    sub.next(true);
  }, 4000);
}

function onUserChoseToBuy() {
  onConfirmBuyProperty(globalProp);
}

function showPropertyBuyPrompt(property) {
  $("#amount").html("$" + property.tileAmount);
  $("#property_name").html("$" + property.tileName);
  $("#propertyAsset").attr("src", property.image);
  globalProp = property;

  document
    .getElementById("propertyBuyPrompt")
    .setAttribute("class", "propertyBuy");
}

const checkGameStatus = () => {
  if (player1.amount <= 0) {
    isGameOver = true;
    window.alert(player2.playeName + " Wins");
  } else if (player2.amount <= 0) {
    isGameOver = true;
    window.alert(player1.playeName + " Wins");
  }

  if (isGameOver) {
    $("#btnRollDice").prop("disabled", true);
  }
};

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
  };
}

function loadHTML(data, boardNum) {
  console.log("hello");
  fetch(data)
    .then((response) => response.text())
    .then((text) => (document.getElementById(boardNum).innerHTML += text));
}
