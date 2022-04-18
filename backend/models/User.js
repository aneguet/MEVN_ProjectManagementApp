const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// If specified, must be an object with specific properties inside
let AssignedProjectSchema = new Schema({
  assigned_project_id: { type: Number, required: false, default: 0 },
  project_roles: [
    {
      type: String,
      required: false,
      default: {},
    },
  ],
  assigned_hours: { type: Number, required: false, min: 0, default: 0 },
});
let userSchema = new Schema({
  role: {
    type: String,
    required: false,
    enum: ['admin', 'user'], // Only accepts 'admin' or 'user'
    // default: 'user',
  },
  first_name: {
    // *
    type: String,
    required: true,
    min: 2,
    max: 255,
    // lowercase: true,
  },
  last_name: {
    // *
    type: String,
    required: true,
    min: 2,
    max: 255,
    // lowercase: true,
  },
  email: { type: String, required: true, min: 3, max: 255 }, // *
  password: { type: String, required: true, min: 5, max: 30 }, // *
  phone: { type: String, required: false, min: 7, max: 15 }, //default: '123456'
  avatar: {
    type: String,
    required: false,
    default: 'https://i.imgur.com/e5YmXMB.png',
  },
  registration_date: { type: Date, required: false, default: Date.now },
  weekly_hours: { type: Number, required: false, min: 0, default: 0 }, // Number type includes decimals
  assigned_projects: {
    type: AssignedProjectSchema,
    required: false,
    default: {},
  },
});

//Export
module.exports = mongoose.model('User', userSchema);
