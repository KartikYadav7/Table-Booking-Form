const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");


// Create Booking with Duplicate Check
router.post("/", async (req, res) => {
  try {
    const { name, contact, date, time, partySize } = req.body;
    
    // Check if all necessary fields are provided
    if (!name || !contact || !date || !time || !partySize) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Check if a booking already exists for the given date & time
    const existingBooking = await Booking.findOne({ date, time });
    if (existingBooking) {
      return res.status(400).json({ error: "This time slot is already booked" });
    }

    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: "Failed to create booking" });
  }
});

// Get All Bookings
router.get("/",  async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// Delete Booking
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete booking" });
  }
});

module.exports = router;