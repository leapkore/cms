import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  const hashpass = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashpass,
  });

  try {
    await newUser.save();
    res.status(201).json("Signup successful");
  } catch (error) {
    if (error.code === 11000) {
      const dupField = Object.keys(error.keyPattern)[0]; // e.g., 'username' or 'email'
      const message =
        dupField === "username"
          ? "Username is already taken"
          : dupField === "email"
          ? "Email is already registered"
          : "Duplicate value detected";

      return next(errorHandler(400, message)); // Custom error message
    }

    // Other errors
    next(errorHandler(500, "Internal Server Error"));
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "Incorrect Credentials"));
    }

    // Compare with stored hashed password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Incorrect Credentials"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const{password: pass, ...rest} = validUser._doc;

    res
      .status(200) 
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};


export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;

      return res.status(200).cookie('access_token', token, {
        httpOnly: true, // ✅ Fixed typo
      }).json(rest);
    } else {
      // Generate a random password for new Google users
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({ // ✅ Fixed assignment
        username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc; // ✅ Fixed typo

      return res.status(200).cookie('access_token', token, {
        httpOnly: true,
      }).json(rest);
    }
  } catch (error) {
    next(error);
  }
};
