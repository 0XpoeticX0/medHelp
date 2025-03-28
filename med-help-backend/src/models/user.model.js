import db from "../config/db.js";
import { generateId } from "../utils/generateId.js";
import bcrypt from "bcrypt";
import { jwtHelpers } from "../utils/jwtHelpers.js";
import dotenv from "dotenv";

dotenv.config();

export const createUser = async (req) => {
  const {
    firstName,
    lastName,
    email,
    age,
    gender,
    phone,
    address,
    role,
    password,
  } = req.body;

  const query = `
    INSERT INTO users (
      id, firstName, lastName, email, age, gender, phone, address, role, password
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log({ password });

    const userId = generateId();

    // Execute the query
    const [result] = await db.execute(query, [
      userId,
      firstName,
      lastName,
      email,
      age,
      gender,
      phone,
      address,
      role,
      hashedPassword,
    ]);

    return { id: userId, affectedRows: result.affectedRows };
  } catch (error) {
    console.error("❌ Error creating user:", error.message);
    throw error;
  }
};

export const loginUser = async (req) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";

  try {
    // Execute the query to find the user by email
    const [rows] = await db.execute(query, [email]);

    if (rows.length === 0) {
      return { success: false, message: "Invalid email or password" };
    }

    const user = rows[0];

    if (getUsers.isBlocked) {
      return { success: false, message: "User is blocked" };
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { success: false, message: "Invalid email or password" };
    }

    // Create JWT payload
    const payload = {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      address: user.address,
      phone: user.phone,
      email: user.email,
      role: user.role,
      status: user.isBlocked,
    };

    const accessToken = jwtHelpers.generateToken(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      process.env.ACCESS_TOKEN_EXPIRES_IN
    );

    // Return user info and token
    return {
      success: true,
      message: "Login successful",
      accessToken,
    };
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Internal server error");
  }
};

// Get all users
export const getUsers = async (req) => {
  const { role } = req.query;

  if (!role) {
    throw new Error("Role is required");
  }

  const query = `SELECT * FROM users WHERE role = ?`;

  try {
    const [rows] = await db.execute(query, [role]);
    return rows;
  } catch (error) {
    console.error("❌ Error fetching users:", error.message);
    throw error;
  }
};

// Delete User
export const deleteUser = async (req) => {
  const { id } = req.params;

  const query = `DELETE FROM users WHERE id = ?`;

  try {
    const [result] = await db.execute(query, [id]);

    return { id, affectedRows: result.affectedRows };
  } catch (error) {
    console.error("❌ Error deleting user:", error.message);
    throw error;
  }
};

// Toggle Block Status
export const toggleBlockStatus = async (req) => {
  const { id } = req.params;

  // Get current block status
  const getStatusQuery = `SELECT isBlocked FROM users WHERE id = ?`;
  const updateQuery = `UPDATE users SET isBlocked = ? WHERE id = ?`;

  try {
    const [rows] = await db.execute(getStatusQuery, [id]);

    if (rows.length === 0) {
      throw new Error("User not found");
    }

    const currentStatus = rows[0].isBlocked;
    const newStatus = !currentStatus;

    // Update status
    const [result] = await db.execute(updateQuery, [newStatus, id]);

    return { id, isBlocked: newStatus, affectedRows: result.affectedRows };
  } catch (error) {
    console.error("❌ Error toggling block status:", error.message);
    throw error;
  }
};
