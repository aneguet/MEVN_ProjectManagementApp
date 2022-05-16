const User = require('../models/User');
const Project = require('../models/Project');
// A project can only be updated/deleted by the leader/admin

const isMemberLeaderOrAdmin = (req, res, next) => {
  try {
    Project.findOne({
      //where leader is the user requesting
      leader: req.user.id,
    }).exec((err, isMember) => {
      User.findOne({
        //where leader is the user requesting
        _id: req.user.id,
        role: 'admin',
      }).exec((err, isAdmin) => {
        if (isMember || isAdmin) {
          next();
        } else {
          // User is not member or admin
          res.status(403).send({
            message: 'Only the leader or admin can update/delete this project',
          });
          return;
        }
      });
    });
  } catch (e) {
    res.status(500).send({ message: e });
    return;
  }
};

// A project can only be seen by a member

module.exports = { isMemberLeaderOrAdmin };
