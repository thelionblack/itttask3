const crypto = require('crypto');



module.exports = class GenerationHmac {
    constructor() {
        this.key = crypto.randomBytes(32).toString("hex");
    }


    generateHMAC(moves) {
        return crypto.createHmac('sha256', this.key).update(moves).digest('hex');
    }
}
