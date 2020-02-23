const User = require('../models/User');
// const Chat = require('../models/Chat');
// const Message = require('../models/Message');

// Get list of all users
function getAllUsers(exceptId) {
  return User.find({ _id: { $ne: exceptId } })
    .select('email name')
    .exec()
    .then((users) =>
      Promise.resolve({
        success: true,
        message: 'Users has been found',
        users,
      })
    );
}

// Get profile data for specific user by id
function getUserData(userId) {
  return User.findById(userId)
    .select('name email')
    .lean()
    .exec();
}


// Get User data by specific id
function getUserById(userId) {
  const userPromises = [
    getUserData(userId),
  ];

  return Promise.all(userPromises).then(([user]) => {
    if (!user) {
      return Promise.reject({
        success: false,
        message: 'There is no users with this ID',
      });
    }

    return Promise.resolve({
      success: true,
      message: 'User information has been retrieved',
      user: Object.assign({}, user),
    });
  });
}

module.exports = {
  getAllUsers,
  getUserById,
};
