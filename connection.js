const mongoose = require("mongoose");

async function HandleMongoDB(url) {
  return await mongoose.connect(url);
}

module.exports = { HandleMongoDB };
