const Event = require("../Models/Events");

// Create a new review
exports.createEvent = async (req, res) => {
  const { title, time, duration, handler, status, noteUrl , noteTitle} = req.body;

  try {
    const newEvent = await Event.create({
        title, time, duration, handler, status, noteUrl , noteTitle
    });

    res.status(201).json({ message: "Event created successfully", newEvent });
  } catch (error) {
    res.status(500).json({ message: "Failed to create event", error });
  }
};

// Get all reviews
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error });
  }
};

// Get a single review by ID
exports.getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch review", error });
  }
};

// Update a review
exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validations are applied
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "event not found" });
    }

    res.status(200).json({ message: "event updated successfully", updatedEvent });
  } catch (error) {
    res.status(500).json({ message: "Failed to update event", error });
  }
};

// Delete a review
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete event", error });
  }
};