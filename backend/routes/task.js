// Imports
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Project = require('../models/Project');
const Task = require('../models/Task');
const Technology = require('../models/Technology');
// Token authentication
const {
  verifyToken,
  registerValidation,
  loginValidation,
} = require('../validation/auth_validation');
const { isAdmin } = require('../validation/user_validation');

// GET ALL Tasks by project and user id · User homepage

// GET ALL Tasks by project · Project page
router.get('/', [verifyToken, isAdmin], async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error });
  }
});
// GET Task by task id

// CREATE Task

router.post('/', verifyToken, async (req, res) => {
  try {
    const taskObject = new Task({
      project_id: req.body.project_id,
      name: req.body.name,
      description: req.body.description,
      // by default, tasks will be assigned to the leader, in case they don't pick another member
      assigned_to: req.body.assigned_to ? req.body.assigned_to : req.user.id,
      hours_allocated: req.body.hours_allocated ? req.body.hours_allocated : 0,
      hours_used: req.body.hours_used ? req.body.hours_used : 0,
      task_status: req.body.task_status ? req.body.task_status : 'Todo',
    });
    const savedTask = await taskObject.save();
    res.json({ error: null, data: savedTask._id });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// UPDATE Task

// DELETE Task

// Routes export
module.exports = router;
