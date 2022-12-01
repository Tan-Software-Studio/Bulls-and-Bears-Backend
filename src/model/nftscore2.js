const mongoose = require("mongoose");

const nftScoreSchema = new mongoose.Schema({
    nft_name: {
        type: String,
        required: true,
    },
    attributes: [{
        trait_type: {
            type: String,
            // required: true,
        },
        value: {
            type: String,
            // required: true,
        },
        percentage: {
            type: Array,
            // required: true,
        }
    }],
    score: {
        type: String,
        // required: true,
    },
    rank: {
        type: Number,
        // default: 0,
        // required: true,
    },
    img: {
        type: String,
        required: true
    }

});

const nftScore2 = new mongoose.model("nftScore2", nftScoreSchema);

module.exports = nftScore2;
