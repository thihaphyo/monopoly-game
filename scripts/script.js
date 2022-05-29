let player1 = new Player("Jame", 400, []);
let player2 = new Player("Logan", 1500, []);
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
  tiles[1].ownedBy = player1;
  [player1, player2].forEach((v, i) => {
    let index = i + 1;
    if (v.playeName == currentPlayer.playeName) {
      $("#turn").html(v.playeName + "'s turn");
    }
    $("#p" + index + "Name").html(v.playeName);
    $("#p" + index + "Money").html("$" + v.amount);
    $("#p" + index + "Property").html("");
    v.ownedProperties.forEach((value) => {
      $("#p" + index + "Property").append("<p>- " + value + "</p>");
    });
  });
  if (
    [player1, player2].filter((data) => data.currentPosition != 0).length >= 2
  ) {
    playersMoveOut = true;
  }
  console.log(log);
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
    console.log(title);
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

function onCollectRent(rent, property) {
 
  document.getElementById("free_money").play();

  $("#feesTaxesCardImg").attr("src", "assets/img/svg/collect_rent.svg");
  $("#ftTitle").html(property.ownedBy.playeName + "'s PROPERTY");
  $("#ftDescription").html(
    currentPlayer.playeName + " collects $" + rent + " as rent for landing on " + property.tileName
  );
  document
    .getElementById("taxesCardsPanel")
    .setAttribute("class", "mysteryCardsPanel");
  setTimeout(() => {
    document
      .getElementById("taxesCardsPanel")
      .setAttribute("class", "mysteryCardsPanel hidden");
      sub.next(true);
      $('#buy').show();
  }, 3000);
}

function onSuccessPassTravelBudget() {
  $("#feesTaxesCardImg").attr("src", "assets/img/svg/no money.svg");
  $("#ftTitle").html("NO MONEY");
  $("#ftDescription").html(
    currentPlayer.playeName + " You dont have enough money"
  );
  document
    .getElementById("taxesCardsPanel")
    .setAttribute("class", "mysteryCardsPanel");
  setTimeout(() => {
    document
      .getElementById("taxesCardsPanel")
      .setAttribute("class", "mysteryCardsPanel hidden");
    sub.next(true);
  }, 3000);
}

function onPromptUserToBuy(tile) {
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
  $("#feesTaxesCardImg").attr("src", "assets/img/svg/no money.svg");
  $("#ftTitle").html("NO MONEY");
  $("#ftDescription").html(
    currentPlayer.playeName + " You dont have enough money"
  );
  document
    .getElementById("taxesCardsPanel")
    .setAttribute("class", "mysteryCardsPanel");
  setTimeout(() => {
    document
      .getElementById("taxesCardsPanel")
      .setAttribute("class", "mysteryCardsPanel hidden");
    sub.next(true);
  }, 3000);
}

function onPayGovTax(amt) {
  document.getElementById("kaching").play();
  $("#feesTaxesCardImg").attr("src", "assets/img/svg/taxes.svg");
  $("#ftTitle").html("CITY TAXES");
  $("#ftDescription").html(
    currentPlayer.playeName + " You have to pay $" + amt + " as taxes"
  );
  document
    .getElementById("taxesCardsPanel")
    .setAttribute("class", "mysteryCardsPanel");
  setTimeout(() => {
    document
      .getElementById("taxesCardsPanel")
      .setAttribute("class", "mysteryCardsPanel hidden");
    sub.next(true);
  }, 3000);
}

function onPayTaxDuetoOtherPlayerProps(tax, property) {
  document.getElementById("free_money").play();

  $("#feesTaxesCardImg").attr("src", "assets/img/svg/pay.svg");
  $("#ftTitle").html(property.ownedBy.playeName + "'s PROPERTY");
  $("#ftDescription").html(
    currentPlayer.playeName + " have to pay $" + tax + " as tax for landing on " + property.tileName
  );
  document
    .getElementById("taxesCardsPanel")
    .setAttribute("class", "mysteryCardsPanel");
  setTimeout(() => {
    document
      .getElementById("taxesCardsPanel")
      .setAttribute("class", "mysteryCardsPanel hidden");
      if (currentPlayer.playeName != player1.playeName) {
        player1.collectTax(tax);
      } else {
        player2.collectTax(tax);
      }
      sub.next(true);
      $('#buy').show();
  }, 3000);
}

function onSuccessBuy(amt) {
  document.getElementById("kaching").play();
  sub.next(true);
}

function onSuccessMystery(random, plusOrMinus) {
  if (plusOrMinus == 0) {
    $("#mysteryCardImg").attr("src", "assets/img/svg/gift card.svg");
    $("#title").html("GIFT CARD");
    $("#description").html("You got $" + random + " gift card voucher");
    document.getElementById("free_money").play();
  } else {
    $("#mysteryCardImg").attr("src", "assets/img/svg/winning.jpg");
    $("#title").html("GOT INJURED");
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
  }, 3000);
}

function onUserChoseToBuy() {
  onConfirmBuyProperty(globalProp);
}

function showPropertyBuyPrompt(property) {
  $("#propertyBuyPanel").css("background-color", property.bgColor);
  $("#amount").html("$" + property.tileAmount);
  $("#property_name").html(property.tileName);
  $("#propertyAsset").attr("src", property.image);
  globalProp = property;

  document
    .getElementById("propertyBuyPrompt")
    .setAttribute("class", "propertyBuy");
}

const checkGameStatus = () => {
  if (player1.amount <= 0) {
    isGameOver = true;
    $('#winner_name').html(player2.playeName + " Wins");
    document.getElementById('winner').setAttribute('class', "winnerCards" );
    document.getElementById('win').play();
  } else if (player2.amount <= 0) {
    isGameOver = true;
    $('#winner_name').html(player1.playeName + " Wins");
    document.getElementById('winner').setAttribute('class', "winnerCards" );
    document.getElementById('win').play();
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
