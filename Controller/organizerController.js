const Organizer = require("../Models/Organizer");

// Create a new review
exports.createOrganizer = async (req, res) => {
  const { name, location, logo, description, date} = req.body;

  try {
    const newOrganizer = await Organizer.create({
        name, location, logo, description, date
    });

    res.status(201).json({ message: "Organizer created successfully", newOrganizer });
  } catch (error) {
    res.status(500).json({ message: "Failed to create Form", error });
  }
};

// Get all reviews
exports.getOrganizer = async (req, res) => {
  try {
    const organizer = await Organizer.find();
    res.status(200).json(organizer);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch organizer", error });
  }
};



// Update a review
exports.updateOrganizer = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedOrganizer = await Organizer.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validations are applied
    });

    if (!updatedOrganizer) {
      return res.status(404).json({ message: "event not found" });
    }

    res.status(200).json({ message: "event updated successfully", updatedOrganizer });
  } catch (error) {
    res.status(500).json({ message: "Failed to update event", error });
  }
};

// Delete a review
exports.deleteOrganizer = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrganizer = await Organizer.findByIdAndDelete(id);

    if (!deletedOrganizer) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete form", error });
  }
};