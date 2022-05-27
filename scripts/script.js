let player1 = new Player("Logan", 1500, []);
let player2 = new Player("Jame", 1500, []);
let currentRoll = 0;
let currentPlayer = player1;
let log = [];
let playersMoveOut = false;
let isGameOver = false;

const readyPlayers = () => {
    [player1,player2].forEach((v,i) => {
         let index = (i+1);
         if (v.playeName == currentPlayer.playeName) { $('#turn').html(v.playeName + "'s turn"); }
         $('#p'+index+'Name').html(v.playeName);
         $('#p'+index+'Money').html("$" + v.amount);
         $('#p'+index+'Property').html("");
         v.ownedProperties.forEach((value) => {
            $('#p'+index+'Property').append('<h3>' + value + '</h3>');
         });
    });
    if ([player1,player2].filter((data) => data.currentPosition != 0).length >= 2) { playersMoveOut = true}
    console.log(log);
    if (currentPlayer.playeName == player2.playeName) {
        //ai
        rollDice();
    }
}

const rollDice = () => {
     let num1 =  Math.floor(Math.random() * (6 - 1) + 1);
     let num2 =  Math.floor(Math.random() * (6 - 1) + 1);
     currentRoll = num1 + num2;
     $('#die1').attr('src', "assets/img/dice/dice_"+num1+".png");
     $('#die2').attr('src', "assets/img/dice/dice_"+num2+".png");
     if(currentPlayer == player1) {
         document.getElementById('diceContainer').setAttribute('class', 'diceContainer diceContainerP1');
     } else {
        document.getElementById('diceContainer').setAttribute('class', 'diceContainer diceContainerP2');
     }
     $('#btnRollDice').prop( "disabled", true );
     $('#diceResult').html(currentPlayer.playeName + ' got ' + currentRoll);
     movePlayer();
}

const movePlayer = () => {
    // move & Game logic
    let p = currentPlayer.playeName == player1.playeName ? 1 : 2;
    if (!p.isInJail) {
        for (let index = 0; index < currentRoll; index++) {
            if(currentPlayer.currentPosition == 11) {
                let pos = Number($('#p'+p+'Icon').css("top").replace(/px/g, "")) + 160;
                let pos2 = Number($('#p'+p+'Icon').css("left").replace(/px/g, "")) -60;
                $('#p'+p+'Icon').css({"top":pos, "left":pos2});
            } else if(currentPlayer.currentPosition > 11 && currentPlayer.currentPosition < 21) {
                let pos = Number($('#p'+p+'Icon').css("top").replace(/px/g, "")) + (110);
                $('#p'+p+'Icon').css({"top":pos});
            } else if(currentPlayer.currentPosition == 21) {
                let pos = Number($('#p'+p+'Icon').css("left").replace(/px/g, "")) - 100;
                $('#p'+p+'Icon').css({"left":pos});
            } else if (currentPlayer.currentPosition > 21 && currentPlayer.currentPosition < 31) {
                if (index == 29 && index == currentRoll - 1) {
                    console.log('aas');
                    let leftSide = (110 * 12 ) + 10;
                    let top = 10;
                    $('#p'+p+'Icon').css({"top":top, "left":leftSide});
                    currentPlayer.currentPosition = 10;
                    if (currentPlayer.playeName == player1.playeName) {
                        currentPlayer.isInJail = true;
                    } else {
                        currentPlayer.isInJail = false;
                    }
                } else {
                    let pos = Number($('#p'+p+'Icon').css("left").replace(/px/g, "")) - 110;
                    $('#p'+p+'Icon').css({"left":pos});
                }
            } else if (currentPlayer.currentPosition == 31) {
                let pos = Number($('#p'+p+'Icon').css("top").replace(/px/g, "")) - (110);
                $('#p'+p+'Icon').css({"top":pos});
            } else if(currentPlayer.currentPosition > 31 && currentPlayer.currentPosition < 41){
                let pos = Number($('#p'+p+'Icon').css("top").replace(/px/g, "")) - (110);
                $('#p'+p+'Icon').css({"top":pos});
            } else if(currentPlayer.currentPosition == 41) {
                currentPlayer.currentPosition = 0;
                let pos = Number($('#p'+p+'Icon').css("left").replace(/px/g, "")) + 110;
                $('#p'+p+'Icon').css({"left":pos, "top": '10px'});
            }
            else {
                let pos = Number($('#p'+p+'Icon').css("left").replace(/px/g, "")) + 110;
                $('#p'+p+'Icon').css({"left":pos});
            }
            console.log('ROll P' +currentPlayer.currentPosition);
            currentPlayer.currentPosition++;
        }
    
        gameLogic();

        log.push(
            currentPlayer.playeName + ' rolled ' + currentRoll + ' and amt ' + currentPlayer.amount + ' and moved ' +  currentPlayer.currentPosition
        );

    } else {
        log.push(
            currentPlayer.playeName + ' rolled ' + currentRoll + ' and in jailed ' + currentPlayer.amount + ' and moved ' +  currentPlayer.currentPosition
        );
    }
    
    
    setTimeout(() => {
        if (isGameOver) {
            return;
        }
        document.getElementById('diceContainer').setAttribute('class', 'diceContainer hidden'); 
        if (currentPlayer.playeName == player1.playeName) {
            p1.currentPosition = currentPlayer.currentPosition;
            currentPlayer = player2;
        } else {
            p2.currentPosition = currentPlayer.currentPosition
            currentPlayer = player1;
        }
        currentRoll = 0;
        $('#btnRollDice').prop( "disabled", false );
        readyPlayers();
    }, 1000);

    checkGameStatus();
    
}

$(document).ready(function() {
   readyPlayers();
});

$('#btnRollDice').click(function() {
    rollDice();
});

const gameLogic = () => {

    if (currentPlayer.playeName == player1.playeName) {
        let tile = player1.getLandingTile();
        if (tile.tileType.rule == rule.budgetLimit) {
            if(playersMoveOut) {
                player1.landOnTravelBudget(onSuccessPassTravelBudget);
            }
        } else if (tile.tileType.rule == rule.property) {
            player1.landedOnProperty(tile,
                onPromptUserToBuy,
                onFailMoneyProcess,
                onPayTaxDuetoOtherPlayerProps );
        } else if (tile.tileType.rule == rule.tax) {
            player1.payGovTaxes(tile, onPayGovTax);
        } else if (tile.tileType.rule == rule.mystery) {
            console.log('aaadsddsm');
            player1.landOnMysteryCard(onSuccessMystery);
        }
    } else {
        let tile = player2.getLandingTile();
        if (tile.tileType.rule == rule.budgetLimit) {
            if(playersMoveOut) {
                player2.landOnTravelBudget(onSuccessPassTravelBudget);
            }
        } else if (tile.tileType.rule == rule.property) {
            player2.landedOnProperty(tile,
                onPromptUserToBuy,
                onFailMoneyProcess,
                onPayTaxDuetoOtherPlayerProps );
        } else if (tile.tileType.rule == rule.tax) {
            player2.payGovTaxes(tile, onPayGovTax);
        } else if (tile.tileType.rule == rule.mystery) {
            player2.landOnMysteryCard(onSuccessMystery);
        }
    }

}

function onSuccessPassTravelBudget() {
    window.alert( currentPlayer.playeName +' got $200');
}

function onPromptUserToBuy(tile) {
    //ai
    if(currentPlayer.playeName == player2.playeName) {
        if (currentPlayer.amount > (tile.tileAmount + 50 ) ) {
            player2.buyProperty(tile, onSuccessBuy);
        } else {
            console.log('Player Skipped');
        }
    } else{
        if (confirm("Buy " + tile.tileName + "?")) {
            if(currentPlayer.playeName == player1.playeName) {
                player1.buyProperty(tile, onSuccessBuy);
            } else {
                player2.buyProperty(tile, onSuccessBuy);
            }
          } else {
              console.log('Player Skipped');
        }
    }
}

function onFailMoneyProcess() {
    window.alert(currentPlayer.playeName + ' do not have enough money');
}

function onPayGovTax(amt){
    window.alert(currentPlayer.playeName +' has to pay ' + amt + ' as Tax.');
}

function onPayTaxDuetoOtherPlayerProps(tax) {
    window.alert(currentPlayer.playeName +' paid '+ tax + " for landing on other player's property");
}

function onSuccessBuy(amt) {
    window.alert(currentPlayer.playeName +' bought property that worth '+amt);
}

function onSuccessMystery(random, plusOrMinus) {
    window.alert(
        currentPlayer.playeName + ' draws Mystery card and ' + (plusOrMinus == 0 ? 'rewarded ' : 'taxed ') + '$'+random 
    );
}

const checkGameStatus = () => {
    if (player1.amount <= 0 ) {
        isGameOver = true;
        window.alert(player2.playeName+' Wins');
    } else if (player2.amount <= 0 ) {
        isGameOver = true;
        window.alert(player1.playeName+' Wins');
    }

    if (isGameOver) {
        $('#btnRollDice').prop( "disabled", true );
    }
}

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left ,
      top: rect.top 
  }
}