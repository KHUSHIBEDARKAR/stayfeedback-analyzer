const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
const User = require("../models/User");

const router = express.Router();
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Register user
router.post(
  "/register",
  authLimiter,
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .normalizeEmail(),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must contain at least 6 characters"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User with this email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        email,
        password: hashedPassword,
      });

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
          id: user._id,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);

      return res.status(500).json({
        success: false,
        message: "Server error while registering user",
      });
    }
  }
);

// Login user
router.post(
  "/login",
  authLimiter,
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .normalizeEmail(),

    body("password")
      .notEmpty()
      .withMessage("Password is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const passwordMatches = await bcrypt.compare(
        password,
        user.password
      );

      if (!passwordMatches) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user._id,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Login error:", error);

      return res.status(500).json({
        success: false,
        message: "Server error while logging in",
      });
    }
  }
);

module.exports = router;