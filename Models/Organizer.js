const mongoose = require("mongoose");



const organizerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  logo: {
    type: String,
  },
  description: {
    type: String,
  
  },

  date: {
    type: String,
    
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },

});


const Organizer = mongoose.model("Organizer", organizerSchema);
module.exports = Organizer;