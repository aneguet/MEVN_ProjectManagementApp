const Joi = require('joi');
// validate registration
const registerValidation = (data) => {
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
// validate login
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(5).max(30).required(),
  });
  return schema.validate(data);
};
// logic to verify our token (JWT)

module.exports = { registerValidation, loginValidation };
