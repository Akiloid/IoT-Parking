const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  slot: String,
  plate: { type: String, required: true },
  in_time: { type: Date, required: true },
  out_time: { type: Date, required: true },
});

let Cars = mongoose.model("Car", carSchema);

module.exports = { Cars };
