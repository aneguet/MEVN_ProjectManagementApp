const User = require('../models/User');

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
// const isADifferentUser = (req, res) => {
//   try {
//     if (req.header('id') == req.user.id) {
//       res.status(500).send({ message: 'You cannot delete yourself' });
//     }
//     return;
//   } catch (e) {
//     res.status(500).send({ message: e });
//     return;
//   }
// };
module.exports = {
  isAdmin,
};
