const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');
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
  D > "weekly_hours":38
}
*/

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
  weekly_hours: { type: Number, required: false, min: 0, default: 35 }, // Number type includes decimals
  // assigned_projects: [
  //   {
  //     project: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'Project',
  //       required: false,
  //       // autopopulate: {
  //       //   select: [
  //       //     '_id',
  //       //     'name',
  //       //     'description',
  //       //     'time_schedule',
  //       //     'technologies',
  //       //   ],
  //       // },
  //     },
  //     tasks: [
  //       {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: 'Task',
  //         required: false,
  //         // autopopulate: true,
  //       },
  //     ],
  //   },
  // ],
});

userSchema.plugin(autopopulate);
//Export
module.exports = mongoose.model('User', userSchema);
