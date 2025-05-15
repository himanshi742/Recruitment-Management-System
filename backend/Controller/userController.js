import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js"; 

//Register a user with role-based access
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body;
  
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    
    if (!/^[^\d]+$/.test(username)) {
      res.status(400);
      throw new Error("Username should not contain digits");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400);
      throw new Error("Invalid email format");
    }

    if(password.length < 8){
      res.status(400)
      throw new Error("Password must be 8 character long");
    }
  
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already registered");
    }
    
    let assignedRole = role || "applicant";

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: assignedRole, // Assign role
    });
  
    if (!newUser) {
      res.status(400);
      throw new Error("User data is not valid");
    }
  
    const accessToken = jwt.sign(
      {
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
  
    res.status(201).json({ _id: newUser.id, username:newUser.username, email: newUser.email, role: newUser.role, accessToken, id: newUser.id });
  });

// Login a user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400);
      throw new Error("Invalid email format");
    }
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  
    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
  
    res.status(200).json({ accessToken, role: user.role ,email:user.email, username: user.username, id: user.id });
  });

export { registerUser, loginUser };
