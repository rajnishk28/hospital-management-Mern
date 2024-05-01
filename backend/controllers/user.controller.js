const User =require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//register controller here
const registerUser = async (req, res) => {
    const { fullName, email, phoneNumber,password } = req.body;

    // Check if any of the required parameters are missing
    if (!fullName  || !email || !phoneNumber || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required details",
        });
    }

    try {
        // Check if the user with the provided email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists",
            });
        }
        if (password.length <= 8) {
            return res.status(400).json({
                success: false,
                message: "password length should be greater than 8 character",
            });
        }

        // Hash the user's password before saving it to the database
        const saltRounds = 10; // You can adjust the number of salt rounds
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user instance with the hashed password
        const newUser = new User({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: newUser,
        });
    } catch (error) {
        // console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error
        });
    }
};


//Login controller here
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user provided both email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both email and password",
            });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user not found",
            });
        }

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid  password",
            });
        }

        // User is authenticated; generate a JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );
        const userId =user._id;
        const role =user.role;
        res.status(200).json({
            success: true,
            message: "Login successful",
            data:{userId, token,role}
        });
    } catch (error) {
        // console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error
        });
    }
};


//findAll User Controller Here

const getAllUser = async (req, res) => {
    try {
        // Find all users in the database
        const allUsers = await User.find();

        res.status(200).json({
            success: true,
            message: "All users retrieved successfully",
             users: allUsers
        });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error
        });
    }
};

//find One user Controller Here
const getOneUser = async (req, res) => {
    const userId = req.params.id;

    try {
        // Find the user by ID
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            user: user,
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

// Update User Controller
const updateUserById = async (req, res) => {
    const userId = req.params.id;
    const { fullName, email, phoneNumber, password } = req.body;

    try {
        // Check if the user with the provided ID exists
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Update user fields
        if (fullName) user.fullName = fullName;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (password) {
            // Hash the new password before updating
            const saltRounds = 10;
            user.password = await bcrypt.hash(password, saltRounds);
        }

        // Save the updated user to the database
        await user.save();

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: user,
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

// Delete User Controller
const deleteUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        // Find the user by ID and delete
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            user: user,
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

//Total number of users
const getTotalUsers = async (req, res) => {
    try {
        // Find the total number of users in the database
        const totalUsers = await User.countDocuments();

        res.status(200).json({
            success: true,
            message: "Total number of users retrieved successfully",
            totalUsers: totalUsers
        });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error
        });
    }
};


module.exports = {
    registerUser,
    loginUser,
    getAllUser,
    getOneUser,
    updateUserById,
    deleteUserById,
    getTotalUsers


};
