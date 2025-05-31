const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const EventRoutes = require("./Routes/EventsRoutes");
const FormRoutes = require("./Routes/FormRoutes");
const OrganizerRoutes = require("./Routes/organizerRoutes");



const cors =require("cors") 


dotenv.config();

const app = express();
// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(express.json());

// Routes

app.use("/api/events", EventRoutes); // Add event routes
app.use("/api/form", FormRoutes); // Add form routes
app.use("/api/organizer", OrganizerRoutes); // Add organizer routes



app.use(cors(
   {
      origin:["http://localhost:3000/"],
      methods: ["GET", "POST","PUT","DELETE"],
      credentials: true
   }
));


// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });