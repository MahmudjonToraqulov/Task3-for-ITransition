const readline = require('readline')
const GameTable = require('./GameTable')
const GameRules = require('./GameRules')
const KeyGeneration = require('./KeyGeneration')
const HMACGeneration = require('./HMACGeneration')

class Game {
    constructor(moves) {
        this.moves = moves
        this.movesLength = moves.length
        this.crypto = new HMACGeneration()
    }

    start() {
        const computersMoveIndex = Math.floor(Math.random() * this.movesLength) 
        const computersMove = this.moves[computersMoveIndex]
        const table = new GameTable(this.moves)
        const gameRules = new GameRules(this.moves)
        const key = KeyGeneration.generateKey()
		const hmac = HMACGeneration.generateHMAC(key, computersMove)


        if (this.movesLength < 3 || this.movesLength % 2 === 0 || this.defineRepetitiveValues()){
            console.error('Error: Please input an odd number of at least 3 non-repeating moves!!!')
            console.log('Example: node index.js rock paper scissors')
            process.exit(1)
        }

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
          
        const askForInput = () => {
            console.log('computer move -> ', computersMove)
            this.displayInfo(hmac)
            rl.question('Enter your move: ', (usersMove) => {
                if (usersMove === '0'){
                    rl.close()
                    process.exit(1)
                }
                else if(usersMove === '?'){
                    table.getHelp()
                    askForInput()
                }
                else if(parseInt(usersMove) > this.movesLength){
                    console.error('----------------------------------------')
                    console.error('Error: Please enter only existing inputs!')
                    console.error('----------------------------------------')
                    askForInput()
                }
                else if (parseInt(usersMove) <= this.movesLength){
                    console.log(gameRules.result(this.moves[usersMove - 1],computersMove))
                    console.log('HMAC key:', key.toString('hex').toUpperCase())
                    rl.close()
                    process.exit(1)
                }
                else{
                    console.error('----------------------------------------')
                    console.error('Error: Please enter only existing inputs!')
                    console.error('----------------------------------------')
                    askForInput()
                }
            })
        }
        askForInput()
    }

    displayInfo(hmac) {
        console.log('Available moves:')
        console.log('HMAC: ', hmac.toUpperCase())
        this.moves.forEach((eachMove,key) => {
            console.log(key + 1, eachMove)
        })
        console.log('0 - exit')
        console.log('? - help')
    }

    defineRepetitiveValues(){ 
        const seen = new Set();
        for (const item of this.moves) {
            if (seen.has(item)) {
                return true 
            }
            seen.add(item)
        }
        return false; 
    }
}

module.exports = Game