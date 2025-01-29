const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bookingRoutes = require("./routes/bookingRoutes");


dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Handle reconnection in case of MongoDB disconnect
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected. Reconnecting...");
  mongoose.connect(process.env.MONGO_URI);
});

// Use routes
app.use("/", bookingRoutes);
 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));