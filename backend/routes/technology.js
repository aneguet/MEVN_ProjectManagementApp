// Imports
const router = require('express').Router();
const User = require('../models/User');
const Project = require('../models/Project');
const Task = require('../models/Task');
const Technology = require('../models/Technology');

// CREATE Techs
router.post('/', async (req, res) => {
  try {
    const techObject = new Technology({
      tech_name: req.body.tech_name,
    });
    const savedTech = await techObject.save();
    res.json({ error: null, data: savedTech._id });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// GET ALL Techs

// Routes export
module.exports = router;
