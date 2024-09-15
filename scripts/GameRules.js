class GameRules {
    constructor(moves){
        this.moves = moves
        this.movesLength = moves.length
    }

    result(usersMove,computersMove){
        console.log('Your move: ', usersMove)
        console.log('Computer move: ', computersMove) 

        if (usersMove === computersMove){
            return "Draw!"
        }
        else{
            const half = Math.floor(this.movesLength / 2)
            const distance = (this.moves.indexOf(usersMove) - this.moves.indexOf(computersMove) + this.movesLength) % this.movesLength
            if(distance <= half){
                return 'You Won!'
            }
            else{
                return 'You Lost!'
            }
        }
    }
}

module.exports = GameRules