const mongoose = require("mongoose");

const amtSchema = new mongoose.Schema({
  price: Number,
});

let Cost = mongoose.model("amounts", amtSchema);

module.exports = Cost;
