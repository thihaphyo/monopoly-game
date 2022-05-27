
const rule = {
    "budgetLimit" : 0,
    "property" : 1,
    "mystery" : 2,
    "tax":3,
    "jail":4,
    "free": 5,
    "police":6
}

let tiles = [
    new Tiles(
        1,"Monopoly Pass", new TileType("budgetLimit", rule.budgetLimit), 200
    ),
    new Tiles(
        2,"Tokyo", new TileType("property", rule.property), 200
    ),
    new Tiles(
        3,"MysteryCard", new TileType("mystery", rule.mystery), null
    ),
    new Tiles(
        4,"Oasaka", new TileType("property", rule.property), 200
    ),
    new Tiles(
        5,"City Tax", new TileType("tax", rule.tax), 100
    ),
    new Tiles(
        6,"Toll Gate", new TileType("tax", rule.tax), 100
    ),
    new Tiles(
        7,"New York", new TileType("property", rule.property), 100
    ),
    new Tiles(
        8,"MysteryCard", new TileType("mystery", rule.mystery), null
    ),
    new Tiles(
        9,"San Fraciso", new TileType("property", rule.property), 100
    ),
    new Tiles(
        10,"Washington", new TileType("property", rule.property), 100
    ),
    new Tiles(
        11,"Police Station", new TileType("jail", rule.jail), null
    ),
    new Tiles(
        12,"London", new TileType("property", rule.property), 140
    ),
    new Tiles(
        13,"Museum", new TileType("property", rule.property), 140
    ),
    new Tiles(
        14,"MysteryCard", new TileType("mystery", rule.mystery), null
    ),
    new Tiles(
        15,"Tower", new TileType("property", rule.property), 140
    ),
    new Tiles(
        16,"Toll Gate", new TileType("tax", rule.tax), 100
    ),
    new Tiles(
        17,"Aqaurium", new TileType("property", rule.property), 180
    ),
    new Tiles(
        18,"Ski Dubai", new TileType("property", rule.property), 180
    ),
    new Tiles(
        19,"Food Mall", new TileType("free", rule.free), 0
    ),
    new Tiles(
        20,"Barj Ai", new TileType("property", rule.property), 200
    ),
    new Tiles(
        21,"Rest", new TileType("free", rule.free), 0
    ),
    new Tiles(
        22,"Marina Bay", new TileType("property", rule.property), 220
    ),
    new Tiles(
        23,"MysteryCard", new TileType("mystery", rule.mystery), null
    ),
    new Tiles(
        24,"Chinatown", new TileType("property", rule.property), 220
    ),
    new Tiles(
        25,"Universal", new TileType("property", rule.property), 240
    ),
    new Tiles(
        26,"Toll Gate", new TileType("tax", rule.tax), 100
    ),
    new Tiles(
        27,"Jardin Du", new TileType("property", rule.property), 260
    ),
    new Tiles(
        28,"Place dela", new TileType("property", rule.property), 260
    ),
    new Tiles(
        29,"City Tax", new TileType("tax", rule.tax), 100
    ),
    new Tiles(
        30,"Eiffle Tower", new TileType("property", rule.property), 280
    ),
    new Tiles(
        31,"Police", new TileType("police", rule.police), 300
    ),
    new Tiles(
        32,"Jeju Do", new TileType("property", rule.property), 300
    ),
    new Tiles(
        33,"Seoul", new TileType("property", rule.property), 300
    ),
    new Tiles(
        34,"Food Mall", new TileType("free", rule.free), 0
    ),
    new Tiles(
        35,"Bulguka", new TileType("property", rule.property), 320
    ),
    new Tiles(
        36,"Toll Gate", new TileType("tax", rule.tax), 100
    ),
    new Tiles(
        37,"MysteryCard", new TileType("mystery", rule.mystery), null
    ),
    new Tiles(
        38,"Pagodas", new TileType("property", rule.property), 350
    ),
    new Tiles(
        39,"City Tax", new TileType("tax", rule.tax), 100
    ),
    new Tiles(
        40,"Mall", new TileType("property", rule.property), 400
    ),
    new Tiles(
        41,"Monopoly Pass", new TileType("budgetLimit", rule.budgetLimit), 200
    )
];

function Player(playeName, amount, ownedProperties, isInJail = false, currentPosition = 1) {
    this.playeName = playeName;
    this.amount = amount;
    this.ownedProperties = ownedProperties;
    this.isInJail = isInJail;
    this.currentPosition = currentPosition;
}

Player.prototype.getLandingTile = function() {
    let tile = tiles[this.currentPosition-1];
    console.log(this.currentPosition-1);
    return tile;
}

Player.prototype.landOnMysteryCard = function(onSuccess) {
    let random = Math.floor(Math.random() * (100 - 20) + 20);
    let plusOrMinus = Math.floor(Math.random() * (0 - 1) + 1);
    if (plusOrMinus == 0) {
        this.amount+=random;
    } else {
        this.amount-=random;
    }
    onSuccess(random, plusOrMinus);
}

Player.prototype.landOnTravelBudget = function(onSuccess) {
    this.amount+=200;
    onSuccess();
}

Player.prototype.landedOnProperty = function(property,
    onPromptUserToBuy,
    onFailMoneyProcess,
    onPayTax) {
    if(property.ownedBy == null) {
        //can buy
        if(this.amount >= property.tileAmount) {
            console.log('asdsafscsfvsf');
            onPromptUserToBuy(property);
        } else {
            onFailMoneyProcess();
        }
    } else if (property.ownedBy.playeName != this.playeName) {
        //landed on other player's property Pay TAX!!!!
        let tax = property.tileAmount * 0.1;
        this.deduct(tax);
        onPayTax(tax);
    } else {
        // landed on owned property
        console.log('DO NOTHING');
    }

}

Player.prototype.buyProperty = function(property, onSuccess) {
    this.deduct(property.tileAmount);
    tiles[tiles.indexOf(property)].addOwner(this); 
    console.log(tiles);
    this.ownedProperties.push(property.tileName);
    onSuccess(property.tileAmount);
} 

Player.prototype.payGovTaxes = function(property, onSuccess) {
    this.deduct(property.tileAmount);
    onSuccess(property.tileAmount);
} 

Player.prototype.deduct = function(amt) {
    this.amount-=amt;
}

function Tiles(tileID, tileName, tileType, tileAmount, ownedBy = null) {
    this.tileID = tileID;
    this.tileName = tileName;
    this.tileType = tileType;
    this.tileAmount = tileAmount;
    this.ownedBy =  ownedBy;
}

Tiles.prototype.isOwnedByPlayer = function(player) {
    return this.ownedBy.playeName == player.playeName;
}

Tiles.prototype.addOwner = function(player){
    if (this.ownedBy == null) {
        this.ownedBy = player;
    }
}

function TileType(type, rule) {
    this.type = type;
    this.rule = rule;
}