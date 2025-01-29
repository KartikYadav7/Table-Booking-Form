const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"]
  },
  contact: { 
    type: String, 
    required: [true, "Contact info is required"],
    match: [/^\d{10}$/, "Invalid contact number"]
  },
  date: { 
    type: String, 
    required: [true, "Date is required"] 
  },
  time: { 
    type: String, 
    required: [true, "Time is required"] 
  },
  partySize: { 
    type: Number, 
    required: [true, "Party size is required"],
    min: [1, "Party size must be at least 1"],
    max: [10, "Party size cannot exceed 10"]
  },
});

module.exports = mongoose.model("Booking", BookingSchema);
