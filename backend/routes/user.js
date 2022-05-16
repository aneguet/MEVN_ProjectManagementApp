// Imports
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// Token authentication
const {
  verifyToken,
  registerValidation,
  loginValidation,
} = require('../validation/auth_validation');
const { isAdmin } = require('../validation/user_validation');

// REGISTRATION-Create User · localhost/api/users/register
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
    assigned_projects: req.body.assigned_projects
      ? req.body.assigned_projects
      : [],
  });
  try {
    const savedUser = await userObject.save();
    res.json({ error: null, data: savedUser._id });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// LOGIN · localhost/api/users/login
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
    data: { token, user: userFound },
  });
});
// Admin requests
// GET all Users · localhost/api/users/ · header params: auth-token
router.get('/', [verifyToken, isAdmin], async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send({ message: 'Error getting all the Users' });
  }
});
// GET User by its ID · For Login ONLY · localhost/api/users/user · header params: auth-token
// It returns their info to the user requesting
router.get('/userLogin', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    // We don't need to send the user id to the request, it's stored in the token
    res.json(user);
  } catch (err) {
    res.status(500).send({ message: 'Error getting User' });
  }
});
// GET User by ID · For admins · localhost/api/users/user · header params: auth-token
// It returns their info to the user requesting
// router.get('/user', [verifyToken, isAdmin], async (req, res) => {
router.get('/user', [verifyToken, isAdmin], async (req, res) => {
  try {
    const userId = req.header('id');
    const user = await User.findById(userId);
    // We don't need to send the user id to the request, it's stored in the token
    res.json(user);
  } catch (err) {
    res.status(500).send({ message: 'Error getting User' });
  }
});

// UPDATE User by ID · header params: auth-token, id (user to get)
router.put('/user', verifyToken, async (req, res) => {
  try {
    const defaultUser = {
      role: 'user',
      first_name: 'John',
      last_name: 'Donut',
      email: 'user2@gmail.com',
      password: '123456',
      phone: '50231935',
    };
    // FIXME switch array to req.body > user form in vue
    // (req.header('id'), {$set: req.body,})
    const userToUpdate = await User.findByIdAndUpdate(
      req.header('id'),
      defaultUser
    );
    if (userToUpdate) {
      res.json(defaultUser);
    } else {
      res
        .status(404)
        .send({ message: 'The user you want to update does not exist' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Error updating User' });
  }
});
// DELETE User by ID · header params: auth-token, id
router.delete('/user', verifyToken, async (req, res) => {
  try {
    const userToDelete = await User.findByIdAndDelete(req.header('id'));
    if (userToDelete) {
      // res.json(userToDelete);
      res.status(201).send({ message: 'User successfully deleted.' });
    } else {
      res
        .status(404)
        .send({ message: 'The User you want to delete does not exist' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Error deleting User' });
  }
});

// function mapUsersArray(arr) {
//   let outputArr = arr.map((element) => ({
//     id: element._id,
//     role: element.role,
//     first_name: element.first_name,
//     last_name: element.last_name,
//     email: element.email,
//     password: element.password,
//     phone: element.phone,
//     uri: '/api/users/' + element._id,
//   }));

//   return outputArr;
// }

module.exports = router;
