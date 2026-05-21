//This class defines the structure of a Card object
//Static methods and variables are accessible from teh Card definition
//The constructor creates a new Card object
//All other methods and variables are only accessible on a specific Card object
class Card {
    //The names of the suits
    static SUIT_SPADES = '♠';
    static SUIT_HEARTS = '♥';
    static SUIT_DIAMONDS = '♦';
    static SUIT_CLUBS = '♣';

    //the definition of each card number value
    static CARD_NUMBERS = {
        'A': {number: 1, name: 'A'},
        2: {number: 2, name: '2'},
        3: {number: 3, name: '3'},
        4: {number: 4, name: '4'},
        5: {number: 5, name: '5'},
        6: {number: 6, name: '6'},
        7: {number: 7, name: '7'},
        8: {number: 8, name: '8'},
        9: {number: 9, name: '9'},
        10: {number: 10, name: '10'},
        'J': {number: 10, name: 'J'},
        'Q': {number: 11, name: 'Q'},
        'K': {number: 12, name: 'K'}
    };

    //this constructor creates a new Card object
    //the resultant card object will have a number and a suit
    constructor(number, suit) {
        //check that the value provided in number parameter is a valid value. It must match one of the keys in the CARD_NUMBERS object
        if (!Card.CARD_NUMBERS[number])
            throw 'Card number must be a number from 2 to 9 or a string of A, J, Q, or K';

        //Check that the value in the suit parameter is equal to one of the four suits defined earlier.
        if (suit != Card.SUIT_SPADES && suit != Card.SUIT_HEARTS && suit != Card.SUIT_DIAMONDS && suit != Card.SUIT_CLUBS)
            throw 'Card suit must be one of Card.SUIT_CLUBS, Card.SUIT_HEARTS, Card.SUIT_DIAMONDS, or Card.SUIT_CLUBS';

        //set the cards number
        this.number = Card.CARD_NUMBERS[number];
        //set the cards suit
        this.suit = suit;
    }

    //returns the two character name of the card
    toShortName() {
        return this.suit + this.number.name;
    }
}

//this class will define a deck of cards and provide some usefull functions that we can call against our deck
class Deck {
    //this constructor will create a new deck with deckCount x 52 cards
    constructor(deckCount) {
        //check that deckCount is a number greater than zero. deckCount can be left blank; we will set it to 1.
        if (!(deckCount === undefined || typeof deckCount === 'number' && deckCount >= 1))
            throw 'deckCount must be a number greater than or equal to 1';

        const cardNumberKeys = Object.keys(Card.CARD_NUMBERS);
        const suits = [
            Card.SUIT_SPADES,
            Card.SUIT_HEARTS,
            Card.SUIT_DIAMONDS,
            Card.SUIT_CLUBS
        ];

        //sets up or array of cards
        this.cards = [];

        for (let d = 0; d < (deckCount ?? 1); d++) {
            //peform the code in this section once for every deck of cards we want to add

            for (let s = 0; s < suits.length; s++) {
                //perform the code in this section once for each suit in a deck

                for (let c = 0; c < cardNumberKeys.length; c++) {
                    //perform ths code in this section once for each card number per suit

                    //this creates a new Card object and adds it to the top of the deck https://www.w3schools.com/jsref/jsref_push.asp
                    this.cards.push(new Card(
                        cardNumberKeys[c],
                        suits[s]
                    ));
                }
            }
        }
    }

    //this function will allow us to shuffle the deck
    shuffle() {
        if (this.cards.length == 0)
            return null; //there aren't any cards to shuffle

        //arrays have a sort function. normally this is used to put a list in order, but if we provide a random number, it will shuffle the deck.

        //I have provided an inline function as the first parameter of the sort function.
        //a and b are the two parameters of my function and it gets called on every pair of elements in the array to check which is bigger than which. if the number returned is positive, a is bigger than b and vice versa if a negative number is returned.
        this.cards.sort((a, b) => {
            //Math.random() returns a random number between 0 and 1.
            //If we double it the number will be between 0 and 2.
            //If we then subtract 1 we get a number between -1 and 1.
            //Technically it would also work if we just subtracted 0.5, but -1 to 1 feels nicer than -0.5 to 0.5.
            return Math.random()*2-1;
        });
    }

    //this function takes the crad off the top of the deck.
    draw() {
        if (this.cards.length == 0)
            return null; //there aren't any cards to draw

        //pop removes the last record from an array https://www.w3schools.com/jsref/jsref_pop.asp
        return this.cards.pop();
    }

    //this function looks at the crad off the top of the deck.
    peek() {
        if (this.cards.length == 0)
            return null; //there aren't any cards to peek

        //pop removes the last record from an array https://www.w3schools.com/jsref/jsref_pop.asp
        return this.cards.shift();
    }

    //this function adds the card to the top of the deck
    addToTop(card) {
        if (!card instanceof Card)
            throw 'card must be a Card object';

        this.cards.push(card);
    }

    //this function adds the card to the bottom of the deck
    addToBottom(card) {
        if (!card instanceof Card)
            throw 'card must be a Card object';

        //splice can add and remove elemnts from a specific spot in an array https://www.w3schools.com/jsref/jsref_splice.asp
        //arrays have anumber for each position in the array. Sort of like rows in excel.
        //The first position in the array is number 0 and the last position is equal to the number of elements minus 1.
        this.cards.splice(0, 0, card);
    }

    //this function adds the card to a random spot in the deck
    buryCard(card) {
        if (!card instanceof Card)
            throw 'card must be a Card object';

        //Math.floor takes a number with decimal places and rounds the number down to the nearest whole number
        //Math.random() * this.cards.length will return a random number between 0 and the number of elements currently in the array
        //% is the modulus function. It will ensure that if the random number equals exactly 1 that the resultant number will become 0
        this.cards.splice(Math.floor(Math.random() * this.cards.length) % this.cards.length, 0, card);
    }
}