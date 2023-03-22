const GenerationHmac = require('./generationHmac.js');
const GenerationTable = require('./generationTable.js');
const Winner = require('./Winner.js');
const rl = require('readline').createInterface({ input: process.stdin, output: process.stdout });


class Process {
    constructor(moves) {
        this.moves = moves;

        if ( this.checkMoves() ) this.start();
        else console.log(`For example: node index.js 1 2 3 4 5 6 7 8 9`);
    }

    checkMoves() {
        if ( this.moves.length < 3 ) console.log(`Too few moves! Entered more.`);
        else if ( new Set(this.moves).size !== this.moves.length ) console.log(`Moves must not be repeated.`);
        else if ( this.moves.length % 2 === 0 ) console.log(`Number of moves must be odd.`);
        else return true
    }

    start() {
        this.generationHmac = new GenerationHmac();

        console.log(`HMAC: ${this.generationHmac.generateHMAC(this.moves.toString())}`);
        console.log(`Available moves:`);
        for ( let i = 0; i < this.moves.length; i++ ) console.log(`${i + 1} - ${this.moves[i]}`);
        console.log(`0 - exit\n? - help`);

        rl.question(`Enter your move: `, this.handlerAnswer.bind(this));
    }

    handlerAnswer(answer) {
        this.playerMove = answer;
        this.computerMove = Math.trunc( Math.random() * this.moves.length );

        const table = new GenerationTable(Math.trunc( this.moves.length / 2 ));
        let winner;

        if ( answer === '?' ) {
            console.log(table.drawTable())
            rl.close();
            return false;
        }
        else if ( answer === '0' ) {
            rl.close();
            return false;
        }
        else {
            winner = new Winner(table.table, this.playerMove, this.computerMove).winner;
            console.log(`Your move: ${this.moves[this.playerMove - 1]}\nComputer move: ${this.moves[this.computerMove]}`)
        }
        if ( winner === 'Draw') console.log(winner);
        else console.log(`You ${winner.toLowerCase()}`)
        rl.close();
        console.log(`HMAC key ${this.generationHmac.key}`)
    }
}

const game = new Process(process.argv.slice(2));

