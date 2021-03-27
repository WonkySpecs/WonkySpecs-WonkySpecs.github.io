function cardValues() {
    const vals  = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10",
                  "J", "Q", "K"];
    const suits = ["C", "D", "H", "S"];
    return suits.flatMap(s => vals.map(v => v + s)).concat(["RJ", "BJ"]);
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

function getInfoString(deck) {
    const lastDraw = deck.drawn.length > 0 
        ? deck.drawn[deck.drawn.length - 1] 
        : false;
    const drawMessage = lastDraw
        ? ", drew: " + lastDraw
        : "";
    return "Cards remaining: " + deck.undrawn.length + drawMessage;
}

function createBtn(text) {
    const b = document.createElement('button');
    b.innerHTML = text;
    return b;
}

function createDeckContainer(parElem) {
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
    info.innerHTML = getInfoString(deck);

    drawBtn.onclick = _ => {
        const drew = draw(deck);
        info.innerHTML = getInfoString(deck)
    };

    reshuffleBtn.onclick = _ => {
        resetDeck(deck);
        info.innerHTML = "Reshuffled";
    };

    grouping.appendChild(nameContainer);
    grouping.appendChild(drawBtn);
    grouping.appendChild(reshuffleBtn);
    grouping.appendChild(info);
    parElem.appendChild(grouping);
}

window.onload = w => {
    const container = document.querySelector("main");
    document.querySelector("#add-deck-btn").onclick = _ => {
        createDeckContainer(container);
    }
    createDeckContainer(container);
};
