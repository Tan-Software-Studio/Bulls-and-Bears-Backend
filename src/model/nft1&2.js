const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
  external_url: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  attributes: [
    {
      trait_type: {
        type: String,
        // required: true,
      },
      value: {
        type: String,
        // required: true,
      },
    },
  ],
  properties: {
    files: [
      {
        uri: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
      },
    ],
    creators: {
      type: String,
      required: true,
    },
  },
  compiler: {
    type: String,
    required: true,
  },
});

const Nft = new mongoose.model("collection1&2", nftSchema);

module.exports = Nft;
