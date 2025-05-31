const express = require("express");
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../Controller/EventsController");

const router = express.Router();

// Create a new review
router.post("/", createEvent);

// Get all reviews
router.get("/", getAllEvents);

// Get a single review by ID
router.get("/:id", getEventById);

// Update a review by ID
router.put("/:id", updateEvent);

// Delete a review by ID
router.delete("/:id", deleteEvent);

module.exports = router;