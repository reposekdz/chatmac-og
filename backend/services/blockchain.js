// A very simple in-memory blockchain simulation
const ledger = [];
let nextTokenId = 1;

class Block {
    constructor(timestamp, transaction, type = 'COIN_TRANSFER') {
        this.timestamp = timestamp;
        this.type = type;
        this.transaction = transaction;
        this.hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}

const logTransaction = (fromAddress, toAddress, itemId, amount) => {
    const transaction = {
        from: fromAddress,
        to: toAddress,
        itemId: itemId,
        amount: amount,
    };
    const block = new Block(Date.now(), transaction, 'COIN_TRANSFER');
    ledger.push(block);
    console.log('Transaction logged to blockchain:', block);
    return block;
};

const mintNFT = (creatorId, postId) => {
    const transaction = {
        creatorId: creatorId,
        postId: postId,
        tokenId: nextTokenId++,
    };
    const block = new Block(Date.now(), transaction, 'NFT_MINT');
    ledger.push(block);
    console.log('NFT Mint logged to blockchain:', block);
    return block;
}

const getLedger = () => {
    return ledger;
};

module.exports = {
    logTransaction,
    getLedger,
    mintNFT,
};