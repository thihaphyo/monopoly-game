const rule = {
  budgetLimit: 0,
  property: 1,
  mystery: 2,
  tax: 3,
  jail: 4,
  free: 5,
  police: 6,
};

let tiles = [
  new Tiles(
    1,
    "Monopoly Pass",
    new TileType("budgetLimit", rule.budgetLimit),
    200,
    null,
    null
  ),
  new Tiles(
    2,
    "Tokyo",
    new TileType("property", rule.property),
    200,
    null,
    "assets/img/Japan/tokyo.png",
    "var(--boardCardColor1)"
  ),
  new Tiles(
    3,
    "MysteryCard",
    new TileType("mystery", rule.mystery),
    null,
    null,
    null
  ),
  new Tiles(
    4,
    "Oasaka",
    new TileType("property", rule.property),
    200,
    null,
    "assets/img/Japan/osaka.png",
    "var(--boardCardColor1)"
  ),
  new Tiles(5, "City Tax", new TileType("tax", rule.tax), 100, null, null),
  new Tiles(6, "Toll Gate", new TileType("tax", rule.tax), 100, null, null),
  new Tiles(
    7,
    "New York",
    new TileType("property", rule.property),
    100,
    null,
    "assets/img/United State/statue-of-liberty.png",
    "var(--boardCardColor2)"
  ),
  new Tiles(
    8,
    "MysteryCard",
    new TileType("mystery", rule.mystery),
    null,
    null,
    null
  ),
  new Tiles(
    9,
    "San Fraciso",
    new TileType("property", rule.property),
    100,
    null,
    "assets/img/United State/sanfra.png",
    "var(--boardCardColor2)"
  ),
  new Tiles(
    10,
    "Washington",
    new TileType("property", rule.property),
    100,
    null,
    "assets/img/United State/washindc.png",
    "var(--boardCardColor2)"
  ),
  new Tiles(
    11,
    "Police Station",
    new TileType("jail", rule.jail),
    null,
    null,
    null
  ),
  new Tiles(
    12,
    "London",
    new TileType("property", rule.property),
    140,
    null,
    "assets/img/London/london.png",
    "var(--boardCardColor3)"
  ),
  new Tiles(
    13,
    "Museum",
    new TileType("property", rule.property),
    140,
    null,
    "assets/img/London/museum.png",
    "var(--boardCardColor3)"
  ),
  new Tiles(
    14,
    "MysteryCard",
    new TileType("mystery", rule.mystery),
    null,
    null,
    null
  ),
  new Tiles(
    15,
    "Tower",
    new TileType("property", rule.property),
    140,
    null,
    "assets/img/London/tower.png",
    "var(--boardCardColor3)"
  ),
  new Tiles(16, "Toll Gate", new TileType("tax", rule.tax), 100, null, null),
  new Tiles(
    17,
    "Aqaurium",
    new TileType("property", rule.property),
    180,
    null,
    "assets/img/Dubai/aqa.png",
    "var(--boardCardColor4)"
  ),
  new Tiles(
    18,
    "Ski Dubai",
    new TileType("property", rule.property),
    180,
    null,
    "assets/img/Dubai/ski.png",
    "var(--boardCardColor4)"
  ),
  new Tiles(19, "Rest", new TileType("free", rule.free), 0, null, null),
  new Tiles(
    20,
    "Marina Bay",
    new TileType("property", rule.property),
    220,
    null,
    "assets/img/Singapore/maribay.png",
    "var(--boardCardColor5)"
  ),
  new Tiles(
    21,
    "MysteryCard",
    new TileType("mystery", rule.mystery),
    null,
    null,
    null
  ),
  new Tiles(
    22,
    "Chinatown",
    new TileType("property", rule.property),
    220,
    null,
    "assets/img/Singapore/chinatown.png",
    "var(--boardCardColor5)"
  ),
  new Tiles(
    23,
    "Universal",
    new TileType("property", rule.property),
    240,
    null,
    "assets/img/Singapore/universal.png",
    "var(--boardCardColor5)"
  ),
  new Tiles(24, "Toll Gate", new TileType("tax", rule.tax), 100, null, null),
  new Tiles(
    25,
    "Jardin Du",
    new TileType("property", rule.property),
    260,
    null,
    "assets/img/paris/paris1.png",
    "var(--boardCardColor6)"
  ),
  new Tiles(
    26,
    "Place dela",
    new TileType("property", rule.property),
    260,
    null,
    "assets/img/paris/paris2.png",
    "var(--boardCardColor6)"
  ),
  new Tiles(27, "City Tax", new TileType("tax", rule.tax), 100, null, null),
  new Tiles(
    28,
    "Eiffle Tower",
    new TileType("property", rule.property),
    280,
    null,
    "assets/img/paris/eiffle tower.png",
    "var(--boardCardColor6)"
  ),
  new Tiles(29, "Police", new TileType("police", rule.police), 300, null, null),
  new Tiles(
    30,
    "Jeju Do",
    new TileType("property", rule.property),
    300,
    null,
    "assets/img/Korea/jeju.png",
    "var(--boardCardColor7)"
  ),
  new Tiles(
    31,
    "Seoul",
    new TileType("property", rule.property),
    300,
    null,
    "assets/img/Korea/seoul.png",
    "var(--boardCardColor7)"
  ),
  new Tiles(32, "Food Mall", new TileType("free", rule.free), 0, null, null),
  new Tiles(
    33,
    "Bulguka",
    new TileType("property", rule.property),
    320,
    null,
    "assets/img/Korea/korea1.png",
    "var(--boardCardColor7)"
  ),
  new Tiles(
    34,
    "MysteryCard",
    new TileType("mystery", rule.mystery),
    null,
    null,
    null
  ),
  new Tiles(
    35,
    "Pagodas",
    new TileType("property", rule.property),
    350,
    null,
    "assets/img/Thailand/pagoda.png",
    "var(--boardCardColor8)"
  ),
  new Tiles(
    36,
    "Mall",
    new TileType("property", rule.property),
    400,
    null,
    "assets/img/Thailand/shopping mall.png",
    "var(--boardCardColor8)"
  ),
  new Tiles(
    37,
    "Monopoly Pass",
    new TileType("budgetLimit", rule.budgetLimit),
    200,
    null,
    null
  ),
];

function Player(
  playeName,
  amount,
  ownedProperties,
  isInJail = false,
  currentPosition = 1
) {
  this.playeName = playeName;
  this.amount = amount;
  this.ownedProperties = ownedProperties;
  this.isInJail = isInJail;
  this.currentPosition = currentPosition;
}

Player.prototype.getLandingTile = function () {
//   let tile = tiles[this.currentPosition - 1];
//   console.log(this.currentPosition - 1);
  return tiles.filter((v) => v.tileID == this.currentPosition)[0];
};

Player.prototype.landOnMysteryCard = function (onSuccess) {
  let random = Math.floor(Math.random() * (100 - 20) + 20);
  let plusOrMinus = Math.floor(Math.random() * 2);
  if (plusOrMinus == 0) {
    this.amount += random;
  } else {
    this.amount -= random;
  }
  onSuccess(random, plusOrMinus);
};

Player.prototype.landOnTravelBudget = function (onSuccess) {
  this.amount += 200;
  onSuccess();
};

Player.prototype.collectTax = function (tax) {
  this.amount += tax;
};

Player.prototype.landedOnProperty = function (
  property,
  onPromptUserToBuy,
  onFailMoneyProcess,
  onPayTax,
  onCollectRent
) {
  if (property.ownedBy == null) {
    //can buy
    if (this.amount >= property.tileAmount) {
      console.log("asdsafscsfvsf");
      onPromptUserToBuy(property);
    } else {
      onFailMoneyProcess();
    }
  } else if (property.ownedBy.playeName != this.playeName) {
    //landed on other player's property Pay TAX!!!!
    let tax = property.tileAmount * 0.1;
    this.deduct(tax);
    onPayTax(tax, property);
  } else {
    // landed on owned property collect rent
    let rent = property.tileAmount * 0.08;
    this.collectTax(rent);
    onCollectRent(rent, property);
    console.log("DO NOTHING");
  }
};

Player.prototype.buyProperty = function (property, onSuccess) {
  this.deduct(property.tileAmount);
  tiles[tiles.indexOf(property)].addOwner(this);
  console.log(tiles);
  this.ownedProperties.push(property.tileName);
  onSuccess(property.tileAmount);
};

Player.prototype.payGovTaxes = function (property, onSuccess) {
  this.deduct(property.tileAmount);
  onSuccess(property.tileAmount);
};

Player.prototype.deduct = function (amt) {
  this.amount -= amt;
};

function Tiles(
  tileID,
  tileName,
  tileType,
  tileAmount,
  ownedBy = null,
  image,
  bgColor
) {
  this.tileID = tileID;
  this.tileName = tileName;
  this.tileType = tileType;
  this.tileAmount = tileAmount;
  this.ownedBy = ownedBy;
  this.image = image;
  this.bgColor = bgColor;
}

Tiles.prototype.isOwnedByPlayer = function (player) {
  return this.ownedBy.playeName == player.playeName;
};

Tiles.prototype.addOwner = function (player) {
  if (this.ownedBy == null) {
    this.ownedBy = player;
  }
};

function TileType(type, rule) {
  this.type = type;
  this.rule = rule;
}
