var rs = require('readline-sync')

function initializeDeck() {
    const deck = [];
    const suits = ['hearts', 'diamonds', 'spades', 'clubs'];
    const values = '2,3,4,5,6,7,8,9,10,J,Q,K,A';
    for (let value of values.split(',')) {
        for (let suit of suits) {
            deck.push({
                value,
                suit
            })
        }
    }
    return deck;
}

function drawCard(deck, drawnCards) {
    const card = deck.pop();
    drawnCards.push(card);
    return card;
}

function drawMultiple(numCards, deck, drawnCards) {
    const cards = [];
    for (let i = 0; i < numCards; i++) {
        cards.push(drawCard(deck, drawnCards));
    }
    return cards;
}

function shuffle(deck) {
    //loop over array backwards
    for (let i = deck.length - 1; i > 0; i--) {
        //pick random index before current element
        let j = Math.floor(Math.random() * (i + 1));
        //swap
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

const firstDeck = initializeDeck();
const drawnCards = [];
shuffle(firstDeck);


function totalHand(user) {
    let total = 0;
    for (let i = 0; i < user.length; i++) {
        if (user[i].value === 'K' || user[i].value === 'Q' || user[i].value === 'J') {
            total += 10;
        } else if (user[i].value === 'A') {
            if ((total + 11) > 21) {
                total += 1;
            } else {
                total += 11;
            }
        } else {
            total += Number(user[i].value)
        }
    }
    return total;
}


function newGame() {
    const player = drawMultiple(2, firstDeck, drawnCards);
    const dealer = drawMultiple(2, firstDeck, drawnCards);

    console.log('Dealer Hand:', ...dealer, 'Dealer Total:', totalHand(dealer))
    console.log('Player Hand:', ...player, 'Player Total:', totalHand(player))
    const hit = rs.keyInYN('Do you want to hit?')
    if (hit == true) {
        doYouWantToHit(player)
    } else {
        scoreGame(dealer, player)
    }

    dealerHit(dealer)
    console.log('Dealer Hand:', ...dealer, 'Dealer Total:', totalHand(dealer))
    console.log('Player Hand:', ...player, 'Player Total:', totalHand(player))

    scoreGame(dealer, player);

}

function scoreGame(user1, user2) {
    if (totalHand(user1) > 21) {
        console.log(`Dealer lost! Player Wins!`)
    } else if (totalHand(user2) > 21) {
        console.log(`Player lost! Dealer Wins!`)
    } else {
        if (totalHand(user1) > totalHand(user2)) {
            console.log('Dealer Wins!')
        } else if (totalHand(user2) > totalHand(user1)) {
            console.log(('Player Wins'))
        } else {
            console.log('its a draw')
        }
    }
}

function doYouWantToHit(user) {
    user.push(drawCard(firstDeck, drawnCards))
    return totalHand(user)
}

function dealerHit(user) {
    while (totalHand(user) < 17) {
        user.push(drawCard(firstDeck, drawnCards))
    }
    return totalHand(user)
}

const start = rs.keyInYN('Would you like to play a game?');
if (start === true) {
    newGame();
} else {
    console.log('Why did you open this if you do not want to play?')
}