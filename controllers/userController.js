const User = require('../models/userModel');
const validator = require('validator');
const isStrongPassword = require('validator/lib/isStrongPassword');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '7d' });
}

const Register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required!" });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Email syntax is wrong!" });
    }
    if (!isStrongPassword(password)) {
        return res.status(400).json({ error: "Password is not strong enough!" });
    }
    try {
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(400).json({ error: "Email already in used!" });
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await User.create({
            name, email, password: passwordHash
        });

        const token = createToken(user._id);

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const Login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required!" });
    }
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Email or password is incorrect!" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ error: "Email or password is incorrect!" });
      }
      const token = createToken(user._id);
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const GetAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const GetSingleUser = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = { Register, Login, GetAllUsers, GetSingleUser };