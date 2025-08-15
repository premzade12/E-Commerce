import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import { genToken,genToken1 } from "../config/token.js";

export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter Valid Email" });
    }

    if (password.length < 8) {
        console.log("Enter Strong Password");
      return res.status(400).json({ message: "Enter Stong Password" });
    }
    let hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashPassword });

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      domain: ".onrender.com",
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log("registration error");
    return res.status(500).json({ message: `Registration error ${error}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      domain: ".onrender.com",
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log("Login error");
    return res.status(500).json({ message: `Login error ${error}` });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout Successfull" });
  } catch (error) {
    console.log("LogOut error");
    return res.status(500).json({ message: `LogOut error ${error}` });
  }
};

export const googleLogin = async(req,res) => {
    try {
    const { name, email} = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({name, email})
    }
    
    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      domain: ".onrender.com",
    });

    return res.status(200).json(user);

  } catch (error) {
    console.log("Google Login error");
    return res.status(500).json({ message: `Google Login error ${error}` });
  }
}

export const adminLogin = async (req,res) => {
  try {
    let {email,password}=req.body
    if(email=== process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

    const token = await genToken1(email)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 1 * 24 * 60 * 60 * 1000,
      domain: ".onrender.com",
    });

    return res.status(200).json(token);
    }
  return res.status(400).json({message:"Invalid credentials"})
    
  }  catch (error) {
    console.log("Admin Login error");
    return res.status(500).json({ message: `Admin Login error ${error}` });
  }
}
