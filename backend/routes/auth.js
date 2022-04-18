// Imports
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');

// REGISTRATION · localhost/api/user/register
router.post('/register', async (req, res) => {
  // validate user inputs
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  // check if email is already registered
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  // Hash password (with bcrypt)
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  // Create user object and save
  // The properties not defined here have default values defined in the model, so they will be inserted as well
  const userObject = new User({
    role: req.body.role ? req.body.role : 'user',
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password,
    phone: req.body.phone ? req.body.phone : '123456',
  });
  try {
    const savedUser = await userObject.save();
    res.json({ error: null, data: savedUser._id });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// LOGIN · localhost/api/user/login
router.post('/login', async (req, res) => {
  // validate user inputs
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  // check if email is already registered
  const userFound = await User.findOne({ email: req.body.email });
  if (!userFound) {
    return res.status(400).json({ error: "Email doesn't exist" });
  }
  // check if password matches the one saved
  const validPassword = await bcrypt.compare(
    req.body.password,
    userFound.password
  );
  if (!validPassword) {
    return res.status(400).json({ error: 'The password is wrong' });
  }
  // create authentication token
  const token = jwt.sign(
    //payload
    {
      email: userFound.email,
      id: userFound._id,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  // attach auth token to header
  res.header('auth-token', token).json({
    error: null,
    data: { token },
  });
});

module.exports = router;
