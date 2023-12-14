const User = require('../model/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')

const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;


        const user = await User.findById(id);
        if (!user) {
            // Early return or throw an error to stop execution
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the 200 response if the user is found
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const updateuser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;



        // Find the user by ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const image = req.file ? req.file.filename : undefined;

        // Update the user details
        await User.findByIdAndUpdate(id, {
            email,
            name,
            // Only update the picturePath if a new image is provided
            ...(image && { picturePath: image }),
        });

        res.status(200).json({ message: 'User updated successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const image = req.file ? req.file.filename : '../img/profile.png';

        if (!name || !email || !password) {
            res.status(404).json({ message: 'Add information' });
        }
        const hahPassword = await bcrypt.hash(password, 10);


        const newUser = await User.create({
            name,
            email,
            password: hahPassword,
            picturePath: image
        })
        const token = await jwt.sign({ userId: newUser._id }, process.env.JWT);

        res.cookie('token', token, {
            expires: new Date(Date.now() + 3600 * 10 * 1000),
            httpOnly: false,
            path: '/', // Match with the path used when setting the cookie
        });
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT);

        res.cookie('token', token, {
            expires: new Date(Date.now() + 3600 * 10 * 1000),
            httpOnly: false,
            path: '/', // Match with the path used when setting the cookie
        });


        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie('token'); // Clear the 'token' cookie
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const generateOTP = () => {
    // Implement your OTP generation logic or use a library like 'generate-otp'
    // For example, generating a 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOtp = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the user by ID
        const user = await User.findById(id);
        console.log(user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate OTP
        const otp = generateOTP();

        // Save the OTP to the user document
        user.otp = otp;

        // Ensure the user is a mongoose model instance before calling save
        if (user instanceof mongoose.Model) {
            await user.save();
        } else {
            // Handle the case where the retrieved user is not a mongoose model instance
            return res.status(500).json({ message: 'Invalid user object' });
        }

        // Send OTP to the user's email
        // Use nodemailer or any other email-sending library
        // Example using nodemailer
        const nodemailer = require('nodemailer');

        const transporter = nodemailer.createTransport({
            // Configure your email service
            service: 'gmail',
            auth: {
                user: 'afeeftodoservice@gmail.com',
                pass: 'odch ldhu pkvm zmhe',
            },
        });
        console.log(user.email)

        const mailOptions = {
            from: 'afeeftodoservice@gmail.com',
            to: user.email,
            subject: 'OTP for Password Reset',
            text: `Your OTP for password reset is: ${otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Failed to send OTP via email' });
            }
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'OTP sent successfully' });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const verifyOtpAndUpdateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { otp } = req.body;

        // Find the user by ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the provided OTP matches the stored one
        if (user.otp !== otp) {
            return res.status(401).json({ message: 'Invalid OTP' });
        }

        // Clear the OTP after successful verification
        user.otp = null;
        await user.save();

        res.status(200).json({ message: 'OTP verified successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUserPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;

        // Find the user by ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};








module.exports = { getSingleUser, register, login, logout, updateuser, sendOtp, verifyOtpAndUpdateUser, updateUserPassword };