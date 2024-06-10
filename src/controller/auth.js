const User = require("../Modal/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

exports.signup = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({
        error: "User already registered",
      });
    }

    const { firstName, lastName, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: shortid.generate(),
    });

    const savedUser = await _user.save();

    if (savedUser) {
      const token = generateJwtToken(savedUser._id, savedUser.role);
      const { _id, firstName, lastName, email, role, fullName } = savedUser;
      return res.status(201).json({
        token,
        user: { _id, firstName, lastName, email, role, fullName },
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPassword = await user.authenticate(req.body.password);
    /* if (!isPassword || user.role !== "user") {
      return res.status(400).json({ message: "Invalid credentials or unauthorized role" });
    } */

    const token = generateJwtToken(user._id, user.role);
    const { _id, firstName, lastName, email, role, fullName } = user;
    return res.status(200).json({
      token,
      user: { _id, firstName, lastName, email, role, fullName },
    });

  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

