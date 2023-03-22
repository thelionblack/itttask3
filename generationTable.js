
module.exports = class GenerationTable {
    constructor(middle) {
        this.createTable(middle)
    }

    createTable(middle) {
        this.table = [['Draw', ...'Win '.repeat(middle).split(' ').slice(0, -1), ...'Lose '.repeat(middle).split(' ').slice(0, -1)]];
        
        for ( let i = 0; i < middle + middle; i++ ) {
            this.table.push([].concat(this.table[i].slice(-1), this.table[i].slice(0,-1)));
        }
    }

    drawTable() {
        console.table(this.table);
    }
}