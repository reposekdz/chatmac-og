// A very simple in-memory blockchain simulation
const ledger = [];

class Block {
    constructor(timestamp, transaction) {
        this.timestamp = timestamp;
        this.transaction = transaction;
        // In a real blockchain, you'd have a hash, previous hash, nonce, etc.
    }
}

const logTransaction = (fromAddress, toAddress, itemId, amount) => {
    const transaction = {
        from: fromAddress,
        to: toAddress,
        itemId: itemId,
        amount: amount,
    };
    const block = new Block(Date.now(), transaction);
    ledger.push(block);
    console.log('Transaction logged to blockchain:', block);
    return block;
};

const getLedger = () => {
    return ledger;
};

module.exports = {
    logTransaction,
    getLedger,
};
