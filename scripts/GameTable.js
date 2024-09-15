const AsciiTable = require('ascii-table')
const GameRules = require('./GameRules')

class GameTable {
    constructor(moves){
        this.moves = moves
        this.movesLength = moves.length
    }

    getHelp() {
        const gameRules = new GameRules(this.moves)
        const table = new AsciiTable() 
        .setHeading("v PC/User >", ...this.moves)

        for (let i = 0; i < this.moves.length; i++) {
            let movement1 = this.moves[i]
            let row = [this.moves[i]]
            for(let j = 0; j < this.movesLength; j++){
                let movement2 = this.moves[j]
                let winner = gameRules.result(movement1,movement2)
                row.push(winner)
            }
            table.addRow(row)
        }
        console.log(table.toString())
    }
}

module.exports = GameTable