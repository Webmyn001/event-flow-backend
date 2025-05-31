const Form = require("../Models/Form");
const jwt = require("jsonwebtoken");





//generate JWT Token

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Signup
exports.signup = async (req, res) => {
  const { fullName, gender, role, phoneNumber, emailAddress, submittedTime } = req.body;
  try {
    const existingUser = await Form.findOne({ emailAddress });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const user = await Form.create({ fullName, gender, role, phoneNumber, emailAddress, submittedTime });
    const token = generateToken(user._id);

    res.status(201).json({ message: "Signup successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Login
exports.login = async (req, res) => {
  const { emailAddress } = req.body;
  try {
    const user = await Form.findOne({ emailAddress });
    if (!user) {
      return res.status(400).json({ message: "Invalid email." });
    }
    const token = generateToken(user._id);
    res.status(200).json({ message: "Login successful", token, Login: true, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// Create a new review
exports.createForm = async (req, res) => {
  const { fullName, gender, role, phoneNumber, emailAddress, submittedTime} = req.body;

  try {
    const newForm = await Form.create({
        fullName, gender, role, phoneNumber, emailAddress, submittedTime
    });

    res.status(201).json({ message: "Form created successfully", newForm });
  } catch (error) {
    res.status(500).json({ message: "Failed to create Form", error });
  }
};

// Get all reviews
exports.getAllForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch forms", error });
  }
};

// Get a single review by ID
exports.getFormById = async (req, res) => {
  const { id } = req.params;

  try {
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ message: "form not found" });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch form", error });
  }
};

// Update a review
exports.updateForm = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedForm = await Form.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validations are applied
    });

    if (!updatedForm) {
      return res.status(404).json({ message: "event not found" });
    }

    res.status(200).json({ message: "event updated successfully", updatedForm });
  } catch (error) {
    res.status(500).json({ message: "Failed to update event", error });
  }
};

// Delete a review
exports.deleteForm = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedForm = await Form.findByIdAndDelete(id);

    if (!deletedForm) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete form", error });
  }
};