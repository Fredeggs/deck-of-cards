const URL = "https://deckofcardsapi.com/";
let newDeckID = null;

// Problem 1
function drawACard() {
  return new Promise((resolve, reject) => {
    let newCard = axios
      .get(URL + "api/deck/new/draw/?count=1")
      .then((res) => {
        console.log("Problem 1: " + res.data.cards[0].value);
        console.log("Problem 1: " + res.data.cards[0].suit);
      })
      .catch((err) => console.log("Problem 1: " + err));
  });
}

drawACard();

// Problem 2
let firstCard = null;
axios
  .get(`${URL}api/deck/new/draw/`)
  .then((data) => {
    firstCard = data.data.cards[0];
    let deckId = data.data.deck_id;
    return axios.get(`${URL}api/deck/${deckId}/draw/`);
  })
  .then((data) => {
    let secondCard = data.data.cards[0];
    [firstCard, secondCard].forEach(function (card) {
      console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
    });
  });

// Problem 3
$("body").on("click", "button", () => {
  if (newDeckID !== null) {
    axios.get(`${URL}api/deck/${newDeckID}/draw/`).then((data) => {
      let drawnCard = data.data.cards[0];
      $("body").append(`<img src=${drawnCard.image}></img>`);
    });
  } else {
    axios.get(`${URL}api/deck/new/draw/`).then((data) => {
      let drawnCard = data.data.cards[0];
      $("body").append(`<img src=${drawnCard.image}></img>`);
      newDeckID = data.data.deck_id;
    });
  }
});
