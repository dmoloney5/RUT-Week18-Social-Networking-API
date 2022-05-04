const { Thoughts, Users } = require("../models");


const thoughtsController = {
    //create thought
  createThoughts({ params, body }, res) {
    Thoughts.create(body)
      .then(({ _id }) => {
        return Users.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbThoughts) => {
        if (!dbThoughts) {
          res
            .status(404)
            .json({ message: "No thoughts with this particular ID!" });
          return;
        }
        res.json(dbThoughts);
      })
      .catch((err) => res.json(err));
  },

  // Get all Thoughts
  getAllThoughts(req, res) {
    Thoughts.find({})
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((dbThoughts) => res.json(dbThoughts))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Get a thought by ID
  getThoughtsById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((dbThoughts) => {
        if (!dbThoughts) {
          res
            .status(404)
            .json({ message: "No thoughts with this particular ID!" });
          return;
        }
        res.json(dbThoughts);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Update a current thought by ID
  updateThoughts({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .populate({ path: "reactions", select: "-__v" })
      .select("-___v")
      .then((dbThoughts) => {
        if (!dbThoughts) {
          res
            .status(404)
            .json({ message: "No thoughts with this particular ID!" });
          return;
        }
        res.json(dbThoughts);
      })
      .catch((err) => res.json(err));
  },

  // Delete a current thought by ID
  deleteThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then((dbThoughts) => {
        if (!dbThoughts) {
          res
            .status(404)
            .json({ message: "No thoughts with this particular ID!" });
          return;
        }
        res.json(dbThoughts);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = thoughtsController;
