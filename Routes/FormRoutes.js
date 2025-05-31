const express = require("express");
const {
  createForm,
  getAllForms,
  getFormById,
  updateForm,
  deleteForm,
  signup,
  login,
} = require("../Controller/formController");

const router = express.Router();


// Signup Route
router.post("/signup", signup);

// Login Route
router.post("/login", login);

// Create a new review
router.post("/", createForm);

// Get all reviews
router.get("/", getAllForms);

// Get a single review by ID
router.get("/:id", getFormById);

// Update a review by ID
router.put("/:id", updateForm);

// Delete a review by ID
router.delete("/:id", deleteForm);

module.exports = router;