const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
{
  D > "role": "admin"/"user",
  * > "first_name":"John",
  * > "last_name":"Doe",
  * > "email":"xx@xx.xx",
  * > "password":"xxxxx",
  D > "phone": "50251081", --
  D > "avatar":"http://link.com",
  D > "registration_date":"2014-01-01T23:28:56.782Z",
  D > "weekly_hours":38,
  D > "assigned_projects":[
      
      {
          D > "assigned_project_id":  1,
          D > "project_roles": [
              "Designer",
              "Manager"
          ],
          D > "assigned_hours": 28
          
      },
      {
          "id":  2,
          "project_roles": [
              "Developer"
          ],
          "assigned_hours": 10
         
      }
      ...
  ]    
}
*/

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
// USER
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
