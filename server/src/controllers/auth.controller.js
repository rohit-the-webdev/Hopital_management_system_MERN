import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import generateToken from "../utils/generateToken.js";

const ADMIN_EMAIL = "admin@hospital.com";
const ADMIN_PASSWORD = "admin123";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!["doctor", "patient"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message:
        role === "doctor"
          ? "Doctor registered. Waiting for admin approval."
          : "Registration successful",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN CREATE RECEPTIONIST
export const createReceptionist = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "receptionist",
    });

    res.status(201).json({ message: "Receptionist account created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hardcoded Admin Login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return res.json({
        role: "admin",
        token: generateToken({ role: "admin" }),
      });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    if (user.role === "doctor" && !user.isApproved) {
      return res.status(403).json({
        message: "Doctor not approved by admin yet",
      });
    }

    res.json({
      id: user._id,
      role: user.role,
      token: generateToken({ id: user._id, role: user.role }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN APPROVE DOCTOR
export const approveDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctor = await User.findById(doctorId);

    if (!doctor || doctor.role !== "doctor")
      return res.status(404).json({ message: "Doctor not found" });

    doctor.isApproved = true;
    await doctor.save();

    res.json({ message: "Doctor approved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
