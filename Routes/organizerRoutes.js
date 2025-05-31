const express = require("express");
const {
  createOrganizer,
  getOrganizer,
  updateOrganizer,
  deleteOrganizer,
} = require("../Controller/organizerController");

const router = express.Router();

// Create a new review
router.post("/", createOrganizer);

// Get all reviews
router.get("/", getOrganizer);


// Update a review by ID
router.put("/:id", updateOrganizer);

// Delete a review by ID
router.delete("/:id", deleteOrganizer);

module.exports = router;