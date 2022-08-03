let deckId
let compScore = 0
let myScore = 0

const placeholder = document.querySelectorAll(".placeholder")
const newDeckBtn = document.getElementById("new-deck")
const drawBtn = document.getElementById("draw-cards")
const titleEl = document.querySelector("#title")
const compScoreEl = document.querySelector("#computer h2")
const myScoreEl = document.querySelector("#my h2")


newDeckBtn.addEventListener("click", getNewDeck)
    
/* Reseting state of the game */

function newGame() {
    titleEl.textContent = "⚔️ Game of war ⚔️"
    titleEl.style.animation = "none"
    titleEl.style.color = "#00e1ff"
    placeholder[0].innerHTML = ""
    placeholder[1].innerHTML = ""
    compScore = 0
    myScore = 0
    compScoreEl.textContent = `Computer score: ${compScore}`
    myScoreEl.textContent = `My score: ${myScore}`
}

/* Get new deck from API */

async function getNewDeck() {
    const res = await fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/")
    const data = await res.json()
    deckId = data.deck_id
    newDeckBtn.textContent = `New Deck | Remaining cards: ${data.remaining}`
    drawBtn.disabled = false
    newGame()
}



drawBtn.addEventListener("click", async () => {
    const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()
    placeholder[0].innerHTML =`
        <img id="comp-card-img" src="${data.cards[0].image}">
        `
    placeholder[1].innerHTML = `
        <img id="my-card-img"src="${data.cards[1].image}">
        `
     
    titleEl.textContent = compareCardsValue(data.cards[0].value, data.cards[1].value)
    titleEl.style.color = "#f3f78c"

    newDeckBtn.textContent = `New Deck | Remaining cards: ${data.remaining}`
    
    if (data.remaining === 0) {
        drawBtn.disabled = true
        myScore > compScore ? titleEl.textContent = "You won game! 🎉" 
            : compScore > myScore ? titleEl.textContent = "Computer won game! 🤖"
            : titleEl.textContent = "It's a tie game!"
        titleEl.style.animation = "titleAnimation 1s infinite"
        titleEl.style.color = "#e44242"
    }
    
    compScoreEl.textContent = `Computer score: ${compScore}`
    myScoreEl.textContent = `My score: ${myScore}`
})

/* Compare value of two cards */

function compareCardsValue(card1, card2) {
    const cardArray = ["2", "3" , "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    let card1Value = cardArray.indexOf(card1)
    let card2Value = cardArray.indexOf(card2)
     
    if (card1Value > card2Value) {
        compScore++
        return `Computer gets point!`
    } else if (card1Value < card2Value) {
        myScore++
        return `You get point!`
    } else {
        return `War!`
    }
}

