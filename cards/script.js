function cardValues() {
    const suits = ["clubs", "diamonds", "hearts", "spades"]
    const vals  = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10",
                  "Jack", "Queen", "King"];
    return suits.flatMap(s => vals.map(v => ({ suit: s, val: v })))
        .concat(["Red Joker", "Black Joker"]);
}

function createDeck() {
    return {
        drawn: [],
        undrawn: cardValues(),
    };
}

function resetDeck(deck) {
    deck.drawn = []
    deck.undrawn = cardValues();
}

function draw(deck) {
    const i = Math.floor(Math.random() * deck.undrawn.length);
    const drawn = deck.undrawn.splice(i, 1);
    if (drawn) {
        deck.drawn = deck.drawn.concat(drawn);
    }
    return drawn;
}

function cardString(card, suitMapping) {
    if (card.suit === undefined) return card;
    const suitStr = suitMapping[card.suit] === undefined
        ? card.suit
        : suitMapping[card.suit];
    return card.val + " of " + suitStr;
}

function getInfoString(deck, suitMapping) {
    const lastDraw = deck.drawn.length > 0 
        ? deck.drawn[deck.drawn.length - 1] 
        : false;
    const drawMessage = lastDraw
        ? ", drew: " + cardString(lastDraw, suitMapping)
        : "";
    return "Cards remaining: " + deck.undrawn.length + drawMessage;
}

function createBtn(text) {
    const b = document.createElement('button');
    b.innerHTML = text;
    return b;
}

function createDeckContainer(initSuitMapping) {
    let suitMapping = initSuitMapping;
    console.log(suitMapping);
    const grouping = document.createElement("div");
    grouping.classList.add("deck-container");

    const nameContainer = document.createElement("div");
    const nameInput = document.createElement("input");
    nameInput.placeholder = "Enter name";
    nameInput.classList.add("name-label");
    nameContainer.appendChild(nameInput);

    const deck = createDeck();
    const drawBtn = createBtn("Draw");
    const reshuffleBtn = createBtn("Reshuffle");
    const info = document.createElement("div");
    info.innerHTML = getInfoString(deck, initSuitMapping);

    let reshuffled = false;
    drawBtn.onclick = _ => {
        const drew = draw(deck);
        info.innerHTML = getInfoString(deck, suitMapping)
        reshuffled = false;
    };

    reshuffleBtn.onclick = _ => {
        resetDeck(deck);
        info.innerHTML = "Reshuffled";
        reshuffled = true;
    };

    grouping.appendChild(nameContainer);
    grouping.appendChild(drawBtn);
    grouping.appendChild(reshuffleBtn);
    grouping.appendChild(info);
    return {
        rootElem: grouping,
        redraw: sm => {
            suitMapping = sm;
            if (!reshuffled) info.innerHTML = getInfoString(deck, sm);
        }
    };
}

function getActiveSuitMapping() {
    const standard = {
        "clubs": "Clubs",
        "diamonds": "Diamonds",
        "hearts": "Hearts",
        "spades": "Spades",
    };
    const malifaux = {
        "clubs": "Tomes",
        "diamonds": "Masks",
        "hearts": "Rams",
        "spades": "Crows",
    };

    const isMalifaux = document.getElementById("malifauxCheckbox").checked;
    return isMalifaux ? malifaux : standard;
}


window.onload = w => {
    const container = document.querySelector("main");
    const decks = [];
    const addDeck = () => {
        const deckContainer = createDeckContainer(getActiveSuitMapping());
        decks.push(deckContainer);
        container.appendChild(deckContainer.rootElem);
    }
    document.getElementById("addDeckBtn").onclick = _ => {
        addDeck();
    }
    addDeck();
    malifauxCheckbox.addEventListener('change', ev => {
        decks.forEach(d => d.redraw(getActiveSuitMapping()));
    });
};
