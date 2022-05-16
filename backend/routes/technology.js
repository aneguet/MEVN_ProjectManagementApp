// Imports
const router = require('express').Router();
const Project = require('../models/Project');
const Technology = require('../models/Technology');
// Token authentication
const { verifyToken } = require('../validation/auth_validation');
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
// GET ALL techs
router.get('/', async (req, res) => {
  try {
    const techs = await Technology.find({});
    res.json(techs);
  } catch (error) {
    res.status(400).json({ error });
  }
});
// GET Project+techs
// router.get('/byProject', verifyToken, async (req, res) => {
//   try {
//     await Project.find()
//       .populate({
//         path: 'technologies',
//         match: { _id: req.header('id') },
//       })
//       .exec(function (err, project) {
//         if (!err) res.json(project);
//       });
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// });

// Routes export
module.exports = router;
