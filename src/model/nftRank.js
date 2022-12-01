const mongoose = require("mongoose");

const nftScoreSchema = new mongoose.Schema({
    nft_name: {
        type: String,
        // required: true,
    },
    score: {
        type: String,
        // required: true,
    },
    rank: {
        type: Number,
        // default: 0
        // required: true,
    }

});

const nftRank = new mongoose.model("nftRank", nftScoreSchema);

module.exports = nftRank;