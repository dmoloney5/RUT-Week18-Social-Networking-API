const { Users } = require("../models");

const usersController = {

  // Create a new User
    createUsers({body}, res) {
        Users.create(body)
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => res.status(400).json(err));
    },

    // Get All Users
    getAllUsers(req, res) {
        Users.find({})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

  //get single user by id
  getUsersById({ params }, res) {
    Users.findOne({ _id: params.id })
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((dbUsers) => {
        if (!dbUsers) {
          res.status(404).json({ message: "No User with this particular ID!" });
          return;
        }
        res.json(dbUsers);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //update user by id
  updateUsers({ params, body }, res) {
    Users.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUsers) => {
        if (!dbUsers) {
          res.status(404).json({ message: "No User with this particular ID!" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => res.json(err));
  },

  //delete users
  deleteUsers({ params }, res) {
    Users.findOneAndDelete({ _id: params.id })
      .then((dbUsers) => {
        if (!dbUsers) {
          res.status(404).json({ message: "No User with this particular ID!" });
          return;
        }
        res.json(dbUsers);
      })
      .catch((err) => res.status(400).json(err));
  },

  //delete user by id
  addFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((dbUsers) => {
        if (!dbUsers) {
          res.status(404).json({ message: "No User with this particular ID!" });
          return;
        }
        res.json(dbUsers);
      })
      .catch((err) => res.json(err));
  },

  //delete friend
  deleteFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((dbUsers) => {
        if (!dbUsers) {
          res.status(404).json({ message: "No User with this particular ID!" });
          return;
        }
        res.json(dbUsers);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = usersController;
