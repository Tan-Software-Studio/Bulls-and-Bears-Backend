const mongoose = require("mongoose");

const passiveIncome = new mongoose.Schema({
  discord_name: {
    type: String,
    required: true,
  },
  sologenic_account_name: {
    type: String,
    required: true,
  },
  xrp_address: {
    type: String,
    required: true,
  },
});

const passiveincome = new mongoose.model("passiveincome", passiveIncome);

module.exports = passiveincome;
