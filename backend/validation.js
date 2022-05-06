const Joi = require('joi');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

// Validate registration
const registerValidation = (data) => {
  delete data.password_confirm; // we delete password confirm from the array
  const schema = Joi.object({
    role: Joi.string().valid('admin', 'user'), // Only accepts 'admin' or 'user'
    first_name: Joi.string().min(2).max(255).required(),
    last_name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(5).max(30).required(),
    phone: Joi.string().min(7).max(15),
    avatar: Joi.string(),
    weekly_hours: Joi.number().min(0), // Number type includes decimals
    assigned_projects: Joi.object({
      // If specified, must be an object with specific properties inside
      assigned_project_id: Joi.number().required(),
      project_roles: Joi.array().items(Joi.string().required()).required(), // Items inside array must be strings, cannot provide an empty array.
      assigned_hours: Joi.number().min(0),
    }),
  });
  return schema.validate(data);
};
// Validate login
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(5).max(30).required(),
  });
  return schema.validate(data);
};

// Verify TOKEN JWT
const verifyToken = (req, res, next) => {
  const token = req.header('auth-token'); // we'll get the token from the login response, we'll have to create this header when needed
  // in a specific request
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    // verifies that the token matches the secret token
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified; // we save in req.user the user payload that we defined when logging in > email and id
    next(); // we pass control to the next request in the stack
  } catch (error) {
    res.status(400).json({ error: 'Token is not valid' });
  }
};

// Verify that the person handling the requests has the Admin role
const isAdmin = (req, res, next) => {
  try {
    console.log('id: ' + req.user.id);
    User.findById(req.user.id).exec((err, user) => {
      console.log(user);
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        if (user.role == 'admin') {
          next();
        } else {
          res
            .status(403)
            .send({ message: 'This request requires an Admin role' });
          return;
        }
      }
    });
  } catch (e) {
    res.status(500).send({ message: e });
    return;
  }
};
// Verify that the Admin is not deleting him/herself
const isADifferentUser = (req, res) => {
  try {
    if (req.header('id') == req.user.id) {
      res.status(500).send({ message: 'You cannot delete yourself' });
    }
    return;
  } catch (e) {
    res.status(500).send({ message: e });
    return;
  }
};
module.exports = {
  registerValidation,
  loginValidation,
  verifyToken,
  isAdmin,
  isADifferentUser,
};
