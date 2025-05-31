const mongoose = require("mongoose");



const eventSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  time: {
    type: String,
  },
  duration: {
    type: Number,
  },
  handler: {
    type: String,
    
  },
  status: {
    type: String,
  },

  noteTitle: {
    type: String,
  },

  noteUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});


const Event = mongoose.model("Event", eventSchema);
module.exports = Event;