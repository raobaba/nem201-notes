const { Schema, model } = require("mongoose");

const BlackListSchema = new Schema({
   
})

const BlackListModel = model("blacklist", BlackListSchema);
module.exports = BlackListModel;