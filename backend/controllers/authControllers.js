import User from "../models/user.js"
import { sendEmail } from "../utils/sendEmail.js";
import sendToken from "../utils/sendToken.js";
import crypto from "crypto";

export const registerUser = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already registered",
        });
      }
      const user = await User.create({
        name,
        email,
        password,
      });
      try {

        res.status(200).json({
          success: true,
          message: `user created successfully .`,
        });
  
      } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
  
        return res.status(500).json({
          success: false,
          message: "Error creating user",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error registering user",
        error: error.message,
      });
    }
  };
  
  
  
  export const loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return res.status(401).send({
          success: false,
          message: "Invalid email or password",
        });
      }
      try {
        const match = await user.comparePassword(password);
  
        if (!match) {
          return res.status(400).json({
            success: false,
            message: "Invalid email or password",
          });
        }
      } catch (error) {
        console.error("Error comparing passwords:", error);
        return res.status(500).json({
          success: false,
          message: "Error comparing passwords",
        });
      }
        sendToken(user, 200, res);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "error login user",
        error: error.message,
      });
    }
  };
  
  export const logoutUser = async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "error logout user",
        error: error.message,
      });
    }
  };
  


  export const getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req?.user?._id);
      res.status(200).json({
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error found profile",
        error: error.message,
      });
    }
  };

  

  export const updatePassword = async (req, res) => {
    try {
      const user = await User.findById(req?.user?._id).select("+password");
      const isMatch = await user.comparePassword(req.body.oldPassword);
      if (!isMatch)
        return res.status(400).json({ message: "old password is incorrect" });
      user.password = req.body.password;
      await user.save();
      sendToken(user, 200, res);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error password update",
        error: error.message,
      });
    }
  };

  
  export const updateUserProfile = async (req, res) => {
    try {
      const newDataUser = {
        name: req.body.name,
        email: req.body.email,
      };
      const user = await User.findOneAndUpdate(req.user._id, newDataUser, {
        new: true,
      });
      res.status(200).json({
        success: true,
        message: "user updated successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error update profile",
        error: error.message,
      });
    }
  };  
  
  export const getUserDetails = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user)
        res.status(400).json({
          success: false,
          message: "User not found",
        });
  
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error update profile",
        error: error.message,
      });
    }
  };
  
    


