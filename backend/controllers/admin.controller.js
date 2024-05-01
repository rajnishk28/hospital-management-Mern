const bcrypt = require('bcrypt');
const Admin = require('../models/admin.model');
const jwt =require('jsonwebtoken');

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if any field is empty
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Email is already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if any field is empty
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token =  jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
    const role = admin.role;
    const id = admin._id;

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {token },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const findOneAdminById = async (req, res) => {
  const adminId = req.params.id;

  try {

    // Find the admin by ID, excluding the password field
    const admin = await Admin.findById(adminId).select('-password');

    // Check if admin with the provided ID exists
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Admin retrieved successfully',
      admin: admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error,
    });
  }
};
//Delete Admin
const deleteAdminById = async (req, res) => {
  const adminId = req.params.id;

  try {
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);

    if (!deletedAdmin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Admin deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};



//update admin
const updateAdminById = async (req, res) => {
  const adminId = req.params.id;
  const { name, email } = req.body;

  try {
    // Check if the admin with the provided ID exists
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Update user fields
    if (name) admin.name = name;
    if (email) admin.email = email;


    // Save the updated user to the database
    await admin.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  findOneAdminById,
  deleteAdminById,
  updateAdminById
};
