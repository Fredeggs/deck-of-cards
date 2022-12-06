const URL = "https://deckofcardsapi.com/";
let newDeckID = null;

// Problem 1
async function drawACard() {
    let newCard = await axios.get(URL + "api/deck/new/draw/?count=1");
    console.log(newCard.data.cards[0].value + " of " + newCard.data.cards[0].suit);
}
drawACard();

// Problem 2
let firstCard = null;

async function twoCardsFromNewDeck() {
    let drawnCards = []
    let firstDraw = await axios.get(`${URL}api/deck/new/draw/`);
    let deckID = firstDraw.data.deck_id;
    drawnCards.push(firstDraw.data.cards[0]);
    let secondDraw = await axios.get(`${URL}api/deck/${deckID}/draw/`);
    drawnCards.push(secondDraw.data.cards[0]);

    for (card of drawnCards) {
        console.log(card.value + " of " + card.suit);
    }
}

twoCardsFromNewDeck()

// Problem 3

$("body").on("click", "button", gimmeCard);

async function gimmeCard() {
    if (newDeckID !== null) {
        let res = await axios.get(`${URL}api/deck/${newDeckID}/draw/`)
        $("body").append(`<img src=${res.data.cards[0].image}></img>`);
    } else {
        let res = await axios.get(`${URL}api/deck/new/draw/`)
        $("body").append(`<img src=${res.data.cards[0].image}></img>`);
        newDeckID = res.data.deck_id;
    }
}