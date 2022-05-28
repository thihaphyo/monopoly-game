
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
        1,"Monopoly Pass", new TileType("budgetLimit", rule.budgetLimit), 200, null , null
    ),
    new Tiles(
        2,"Tokyo", new TileType("property", rule.property), 200, null, "assets/img/Japan/tokyo.png"
    ),
    new Tiles(
        3,"MysteryCard", new TileType("mystery", rule.mystery), null , null , null
    ),
    new Tiles(
        4,"Oasaka", new TileType("property", rule.property), 200, null, "assets/img/Japan/osaka.png"
    ),
    new Tiles(
        5,"City Tax", new TileType("tax", rule.tax), 100,null, null
    ),
    new Tiles(
        6,"Toll Gate", new TileType("tax", rule.tax), 100,null, null
    ),
    new Tiles(
        7,"New York", new TileType("property", rule.property), 100, null, "assets/img/United State/statue-of-liberty.png"
    ),
    new Tiles(
        8,"MysteryCard", new TileType("mystery", rule.mystery),null, null , null
    ),
    new Tiles(
        9,"San Fraciso", new TileType("property", rule.property), 100 , null, "assets/img/United State/sanfra.png"
    ),
    new Tiles(
        10,"Washington", new TileType("property", rule.property), 100, null, "assets/img/United State/washindc.png"
    ),
    new Tiles(
        11,"Police Station", new TileType("jail", rule.jail), null , null ,null
    ),
    new Tiles(
        12,"London", new TileType("property", rule.property), 140 , null, "assets/img/London/london.png"
    ),
    new Tiles(
        13,"Museum", new TileType("property", rule.property), 140 , null, "assets/img/London/museum.png" 
    ),
    new Tiles(
        14,"MysteryCard", new TileType("mystery", rule.mystery), null, null, null
    ),
    new Tiles(
        15,"Tower", new TileType("property", rule.property), 140 , null, "assets/img/London/tower.png"
    ),
    new Tiles(
        16,"Toll Gate", new TileType("tax", rule.tax), 100 ,null, null
    ),
    new Tiles(
        17,"Aqaurium", new TileType("property", rule.property), 180 ,null, "assets/img/Dubai/aqa.png"
    ),
    new Tiles(
        18,"Ski Dubai", new TileType("property", rule.property), 180 ,null, "assets/img/Dubai/ski.png"
    ),
    new Tiles(
        19,"Rest", new TileType("free", rule.free), 0 , null,null
    ),
    new Tiles(
        20,"Marina Bay", new TileType("property", rule.property), 220 , null, "assets/img/Singapore/maribay.png"
    ),
    new Tiles(
        21,"MysteryCard", new TileType("mystery", rule.mystery), null ,null, null
    ),
    new Tiles(
        22,"Chinatown", new TileType("property", rule.property), 220 ,null, "assets/img/Singapore/chinatown.png"
    ),
    new Tiles(
        23,"Universal", new TileType("property", rule.property), 240,null, "assets/img/Singapore/universal.png"
    ),
    new Tiles(
        24,"Toll Gate", new TileType("tax", rule.tax), 100 , null,null
    ),
    new Tiles(
        25,"Jardin Du", new TileType("property", rule.property), 260 ,null, "assets/img/paris/paris1.png"
    ),
    new Tiles(
        26,"Place dela", new TileType("property", rule.property), 260 ,null, "assets/img/paris/paris2.png"
    ),
    new Tiles(
        29,"City Tax", new TileType("tax", rule.tax), 100 , null,null
    ),
    new Tiles(
        27,"Eiffle Tower", new TileType("property", rule.property), 280 , null, "assets/img/paris/eiffle tower.png"
    ),
    new Tiles(
        28,"Police", new TileType("police", rule.police), 300 , null, null
    ),
    new Tiles(
        29,"Jeju Do", new TileType("property", rule.property), 300, null, "assets/img/Korea/jeju.png"
    ),
    new Tiles(
        30,"Seoul", new TileType("property", rule.property), 300, null, "assets/img/Korea/seoul.png"
    ),
    new Tiles(
        31,"Food Mall", new TileType("free", rule.free), 0 , null, null
    ),
    new Tiles(
        32,"Bulguka", new TileType("property", rule.property), 320 , null, "assets/img/Korea/korea1.png"
    ),
    new Tiles(
        33,"Toll Gate", new TileType("tax", rule.tax), 100 , null , null
    ),
    new Tiles(
        34,"MysteryCard", new TileType("mystery", rule.mystery), null , null , null
    ),
    new Tiles(
        35,"Pagodas", new TileType("property", rule.property), 350 , null, "assets/img/Thailand/pagoda.png"
    ),
    new Tiles(
        36,"Mall", new TileType("property", rule.property), 400 , null, "assets/img/Thailand/shopping mall.png"
    ),
    new Tiles(
        37,"Monopoly Pass", new TileType("budgetLimit", rule.budgetLimit), 200 ,null ,null
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

Player.prototype.collectTax = function(tax) {
    this.amount+=tax;
}

Player.prototype.landedOnProperty = function(property,
    onPromptUserToBuy,
    onFailMoneyProcess,
    onPayTax,onCollectRent) {
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
        // landed on owned property collect rent
        let rent = property.tileAmount * 0.08;
        this.collectTax(rent);
        onCollectRent(rent);
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

function Tiles(tileID, tileName, tileType, tileAmount, ownedBy = null, image) {
    this.tileID = tileID;
    this.tileName = tileName;
    this.tileType = tileType;
    this.tileAmount = tileAmount;
    this.ownedBy =  ownedBy;
    this.image = image;
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