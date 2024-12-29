import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";
dotenv.config;

const cookieOption = {
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
};
const register = async (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    res.status(404).send({
      message: "All the fields are required",
      success: false,
    });
  }
  try {
    const userExists = await User.findOne({ username });

    if (userExists) {
      res.status(404).send({
        message: "User already exists.",
        success: false,
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
      });

      await newUser.save();
      const token = jwt.sign(
        {
          username: newUser.username,
        },
        process.env.JWT_SECRET_CODE,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("token", token, cookieOption);

      newUser.password = undefined;
      res.status(200).send({
        message: "User registered successfully.",
        success: true,
        data: newUser,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
      error,
      success: false,
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(404).send({
      message: "All the fields are required",
      success: false,
    });
  }
  try {
    const user = await User.findOne({ username }).select("+password");
    if (user) {
      const passwordsMatched = await bcrypt.compare(password, user.password);
      if (passwordsMatched) {
        const token = jwt.sign(
          {
            username: username,
          },
          process.env.JWT_SECRET_CODE,
          {
            expiresIn: "1d",
          }
        );
        res.cookie("token", token, cookieOption);

        user.password = undefined;
        res.status(200).send({
          message: "User logged in successfully",
          data: user,
          success: true,
        });
      } else {
        res.status(404).send({
          message: "Invalid Password",
          success: false,
        });
      }
    } else {
      res.status(404).send({
        message: "User doesnot exist.",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
      error,
      success: false,
    });
  }
};

const forgotPassword = async (req, res) => {
  const { username, newPassword } = req.body;
  try {
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res
      .status(200)
      .json({ message: "Password reset successful", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error });
  }
};

export { forgotPassword, login, register };
