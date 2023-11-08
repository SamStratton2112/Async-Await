// Part 1


async function numInfo(num){
    let res = await axios.get(`http://numbersapi.com/${num}?json`)
    $("body").append(`<p>${res.data.text}</p>`)
}

function multiNumFacts() {
    for (let i = 1; i <= 5 ; i++){
        let num = Math.floor(Math.random()*100)
        numInfo(num)
    }
}


async function fourFacts(num){
    Promise.all([
        numInfo(num),
        numInfo(num),
        numInfo(num),
        numInfo(num)
    ])
}

// Part 2 
class Game {
    constructor(){
        this.deck_Id
    }
    async getDeck(){
        let res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle')
        this.deck_Id = res.data.deck_id
    }
    async getCard(){
        let res = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deck_Id}/draw/?count=1`)
        console.log(res.data.cards[0])
    }
    async getTwoCards(){
        let res = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deck_Id}/draw/?count=2`)
        console.log(res.data.cards[0])
        console.log(res.data.cards[1])
    }
}

let g = new Game
g.getDeck()

$("#get-card").on('click', async function (){
    let {data} = await axios.get(`https://deckofcardsapi.com/api/deck/${g.deck_Id}/draw/?count=1`)
    console.log(data)
    $(".container").html(`
        <div class="card mx-auto mt-5">
            <img class="card-img img-fluid" src="${data.cards[0].image}">
        </div>
    `)
})
