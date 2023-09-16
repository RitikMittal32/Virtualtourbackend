const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
          name: String,
          description:String,
          latitude:String,
          userId:String,
          longitude:String
});

module.exports = mongoose.model("HistoricalSite",productSchema)