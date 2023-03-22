const GenerationTable = require('./generationTable.js');

module.exports = class Winner {
    constructor(table, playerMove, computerMove) {
        this.winner = table[playerMove - 1][computerMove];
    }
}