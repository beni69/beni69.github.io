var kareszCount = 0;
var kareszContainer;
var sidebar;
var kareszCountText;
var kareszPerSecText;
var kareszImage
var kareszGeneratorPriceText;
var kpc = 1;
var kps = 0;
var kareszGeneratorPrice = 50

function onPageLoad() {
  kareszContainer = document.querySelector("#kareszContainer");
  sidebar = document.querySelector("#sidebar");
  kareszCountText = kareszContainer.querySelector("#kareszCountText")
  kareszPerSecText = kareszContainer.querySelector("#kareszPerSecText")
  kareszImage = kareszContainer.querySelector("#kareszImage")
  kareszGeneratorPriceText = sidebar.querySelector("#kareszGeneratorPriceText")
  if (localStorage.getItem("saved") != "true") {
    saveGame();
  }
  loadGame(false);
  setInterval(tick, 1000)
}

function tick() {
  kareszCount+=kps
  update()
}
function buyKareszGenerator(num) {
  for (var i = 0; i < num && kareszGeneratorPrice <= kareszCount; i++) {
    kareszCount-=kareszGeneratorPrice
    kps+=1
    kareszGeneratorPrice*=2;
    update();
  }
}
function kareszClicked() {
  earn(kpc);
}
function earn(amount) {
  kareszCount+=amount
  update();
}
function update() {
  kareszCountText.innerHTML = `Karesz count: ${kareszCount}`
    kareszPerSecText.innerHTML = `${kps} Karesz/sec`
  kareszGeneratorPriceText.innerHTML = "Price: " + kareszGeneratorPrice; + " Karesz"
}
function saveGame() {
  localStorage.setItem("saved", true);
  localStorage.setItem("kareszCount", kareszCount);
  localStorage.setItem("kps", kps);
}
function loadGame(shouldAsk) {
  if (shouldAsk) {
    if(!confirm(`Are you sure you want to load your save with ${parseInt(localStorage.getItem("kareszCount"))} Karesz'`)) {
      return;
    }
  }
  kareszCount = parseInt(localStorage.getItem("kareszCount"));
  kps = parseInt(localStorage.getItem("kps"));
  update();
}
function resetGame() {
  if(confirm(`Are you sure you want to reset?\nYou will lose all ${kareszCount} of you Karesz'`)) {
    localStorage.clear();
    kareszCount = 0;
    kps = 0;
    saveGame();
    loadGame(false);
  }
}
