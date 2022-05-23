const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');
/*

 {
    * "name": "Angular App",
    * "description": "Lorem ipsum sit amet",
    * "leader": "62712cc1a5a320af3f7056c6",
    D "members": 
      [
        {
          D "member_id": "62712cc1a5a320af3f7056c6",
          D "project_roles": ["Leader"]
        }, 
        {
          "member_id": "627140d7077f40b8629ce197",
          "project_roles": ["Developer"]
        },
        {
          "member_id": "627140db077f40b8629ce19b",
          "project_roles": ["Developer"]
        }
      ],
    D "techs":
      [...],
    * "time_schedule":
      [
        "start_date": "2022-05-12T21:34:42.139Z",
        "due_date": "2022-06-10T21:34:42.139Z",
        "end_date":"2022-06-13T21:34:42.139Z",
        "estimated_hours": 300,
        "spent_hours": 0
      ]
    D "tasks":
      [...]
}

*/

let projectSchema = new Schema({
  name: {
    // *
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  description: {
    // *
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  stakeholder: {
    // *
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    autopopulate: {
      select: ['_id', 'first_name', 'last_name', 'email', 'avatar'],
    },
  },
  members: [
    {
      member_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        autopopulate: {
          select: ['_id', 'first_name', 'last_name', 'email', 'avatar'],
        },
      },
      project_roles: [
        {
          type: String,
          required: false,
          min: 2,
          max: 255,
          default: 'Timefly member',
        },
      ],
      assigned_hours: { type: Number, required: false, min: 0, default: 0 },
    },
  ],
  technologies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Technology',
      required: true,
      autopopulate: true,
    },
  ],
  time_schedule: {
    start_date: { type: Date, required: true, default: Date.now },
    due_date: { type: Date, required: true, default: Date.now },
    end_date: { type: Date, required: true, default: Date.now },
    estimated_hours: { type: Number, required: true, min: 0, default: 0 },
    spent_hours: { type: Number, required: true, min: 0, default: 0 },
  },
  // project_tasks: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Task',
  //     required: false,
  //     // autopopulate: true,
  //   },
  // ],
});
projectSchema.plugin(autopopulate);
//Export
module.exports = mongoose.model('Project', projectSchema);
