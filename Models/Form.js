const mongoose = require("mongoose");

// Helper function to format time as 3:00pm
function formatTime(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12; // Convert to 12-hour format
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutesStr}${ampm}`;
}

const formSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  gender: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  emailAddress: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  role: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  submittedTime: {
    type: String, // For formatted time, e.g., "3:00pm"
  },
});

// Pre-save hook to set submittedTime
formSchema.pre('save', function (next) {
  if (!this.submittedTime) {
    this.submittedTime = formatTime(this.createdAt || new Date());
  }
  next();
});

const Form = mongoose.model("Form", formSchema);
module.exports = Form;